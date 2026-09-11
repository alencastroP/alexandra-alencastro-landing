/**
 * Feed do Instagram da landing da Alexandra (Cloudflare Worker).
 *
 * Por que existe: o token da Meta nao pode ir para o navegador -- tudo
 * que o site carrega e visivel para qualquer visitante. Este Worker fica
 * com o token, fala com a API da Meta, guarda a resposta em cache e
 * devolve so o que a pagina precisa.
 *
 * Deploy e configuracao: INSTAGRAM.md, na raiz do projeto.
 *
 * Nao entra no `tsc` do site (o tsconfig cobre so `src`), por isso os
 * tipos do Workers ficam declarados aqui embaixo.
 */

interface KVNamespaceLike {
  get(chave: string): Promise<string | null>
  put(chave: string, valor: string): Promise<void>
}

interface ExecutionContextLike {
  waitUntil(promessa: Promise<unknown>): void
}

export interface Env {
  /** Token de longa duracao da Meta. `wrangler secret put INSTAGRAM_TOKEN` */
  INSTAGRAM_TOKEN: string
  /** Opcional: guarda o token renovado e sobrevive ao deploy. */
  FEED_KV?: KVNamespaceLike
  /** Opcional: dominio do site. Sem isso, o feed fica aberto a qualquer origem. */
  ORIGEM_PERMITIDA?: string
}

interface MidiaMeta {
  id: string
  caption?: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  media_url?: string
  thumbnail_url?: string
  permalink: string
  timestamp?: string
}

const CAMPOS = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp'
const LIMITE = 12
/** Seis horas: a pagina nao precisa do post no segundo em que ele sai. */
const CACHE_SEGUNDOS = 6 * 60 * 60

/** Primeira linha da legenda, cortada -- o resto fica no proprio post. */
function primeiraLinha(legenda?: string) {
  if (!legenda) return undefined
  const linha = legenda.split('\n')[0].trim()
  return linha.length > 120 ? `${linha.slice(0, 117)}...` : linha
}

async function tokenAtual(env: Env) {
  return (await env.FEED_KV?.get('token')) || env.INSTAGRAM_TOKEN
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContextLike): Promise<Response> {
    const cabecalhos: Record<string, string> = {
      'content-type': 'application/json; charset=utf-8',
      'access-control-allow-origin': env.ORIGEM_PERMITIDA ?? '*',
      'cache-control': `public, max-age=${CACHE_SEGUNDOS}`,
    }

    if (request.method === 'OPTIONS') return new Response(null, { headers: cabecalhos })
    if (request.method !== 'GET') {
      return new Response(JSON.stringify({ erro: 'método não permitido' }), {
        status: 405,
        headers: cabecalhos,
      })
    }

    // Cache da borda: uma chamada a Meta a cada seis horas, nao por visita.
    const cache = (caches as unknown as { default: Cache }).default
    const chave = new Request(new URL(request.url).origin + '/feed')
    const guardado = await cache.match(chave)
    if (guardado) return guardado

    const token = await tokenAtual(env)
    if (!token) {
      return new Response(JSON.stringify({ erro: 'token não configurado' }), {
        status: 500,
        headers: cabecalhos,
      })
    }

    const url = `https://graph.instagram.com/me/media?fields=${CAMPOS}&limit=${LIMITE}&access_token=${token}`
    const resposta = await fetch(url)

    if (!resposta.ok) {
      // Token vencido cai aqui (400/190). O site continua de pe: ele volta
      // sozinho para o convite do perfil quando o feed falha.
      return new Response(
        JSON.stringify({ erro: 'instagram respondeu ' + resposta.status }),
        { status: 502, headers: cabecalhos },
      )
    }

    const dados = (await resposta.json()) as { data?: MidiaMeta[] }
    const posts = (dados.data ?? [])
      .map(midia => ({
        id: midia.id,
        // Video nao tem media_url utilizavel como imagem: usa a miniatura.
        imagem: midia.media_type === 'VIDEO' ? midia.thumbnail_url : midia.media_url,
        link: midia.permalink,
        alt: primeiraLinha(midia.caption) ?? 'Publicação no Instagram',
        legenda: primeiraLinha(midia.caption),
      }))
      .filter(post => post.imagem)

    const saida = new Response(JSON.stringify(posts), { headers: cabecalhos })
    ctx.waitUntil(cache.put(chave, saida.clone()))
    return saida
  },

  /**
   * Cron mensal: o token de longa duracao vale 60 dias e pode ser
   * renovado a partir do 24o dia. Sem isso, o feed seca em dois meses.
   */
  async scheduled(_evento: unknown, env: Env, _ctx: ExecutionContextLike): Promise<void> {
    const token = await tokenAtual(env)
    if (!token || !env.FEED_KV) return

    const resposta = await fetch(
      `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`,
    )
    if (!resposta.ok) {
      console.warn('[instagram] renovação do token falhou:', resposta.status)
      return
    }

    const dados = (await resposta.json()) as { access_token?: string }
    if (dados.access_token) await env.FEED_KV.put('token', dados.access_token)
  },
}

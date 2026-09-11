import { useEffect, useState } from 'react'
import { postsInstagram, type PostInstagram } from '../data/instagram'

/**
 * Posts do Instagram: a lista fixa de `src/data/instagram.ts` ou, se
 * houver VITE_INSTAGRAM_FEED_URL no .env, o que vier do feed.
 *
 * O endereco do feed precisa ser publico e devolver JSON. Token da Meta
 * nao entra aqui: qualquer coisa no front e visivel para quem abrir o
 * site -- por isso existe o Worker em server/instagram-feed. Ver
 * INSTAGRAM.md.
 */
const FEED: string | undefined = import.meta.env.VITE_INSTAGRAM_FEED_URL

type Cru = Record<string, unknown>

const texto = (valor: unknown) => (typeof valor === 'string' ? valor : '')

function lista(dados: unknown): unknown[] {
  if (Array.isArray(dados)) return dados
  const objeto = (dados ?? {}) as Cru
  if (Array.isArray(objeto.posts)) return objeto.posts
  if (Array.isArray(objeto.data)) return objeto.data
  return []
}

/**
 * Legenda de Instagram vem inteira, com quebra de linha e um bloco de
 * hashtags no fim. Na linha da pagina cabe uma frase: fica a primeira
 * linha, sem as hashtags do final.
 */
function resumir(legenda: string) {
  const primeira = legenda.split('\n').find(linha => linha.trim().length > 0)?.trim() ?? ''
  const semTags = primeira.replace(/(\s+#[\p{L}\p{N}_.]+)+$/u, '').trim()
  const frase = semTags || primeira
  return frase.length > 120 ? `${frase.slice(0, 117)}...` : frase
}

/** Aceita o formato do Behold, o da API da Meta e o nosso. */
function normalizar(dados: unknown): PostInstagram[] {
  return lista(dados)
    .map((item, i) => {
      const post = item as Cru
      const bruta = texto(post.prunedCaption) || texto(post.caption) || texto(post.legenda)
      const legenda = bruta ? resumir(bruta) : ''
      return {
        id: texto(post.id) || String(i),
        imagem:
          texto(post.imagem) ||
          texto(post.mediaUrl) ||
          texto(post.media_url) ||
          texto(post.thumbnailUrl) ||
          texto(post.thumbnail_url),
        link: texto(post.link) || texto(post.permalink),
        // A legenda serve de alt quando nao ha descritivo proprio: e
        // melhor que "imagem do Instagram", mesmo sem ser ideal.
        alt: texto(post.alt) || legenda || 'Publicação no Instagram',
        legenda: legenda || undefined,
      }
    })
    .filter(post => post.imagem && post.link)
}

export function useInstagramPosts(limite = 8) {
  const [posts, setPosts] = useState<PostInstagram[]>(postsInstagram)
  const [carregando, setCarregando] = useState(Boolean(FEED) && postsInstagram.length === 0)

  useEffect(() => {
    if (!FEED) return
    const controle = new AbortController()

    fetch(FEED, { signal: controle.signal })
      .then(resposta =>
        resposta.ok ? resposta.json() : Promise.reject(new Error(`HTTP ${resposta.status}`)),
      )
      .then(dados => {
        const recebidos = normalizar(dados)
        // Feed vazio ou fora do formato nao apaga o que ja estava na tela.
        if (recebidos.length) setPosts(recebidos)
      })
      .catch((erro: Error) => {
        if (erro.name !== 'AbortError') console.warn('[instagram] feed não carregou:', erro.message)
      })
      .finally(() => setCarregando(false))

    return () => controle.abort()
  }, [])

  return { posts: posts.slice(0, limite), carregando }
}

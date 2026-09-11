# Alexandra Alencastro · Landing page

Landing page de captação de leads para a corretora de imóveis Alexandra Alencastro,
em Natal/RN (CRECI-RN 6091). O formulário não tem backend: ele monta a mensagem e
abre o WhatsApp da Alexandra com os dados do lead já escritos.

**Stack:** Vite + React 18 + TypeScript + styled-components.
**Design:** tokens do `DESIGN.md` ("brasas no couro") em `src/styles/theme.ts`.

## Rodando

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # gera dist/ (estático, sobe em qualquer host)
npm run typecheck
```

## Antes de publicar

1. **Conteúdo.** Todo o texto e os dados (WhatsApp, CRECI, Instagram) estão
   em `src/data/content.ts` e já são os reais.
2. **Feed do Instagram (opcional).** A seção "O que eu ando postando" mostra
   um convite para o perfil até existir uma fonte de posts. Passo a passo
   completo em [INSTAGRAM.md](INSTAGRAM.md).
3. **`og:image`** no `index.html` está comentado — precisa de uma URL
   absoluta com o domínio, depois que o site tiver um.

## Deploy

### GitHub

O repositório já está publicado em `github.com/alencastroP/alexandra-alencastro-landing`.
Para atualizar: `git add -A && git commit -m "..." && git push`.

### Render (site estático)

O `render.yaml` na raiz já descreve o serviço. No painel do Render:

1. **New → Blueprint** e conecte este repositório.
2. O Render lê o `render.yaml` sozinho: build `npm install && npm run build`,
   publica `dist/`.
3. Antes do primeiro deploy, revise as variáveis de ambiente do serviço —
   `VITE_INSTAGRAM_FEED_URL` está em branco até o feed do Instagram existir.
4. Depois de publicado, aponte o domínio próprio em **Settings → Custom Domains**.

Sem Blueprint, dá para criar manualmente: **New → Static Site**, apontando
para este repo, com o mesmo build command e publish directory acima.

## Estrutura

```
src/
  data/content.ts           todo o texto da página
  data/instagram.ts         posts fixos do Instagram (fallback sem feed)
  styles/                   tokens, estilo global e animações
  context/                  objetivo do lead (card de serviço -> formulário)
  hooks/                    inView, scroll spy, contador, feed do Instagram...
  utils/whatsapp.ts         link wa.me e montagem da mensagem do lead
  components/
    ui/                     botões, badges, ícones, mostrador (Dial), carrossel...
    layout/                 navbar, rodapé, botão flutuante do WhatsApp
    sections/               Hero, Bairros, Serviços, Por que agora, Como funciona,
                            Quem sou, Instagram, Dúvidas, Formulário
server/
  instagram-feed/           Cloudflare Worker opcional para o feed do Instagram
                            (ver INSTAGRAM.md) -- não entra no build do site
```

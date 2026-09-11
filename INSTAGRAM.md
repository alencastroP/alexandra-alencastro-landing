# Integrar o Instagram na página

A seção **"O que eu ando postando"** mostra as últimas publicações numa
**linha horizontal**: rola com o dedo no celular, com as setas no desktop, e
cada post leva para o Instagram.

Ela já está ligada ao feed. Falta só a **fonte dos posts** — e isso depende
de uma credencial que só a dona da conta consegue gerar. Enquanto não
existir, a seção mostra o convite para o perfil (`@alexandraalencastro_` em letra
grande + botão). **Não há card falso esperando a integração.**

---

## O que falta, em uma linha

Um endereço público que devolva os posts em JSON, colocado no `.env`:

```
VITE_INSTAGRAM_FEED_URL=https://.../feed
```

Há dois jeitos de ter esse endereço: um serviço pronto (**opção A**) ou o
Worker que já está escrito neste repositório (**opção B**).

---

## Antes de tudo: o tipo da conta

`@alexandraalencastro_` precisa ser **Comercial** ou **Criador de conteúdo**
(no app: Configurações → Tipo de conta e ferramentas). Conta pessoal não
funciona em nenhuma das opções. A antiga *Instagram Basic Display API*, que
atendia conta pessoal, **foi desligada em dezembro de 2024**.

---

## Opção A — Serviço de feed (mais rápido, tem mensalidade)

**Behold**, **EmbedSocial**, **LightWidget**, **SnapWidget**, **Curator.io**.
Eles cuidam do login, do token e da renovação.

1. Conectar a conta no serviço escolhido.
2. Copiar a URL do feed em JSON (no Behold: `https://feeds.behold.so/SEU_ID`).
3. Me mandar essa URL. Eu ponho no `.env` e publico.

O site já entende o formato do Behold sem conversão nenhuma.

> Atenção ao plano gratuito: alguns limitam posts ou visitas por mês, e
> alguns exigem crédito visível na página.

---

## Opção B — Worker próprio (sem mensalidade, com manutenção)

O código está em [`server/instagram-feed/`](server/instagram-feed/). Ele
guarda o token, chama a API da Meta, devolve o JSON já limpo, guarda em
cache por 6 horas e renova o token todo mês sozinho.

**O que você precisa fazer (ou me dar acesso para fazer):**

1. Criar um app no [Meta for Developers](https://developers.facebook.com/),
   adicionar o produto **Instagram** e vincular a conta `@alexandraalencastro_`.
2. Gerar um **token de longa duração** com a permissão
   `instagram_business_basic`.
3. Publicar o Worker:

```bash
cd server/instagram-feed
npx wrangler kv namespace create FEED_KV   # cole o id devolvido no wrangler.toml
npx wrangler secret put INSTAGRAM_TOKEN    # cola o token aqui, ele não vai para o site
npx wrangler deploy
```

4. Descomentar no `wrangler.toml`: o `FEED_KV`, o `crons` (renovação mensal
   do token) e o `ORIGEM_PERMITIDA` com o domínio do site.
5. A URL que o deploy imprimir vai para o `.env` do site.

**O que dá manutenção:** o token vale 60 dias. O cron mensal renova sozinho,
mas se o Worker ficar meses fora do ar, o token expira e é preciso gerar
outro à mão.

---

## Opção C — Manual (sem API, serve para hoje)

1. Salve as imagens em `src/assets/instagram/`.
2. Preencha `src/data/instagram.ts`:

```ts
import capa1 from '../assets/instagram/post-1.jpg'

export const postsInstagram: PostInstagram[] = [
  {
    id: '1',
    imagem: capa1,
    link: 'https://www.instagram.com/p/CODIGO/',
    alt: 'Apartamento de 3 quartos em Ponta Negra, sala com varanda',
    legenda: 'Novo na Ponta Negra: 3 quartos, 92 m²',
  },
]
```

A cada post novo, alguém repete isso à mão.

---

## Formato que a página espera

```json
[
  {
    "id": "18012345678901234",
    "imagem": "https://.../foto.jpg",
    "link": "https://www.instagram.com/p/CODIGO/",
    "alt": "Apartamento com vista para o mar em Ponta Negra",
    "legenda": "Novo na Ponta Negra: 3 quartos, 92 m²"
  }
]
```

Também são aceitos, sem conversão: o formato do **Behold** (`mediaUrl`,
`permalink`, `prunedCaption`), o da **API da Meta** (`media_url`,
`thumbnail_url`, `permalink`, `caption`) e as embalagens `{ "posts": [...] }`
ou `{ "data": [...] }`. Vídeo entra pela miniatura (`thumbnail_url`).

---

## Resumo do que eu preciso de você

- [ ] Confirmar que `@alexandraalencastro_` é conta **Comercial** ou **Criador**
- [ ] Escolher: **A** (serviço pago, rápido) ou **B** (Worker, sem mensalidade)
- [ ] Se **A**: a URL do feed em JSON
- [ ] Se **B**: o token da Meta e uma conta Cloudflare para publicar o Worker

## Detalhes que valem saber

- **As imagens do Instagram têm endereço que expira.** Por isso o cache é de
  horas, não de dias. Se um dia aparecer post sem imagem, é isso: o Worker
  busca de novo e resolve. Para imunizar de vez, dá para o Worker guardar
  cópia das imagens — me avise se quiser.
- **Direito de imagem:** foto de imóvel de terceiros e foto com pessoas
  precisam de autorização para ficar no site, mesmo já estando no Instagram.
- **Não usei o embed oficial** (`<blockquote>` do Instagram) de propósito:
  cada post carregaria um iframe pesado e rastreadores da Meta.
- **Se o feed cair**, a página não quebra: volta sozinha para o convite do
  perfil e o erro aparece só no console.

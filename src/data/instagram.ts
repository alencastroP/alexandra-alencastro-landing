export interface PostInstagram {
  id: string
  /** URL da imagem (ou da miniatura, se for video). */
  imagem: string
  /** Link do post no Instagram. */
  link: string
  /** Texto alternativo: descreva a imagem, nao repita a legenda. */
  alt: string
  /** Primeira linha da legenda. Opcional. */
  legenda?: string
}

/**
 * Posts fixos da secao de Instagram.
 *
 * Enquanto esta lista estiver vazia E nao houver VITE_INSTAGRAM_FEED_URL
 * no .env, a secao mostra so o convite para o perfil -- nunca um card
 * falso no lugar de post real.
 *
 * O passo a passo da integracao esta em INSTAGRAM.md, na raiz do projeto.
 */
export const postsInstagram: PostInstagram[] = []

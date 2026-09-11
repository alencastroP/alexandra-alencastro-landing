/**
 * Tokens de design da marca Alexandra Alencastro.
 *
 * Tudo aqui sai do DESIGN.md ("brasas no couro"): canvas cafe-escuro,
 * tinta creme e um unico acento ambar que so acende em acao. A restricao
 * e o sistema -- se precisar de uma cor nova, provavelmente o problema e
 * de hierarquia, nao de paleta.
 *
 * O site e dark-only por decisao de marca, entao existe um tema so.
 */

/** Paleta crua, com os nomes do DESIGN.md. Prefira os aliases semanticos. */
export const palette = {
  espresso: '#140b00',
  midnightCocoa: '#0b0600',
  warmCream: '#fff1e0',
  softCream: '#f1f1f1',
  walnut: '#43392d',
  cedar: '#4f4538',
  driftwood: '#85796c',
  burntEdge: '#181109',
  amberForge: '#ffb442',
} as const

/** Um degrau da escala tipografica: tamanho, entrelinha e tracking. */
export interface TypeStep {
  size: string
  leading: number
  tracking: string
}

export interface AppTheme {
  /** Canvas da pagina inteira. */
  bg: string
  /** Faixas rebaixadas (rodape, faixa do mostrador). Um degrau abaixo do bg. */
  bgDeep: string
  /** Faixa clara que inverte o sistema (FAQ). */
  bgInverse: string
  /** Unica tinta de texto sobre o escuro. */
  text: string
  /** Texto de apoio, legendas e rotulos secundarios. */
  textMuted: string
  /** Texto principal sobre a faixa clara. */
  textInverse: string
  /** Texto de apoio sobre a faixa clara. */
  textInverseMuted: string
  /** Filetes de 1px em cards e divisorias. */
  border: string
  /** Filete quase invisivel, para profundidade interna de paineis. */
  borderSoft: string
  /** Contorno dos campos de formulario em repouso. */
  borderInput: string
  /** O sinal ambar -- so em acao e em um destaque por secao. */
  accent: string
  /** Tinta sobre o ambar. Espresso, nao creme: creme no ambar nao passa em contraste. */
  onAccent: string

  radius: {
    /** Cards, nav e superficies estruturais. */
    card: string
    /** Botoes, campos, icones e badges. */
    pill: string
  }

  type: {
    caption: TypeStep
    body: TypeStep
    bodyLg: TypeStep
    subheading: TypeStep
    headingSm: TypeStep
    headingLg: TypeStep
    display: TypeStep
    displayLg: TypeStep
    hero: TypeStep
    heroXl: TypeStep
  }

  layout: {
    maxWidth: string
    navHeight: string
    /** Respiro entre blocos de uma secao. */
    sectionGap: string
    cardPadding: string
    elementGap: string
  }
}

export const theme: AppTheme = {
  bg: palette.espresso,
  bgDeep: palette.midnightCocoa,
  bgInverse: palette.warmCream,
  text: palette.warmCream,
  textMuted: palette.driftwood,
  textInverse: palette.espresso,
  textInverseMuted: palette.cedar,
  border: palette.walnut,
  borderSoft: palette.burntEdge,
  borderInput: palette.cedar,
  accent: palette.amberForge,
  onAccent: palette.espresso,

  radius: {
    card: '6px',
    pill: '9999px',
  },

  type: {
    caption: { size: '12px', leading: 1.4, tracking: '0.12px' },
    body: { size: '14px', leading: 1.5, tracking: 'normal' },
    bodyLg: { size: '16px', leading: 1.5, tracking: 'normal' },
    subheading: { size: '19px', leading: 1.4, tracking: 'normal' },
    headingSm: { size: '22px', leading: 1.2, tracking: '-0.05px' },
    headingLg: { size: '35px', leading: 1.1, tracking: '-0.21px' },
    display: { size: '43px', leading: 1.1, tracking: '-0.3px' },
    displayLg: { size: '55px', leading: 1.1, tracking: '-0.44px' },
    hero: { size: '73px', leading: 1, tracking: '-0.8px' },
    heroXl: { size: '81px', leading: 0.8, tracking: '-1.13px' },
  },

  layout: {
    maxWidth: '1200px',
    navHeight: '68px',
    sectionGap: '52px',
    cardPadding: '12px',
    elementGap: '12px',
  },
}

/** Pontos de quebra usados em todas as secoes. */
export const bp = {
  /** Abaixo disso o hero e as grades viram coluna unica. */
  tablet: '980px',
  phone: '640px',
} as const

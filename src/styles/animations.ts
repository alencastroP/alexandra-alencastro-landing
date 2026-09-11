import { keyframes } from 'styled-components'

/**
 * Biblioteca de movimento da pagina.
 *
 * A marca e "clinica privada ao entardecer": nada quica, nada gira. O
 * movimento e curto, desacelera longo e some -- o conteudo assenta na
 * pagina em vez de pular nela.
 */

/** Curvas compartilhadas -- use sempre estas, nunca `ease`/`linear` cru. */
export const ease = {
  /** Saida rapida, chegada calma. Padrao para entradas. */
  out: 'cubic-bezier(0.16, 1, 0.3, 1)',
  /** Simetrica, para trocas de estado (cor, borda, acordeao). */
  inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
} as const

/** Entrada padrao: sobe 14px e aparece. */
export const riseIn = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`

export const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`

/** Linha do titulo subindo por tras de uma mascara. */
export const lineUp = keyframes`
  from { transform: translateY(105%); }
  to   { transform: translateY(0); }
`

/** A foto da capa assenta devagar: leve zoom out enquanto aparece. */
export const settle = keyframes`
  from { opacity: 0; transform: scale(1.06); }
  to   { opacity: 1; transform: scale(1); }
`

/** Ponto do mostrador acendendo em sequencia. */
export const dotOn = keyframes`
  from { opacity: 0.16; }
  to   { opacity: 1; }
`

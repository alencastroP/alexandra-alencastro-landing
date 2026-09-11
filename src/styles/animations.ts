import { keyframes } from 'styled-components'

/**
 * Biblioteca de movimento da pagina.
 *
 * A marca e "clinica privada ao entardecer": nada quica, nada gira. O
 * movimento percorre pouca distancia e demora a assentar -- o conteudo
 * aparece como se ja estivesse ali, nao como se tivesse chegado.
 */

/** Curvas compartilhadas -- use sempre estas, nunca `ease`/`linear` cru. */
export const ease = {
  /** Desaceleracao longa. Padrao para entradas. */
  out: 'cubic-bezier(0.22, 1, 0.36, 1)',
  /** Simetrica, para trocas de estado (cor, borda, acordeao). */
  inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
} as const

/** Entrada padrao: 10px e opacidade. Mais que isso vira coreografia. */
export const riseIn = keyframes`
  from { opacity: 0; transform: translate3d(0, 10px, 0); }
  to   { opacity: 1; transform: none; }
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

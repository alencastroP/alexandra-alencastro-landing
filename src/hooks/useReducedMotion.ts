import { useMediaQuery } from './useMediaQuery'

/**
 * Diz se o sistema pediu menos movimento.
 *
 * O CSS global ja zera as animacoes, mas carrossel e coisa que troca
 * conteudo sozinha: nesse caso nao basta animar mais rapido, e preciso
 * parar de girar e mostrar tudo de uma vez.
 */
export function useReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}

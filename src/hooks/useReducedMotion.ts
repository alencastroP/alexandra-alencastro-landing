import { useEffect, useState } from 'react'

/**
 * Diz se o sistema pediu menos movimento.
 *
 * O CSS global ja zera as animacoes, mas carrossel e coisa que troca
 * conteudo sozinha: nesse caso nao basta animar mais rapido, e preciso
 * parar de girar e mostrar tudo de uma vez.
 */
export function useReducedMotion() {
  const [reduzido, setReduzido] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const aplicar = () => setReduzido(mq.matches)
    aplicar()
    mq.addEventListener('change', aplicar)
    return () => mq.removeEventListener('change', aplicar)
  }, [])

  return reduzido
}

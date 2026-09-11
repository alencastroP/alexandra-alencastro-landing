import { useEffect, useState } from 'react'

/**
 * Diz se uma media query casa agora, e acompanha as mudancas (girar o
 * celular, redimensionar a janela, trocar a preferencia do sistema).
 */
export function useMediaQuery(query: string) {
  const [casa, setCasa] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(query)
    const aplicar = () => setCasa(mq.matches)
    aplicar()
    mq.addEventListener('change', aplicar)
    return () => mq.removeEventListener('change', aplicar)
  }, [query])

  return casa
}

import { useEffect, useState } from 'react'

/**
 * Devolve o id da secao que esta passando pelo meio da tela.
 *
 * A faixa de deteccao e estreita (entre 45% e 50% da altura): assim so uma
 * secao por vez e considerada ativa, sem piscar entre duas vizinhas.
 * `ids` precisa ser estavel (constante de modulo), senao o observer e
 * recriado a cada render.
 */
export function useScrollSpy(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const elements = ids
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (!elements.length || !('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return active
}

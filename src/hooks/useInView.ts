import { useEffect, useRef, useState } from 'react'

interface InViewOptions {
  threshold?: number
  rootMargin?: string
}

/**
 * Diz se o elemento ja apareceu na tela (dispara uma vez so).
 *
 * IntersectionObserver direto, sem biblioteca: e o unico uso na pagina e
 * sao vinte linhas. Sem suporte ao observer, o conteudo aparece na hora.
 */
export function useInView<T extends Element>({
  threshold = 0.15,
  rootMargin = '0px 0px -8% 0px',
}: InViewOptions = {}) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return { ref, inView }
}

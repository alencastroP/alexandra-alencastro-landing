import { useEffect, useState } from 'react'

/** Diz se a pagina ja rolou alem de `threshold` pixels. */
export function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      setScrolled(window.scrollY > threshold)
    }
    // Um calculo por quadro, no maximo -- scroll dispara dezenas por segundo.
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [threshold])

  return scrolled
}

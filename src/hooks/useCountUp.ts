import { useEffect, useState } from 'react'

/**
 * Conta de 0 ate `target` quando `active` vira true.
 * Com movimento reduzido, pula direto para o valor final.
 */
export function useCountUp(target: number, active: boolean, duration = 1400) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target)
      return
    }

    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      // Desacelera no fim, como o ponteiro assentando.
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(target * eased))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, active, duration])

  return value
}

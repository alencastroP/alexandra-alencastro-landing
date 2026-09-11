import type { ReactNode } from 'react'
import styled, { css } from 'styled-components'
import { ease, riseIn } from '../../styles/animations'
import { useInView } from '../../hooks/useInView'

const Animated = styled.div<{ $visible: boolean; $delay: number }>`
  ${p =>
    p.$visible
      ? css`
          animation: ${riseIn} 1s ${ease.out} both;
          animation-delay: ${p.$delay}s;
        `
      : css`
          opacity: 0;
        `}
`

interface RevealProps {
  children: ReactNode
  /** Atraso da animacao em segundos. Acima de 0.15 ja parece espera. */
  delay?: number
  className?: string
}

/**
 * Revela o conteudo quando ele entra na viewport: 10px e opacidade.
 * Um gesto so, curto e discreto -- a marca assenta, nao se exibe.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <Animated ref={ref} className={className} $visible={inView} $delay={delay}>
      {children}
    </Animated>
  )
}

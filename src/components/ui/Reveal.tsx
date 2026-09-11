import type { ReactNode } from 'react'
import styled, { css } from 'styled-components'
import { ease, riseIn } from '../../styles/animations'
import { useInView } from '../../hooks/useInView'

const Animated = styled.div<{ $visible: boolean; $delay: number }>`
  ${p =>
    p.$visible
      ? css`
          animation: ${riseIn} 0.8s ${ease.out} both;
          animation-delay: ${p.$delay}s;
        `
      : css`
          opacity: 0;
        `}
`

interface RevealProps {
  children: ReactNode
  /** Atraso da animacao em segundos. */
  delay?: number
  className?: string
}

/**
 * Revela o conteudo quando ele entra na viewport: sobe 14px e aparece.
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

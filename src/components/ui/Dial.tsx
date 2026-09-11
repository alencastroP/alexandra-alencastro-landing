import { useEffect, useState, type CSSProperties } from 'react'
import styled, { css } from 'styled-components'
import { dotOn, ease } from '../../styles/animations'
import { useInView } from '../../hooks/useInView'
import { useCountUp } from '../../hooks/useCountUp'
import { VisuallyHidden } from './VisuallyHidden'

const SIZE = 320
const CENTER = SIZE / 2
const RADIUS = 138
/** Um ponto por dia do ano. */
const DOTS = 365
/** Quanto do anel o arco percorre (0 a 1). */
const VOLTA = 0.978

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: min(100%, 380px);
  margin: 0 auto;
`

const Mostrador = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
`

/* O anel inteiro acende em onda, do topo no sentido do relogio: o ano
   passando. Sao 365 pontos, entao o atraso de cada um vai por variavel
   inline -- se fosse prop do styled, seriam 365 classes CSS. */
const Dot = styled.circle<{ $on: boolean }>`
  fill: ${p => p.theme.text};
  opacity: 0.16;

  ${p =>
    p.$on &&
    css`
      animation: ${dotOn} 0.5s ${ease.out} both;
      animation-delay: var(--atraso);
    `}
`

/* O arco ambar corre por cima do anel: e o tempo que ja passou. */
const Arco = styled.circle`
  fill: none;
  stroke: ${p => p.theme.accent};
  stroke-width: 2.5;
  stroke-linecap: round;
  transition: stroke-dashoffset 2s ${ease.out};
`

/* Ponteiro curto, preso na borda: ele marca onde o arco parou sem
   atravessar o numero no meio do mostrador. */
const Ponteiro = styled.g<{ $on: boolean }>`
  transform-box: view-box;
  transform-origin: ${CENTER}px ${CENTER}px;
  transform: rotate(${p => (p.$on ? VOLTA * 360 : 0)}deg);
  transition: transform 2s ${ease.out};

  line {
    stroke: ${p => p.theme.accent};
    stroke-width: 2.5;
    stroke-linecap: round;
  }
`

const Readout = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  pointer-events: none;

  strong {
    font-size: clamp(52px, 15vw, 69px);
    font-weight: 500;
    line-height: 1;
    letter-spacing: -0.69px;
    font-variant-numeric: tabular-nums;
  }

  em {
    margin-top: 6px;
    font-size: ${p => p.theme.type.body.size};
    font-style: normal;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${p => p.theme.textMuted};
  }
`

/* A legenda mora fora do circulo: dentro dele ela encostava nos pontos
   do anel. */
const Legenda = styled.p`
  max-width: 300px;
  font-size: ${p => p.theme.type.body.size};
  line-height: 1.5;
  text-align: center;
  color: ${p => p.theme.textMuted};
`

interface DialProps {
  valor: number
  unidade: string
  descricao: string
}

/**
 * Mostrador de um ano: 365 pontos no anel e um arco ambar dando quase a
 * volta inteira. E a figura do tempo passando -- a secao fala do preco
 * que sobe enquanto a pessoa decide.
 */
export function Dial({ valor, unidade, descricao }: DialProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.35 })
  const count = useCountUp(valor, inView, 1800)
  const [correu, setCorreu] = useState(false)

  // O arco e o ponteiro sao transicao, nao keyframe: precisam de um quadro
  // depois da montagem para sair do estado inicial.
  useEffect(() => {
    if (!inView) return
    const id = requestAnimationFrame(() => setCorreu(true))
    return () => cancelAnimationFrame(id)
  }, [inView])

  const circunferencia = 2 * Math.PI * RADIUS
  const pointAt = (i: number) => {
    const angle = (i / DOTS) * Math.PI * 2 - Math.PI / 2
    return { cx: CENTER + RADIUS * Math.cos(angle), cy: CENTER + RADIUS * Math.sin(angle) }
  }

  return (
    <Wrap ref={ref}>
      <Mostrador>
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden="true" focusable="false">
          {Array.from({ length: DOTS }, (_, i) => {
            const { cx, cy } = pointAt(i)
            const atraso = {
              '--atraso': `${(0.2 + (i / DOTS) * 1.6).toFixed(3)}s`,
            } as CSSProperties
            return <Dot key={i} cx={cx} cy={cy} r={1.4} $on={inView} style={atraso} />
          })}

          <Arco
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            transform={`rotate(-90 ${CENTER} ${CENTER})`}
            strokeDasharray={circunferencia}
            strokeDashoffset={correu ? circunferencia * (1 - VOLTA) : circunferencia}
          />

          <Ponteiro $on={correu}>
            <line x1={CENTER} y1={CENTER - RADIUS - 9} x2={CENTER} y2={CENTER - RADIUS + 13} />
          </Ponteiro>
        </svg>

        {/* O numero anima de 0 ate o valor -- leitor de tela ouve so o final. */}
        <Readout aria-hidden="true">
          <strong>{count}</strong>
          <em>{unidade}</em>
        </Readout>
      </Mostrador>

      <Legenda aria-hidden="true">{descricao}</Legenda>
      <VisuallyHidden>{`${valor} ${unidade} ${descricao}`}</VisuallyHidden>
    </Wrap>
  )
}

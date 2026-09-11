import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ease } from '../../styles/animations'
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
/** Arco, ponteiro e numero terminam juntos. */
const DURACAO = 2.4

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
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

/* Os 365 pontos aparecem juntos, como textura do anel. Animar um a um
   era ruido, nao informacao -- quem conta a historia e o arco. */
const Pontos = styled.g<{ $on: boolean }>`
  fill: ${p => p.theme.text};
  opacity: ${p => (p.$on ? 0.2 : 0)};
  transition: opacity 1.2s ${ease.out};
`

/* O arco ambar corre por cima do anel: e o tempo que ja passou. */
const Arco = styled.circle`
  fill: none;
  stroke: ${p => p.theme.accent};
  stroke-width: 2;
  stroke-linecap: round;
  transition: stroke-dashoffset ${DURACAO}s ${ease.out};
`

/* Ponteiro curto, preso na borda: marca onde o arco parou sem atravessar
   o numero no meio do mostrador. */
const Ponteiro = styled.g<{ $on: boolean }>`
  transform-box: view-box;
  transform-origin: ${CENTER}px ${CENTER}px;
  transform: rotate(${p => (p.$on ? VOLTA * 360 : 0)}deg);
  transition: transform ${DURACAO}s ${ease.out};

  line {
    stroke: ${p => p.theme.accent};
    stroke-width: 2;
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
    font-weight: 400;
    line-height: 1;
    letter-spacing: -0.02em;
    font-variant-numeric: tabular-nums;
  }

  em {
    margin-top: 10px;
    font-size: ${p => p.theme.type.caption.size};
    font-style: normal;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${p => p.theme.textMuted};
  }
`

/* A legenda mora fora do circulo: dentro dele ela encostava nos pontos. */
const Legenda = styled.p`
  max-width: 290px;
  font-size: ${p => p.theme.type.body.size};
  line-height: 1.6;
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
  const count = useCountUp(valor, inView, DURACAO * 1000)
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
          <Pontos $on={inView}>
            {Array.from({ length: DOTS }, (_, i) => {
              const { cx, cy } = pointAt(i)
              return <circle key={i} cx={cx} cy={cy} r={1.2} />
            })}
          </Pontos>

          <Arco
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            transform={`rotate(-90 ${CENTER} ${CENTER})`}
            strokeDasharray={circunferencia}
            strokeDashoffset={correu ? circunferencia * (1 - VOLTA) : circunferencia}
          />

          <Ponteiro $on={correu}>
            <line x1={CENTER} y1={CENTER - RADIUS - 8} x2={CENTER} y2={CENTER - RADIUS + 12} />
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

import { Children, useEffect, useMemo, useState, type ReactNode } from 'react'
import styled, { keyframes } from 'styled-components'
import { ease } from '../../styles/animations'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * Carrossel que troca grupos de itens no lugar de rolar sem parar.
 *
 * Os filhos sao agrupados de `count` em `count` e cada grupo entra com os
 * itens escalonados (`stagger`), fica `interval` e sai. E a mesma logica
 * dos carrosseis de logo: o olho le o grupo inteiro parado, em vez de
 * perseguir uma faixa em movimento.
 *
 * Para o teclado e o leitor de tela isso e uma imagem so: o rotulo
 * (`legenda`) descreve a lista inteira e os itens ficam escondidos --
 * ninguem precisa esperar o giro para saber o que esta escrito.
 */
const entra = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`

const sai = keyframes`
  from { opacity: 1; transform: translateY(0); }
  to   { opacity: 0; transform: translateY(-14px); }
`

/* As duas camadas dividem a mesma celula da grade: a que sai fica por
   cima da que entra, e a altura nao pula na troca. */
const Palco = styled.div`
  display: grid;

  > * {
    grid-area: 1 / 1;
  }
`

const Camada = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px 40px;
`

const Item = styled.span<{
  $i: number
  $stagger: number
  $duration: number
  $saindo?: boolean
}>`
  display: inline-flex;
  animation: ${p => (p.$saindo ? sai : entra)} ${p => p.$duration}ms ${ease.out} both;
  animation-delay: ${p => p.$i * p.$stagger}s;
`

interface CarouselProps {
  /** Itens do carrossel. Sao agrupados sozinhos conforme `count`. */
  children: ReactNode
  /** Quantos itens por grupo. Sem isso, todos entram num grupo so. */
  count?: number
  /** Atraso em segundos entre um item e o proximo. */
  stagger?: number
  /** Duracao da entrada e da saida, em milissegundos. */
  duration?: number
  /** Tempo parado em cada grupo, em milissegundos. */
  interval?: number
  /** Espera antes do primeiro giro, em milissegundos. */
  initialDelay?: number
  /** Vai no elemento de fora; use para espacamento e alinhamento. */
  className?: string
  /** Lido por leitores de tela no lugar do carrossel. */
  legenda?: string
}

function agrupar(itens: ReturnType<typeof Children.toArray>, count?: number) {
  if (!count || count >= itens.length) return [itens]
  const grupos = []
  for (let i = 0; i < itens.length; i += count) grupos.push(itens.slice(i, i + count))
  return grupos
}

export function Carousel({
  children,
  count,
  stagger = 0.14,
  duration = 600,
  interval = 2500,
  initialDelay = 500,
  className,
  legenda,
}: CarouselProps) {
  const itens = useMemo(() => Children.toArray(children), [children])
  const grupos = useMemo(() => agrupar(itens, count), [itens, count])
  const semMovimento = useReducedMotion()
  const [pausado, setPausado] = useState(false)
  const [estado, setEstado] = useState({ atual: 0, anterior: -1 })

  useEffect(() => {
    if (semMovimento || pausado || grupos.length < 2) return

    let intervalo = 0
    const girar = () =>
      setEstado(e => ({ atual: (e.atual + 1) % grupos.length, anterior: e.atual }))
    const inicio = window.setTimeout(() => {
      girar()
      intervalo = window.setInterval(girar, interval)
    }, initialDelay + interval)

    return () => {
      window.clearTimeout(inicio)
      window.clearInterval(intervalo)
    }
  }, [semMovimento, pausado, grupos.length, interval, initialDelay])

  // Tira a camada que saiu depois que a animacao dela termina, senao ela
  // fica no DOM segurando a altura do palco.
  useEffect(() => {
    if (estado.anterior < 0) return
    const id = window.setTimeout(
      () => setEstado(e => ({ ...e, anterior: -1 })),
      duration + itens.length * stagger * 1000,
    )
    return () => window.clearTimeout(id)
  }, [estado.anterior, duration, stagger, itens.length])

  // Sem movimento: nada gira, todo mundo aparece de uma vez.
  if (semMovimento) {
    return (
      <Camada className={className} role="img" aria-label={legenda}>
        {itens}
      </Camada>
    )
  }

  return (
    <Palco
      className={className}
      role="img"
      aria-label={legenda}
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
    >
      {estado.anterior >= 0 && (
        <Camada key={`sai-${estado.anterior}`} aria-hidden="true">
          {grupos[estado.anterior].map((item, i) => (
            <Item key={i} $i={i} $stagger={stagger} $duration={duration} $saindo>
              {item}
            </Item>
          ))}
        </Camada>
      )}

      <Camada key={`entra-${estado.atual}`} aria-hidden="true">
        {grupos[estado.atual].map((item, i) => (
          <Item key={i} $i={i} $stagger={stagger} $duration={duration}>
            {item}
          </Item>
        ))}
      </Camada>
    </Palco>
  )
}

import styled from 'styled-components'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { Eyebrow, Lead, SectionHead, Title } from '../ui/Heading'
import { PrimaryAction } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { ease } from '../../styles/animations'
import { bp } from '../../styles/theme'
import { etapas, secoes } from '../../data/content'

/* Linha do tempo de verdade: um fio atravessa as quatro etapas e cada uma
   pendura um ponto nele. So o primeiro ponto e ambar -- e onde a pessoa
   entra. No celular o mesmo fio vira vertical. */
const Linha = styled.ol`
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 28px;

  &::before {
    content: '';
    position: absolute;
    top: 5px;
    left: 0;
    right: 0;
    height: 1px;
    background: ${p => p.theme.border};
  }

  li {
    position: relative;
    padding-top: 36px;
  }

  li::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 11px;
    height: 11px;
    border-radius: ${p => p.theme.radius.pill};
    background: ${p => p.theme.bg};
    border: 1px solid ${p => p.theme.border};
  }

  li:first-child::before {
    background: ${p => p.theme.accent};
    border-color: ${p => p.theme.accent};
  }

  h3 {
    margin-bottom: 8px;
    font-size: ${p => p.theme.type.subheading.size};
    font-weight: 500;
    line-height: ${p => p.theme.type.subheading.leading};
  }

  p {
    font-size: ${p => p.theme.type.body.size};
    color: ${p => p.theme.textMuted};
  }

  @media (max-width: ${bp.tablet}) {
    grid-template-columns: minmax(0, 1fr);
    gap: 0;

    &::before {
      top: 6px;
      bottom: 12px;
      left: 5px;
      right: auto;
      width: 1px;
      height: auto;
    }

    li {
      padding: 0 0 28px 32px;
    }

    li::before {
      top: 1px;
    }
  }
`

/* Numeral vazado atras do titulo, como marca d'agua da etapa. */
const Numero = styled.span`
  display: block;
  margin-bottom: 10px;
  font-size: ${p => p.theme.type.display.size};
  line-height: 0.9;
  letter-spacing: ${p => p.theme.type.display.tracking};
  color: transparent;
  -webkit-text-stroke: 1px ${p => p.theme.border};
  font-variant-numeric: tabular-nums;
  transition: -webkit-text-stroke-color 0.35s ${ease.inOut};

  li:hover & {
    -webkit-text-stroke-color: ${p => p.theme.textMuted};
  }
`

const Cta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 20px;
  margin-top: ${p => p.theme.layout.sectionGap};

  p {
    font-size: ${p => p.theme.type.body.size};
    color: ${p => p.theme.textMuted};
  }
`

export function Process() {
  return (
    <Section id="processo" aria-labelledby="processo-titulo">
      <Container>
        <Reveal>
          <SectionHead>
            <div>
              <Eyebrow>{secoes.processo.rotulo}</Eyebrow>
              <Title id="processo-titulo">{secoes.processo.titulo}</Title>
            </div>
            <Lead>{secoes.processo.texto}</Lead>
          </SectionHead>
        </Reveal>

        <Reveal delay={0.1}>
          <Linha>
            {etapas.map(etapa => (
              <li key={etapa.numero}>
                <Numero aria-hidden="true">{etapa.numero}</Numero>
                <h3>{etapa.titulo}</h3>
                <p>{etapa.texto}</p>
              </li>
            ))}
          </Linha>
        </Reveal>

        <Cta>
          <PrimaryAction href="#contato">{secoes.processo.cta}</PrimaryAction>
          <p>{secoes.processo.nota}</p>
        </Cta>
      </Container>
    </Section>
  )
}

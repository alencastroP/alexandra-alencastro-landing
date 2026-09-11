import styled from 'styled-components'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { Eyebrow, Lead, SectionHead, Title } from '../ui/Heading'
import { PrimaryAction } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { bp } from '../../styles/theme'
import { etapas, secoes } from '../../data/content'

/* Linha do tempo: um fio atravessa as quatro etapas e cada uma pendura um
   ponto nele. So o primeiro ponto e ambar -- e onde a pessoa entra. No
   celular o mesmo fio vira vertical. */
const Linha = styled.ol`
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 40px;

  &::before {
    content: '';
    position: absolute;
    top: 4px;
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
    width: 9px;
    height: 9px;
    border-radius: ${p => p.theme.radius.pill};
    background: ${p => p.theme.bg};
    border: 1px solid ${p => p.theme.borderStrong};
  }

  li:first-child::before {
    background: ${p => p.theme.accent};
    border-color: ${p => p.theme.accent};
  }

  h3 {
    margin-bottom: 10px;
    font-size: ${p => p.theme.type.bodyLg.size};
    font-weight: 500;
    line-height: 1.35;
  }

  p {
    font-size: ${p => p.theme.type.body.size};
    line-height: 1.65;
    color: ${p => p.theme.textMuted};
  }

  @media (max-width: ${bp.tablet}) {
    grid-template-columns: minmax(0, 1fr);
    gap: 0;

    &::before {
      top: 6px;
      bottom: 12px;
      left: 4px;
      right: auto;
      width: 1px;
      height: auto;
    }

    li {
      padding: 0 0 32px 32px;
    }

    li::before {
      top: 2px;
    }
  }
`

/* Numero da etapa pequeno e espacado, como indice de livro. */
const Numero = styled.span`
  display: block;
  margin-bottom: 14px;
  font-size: ${p => p.theme.type.caption.size};
  letter-spacing: 0.14em;
  font-variant-numeric: tabular-nums;
  color: ${p => p.theme.textMuted};
`

const Cta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 24px;
  margin-top: 64px;

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

        <Reveal delay={0.08}>
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

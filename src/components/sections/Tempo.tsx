import styled from 'styled-components'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { Eyebrow, Lead, Title } from '../ui/Heading'
import { Dial } from '../ui/Dial'
import { PrimaryAction } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { bp } from '../../styles/theme'
import { secoes, tempo } from '../../data/content'

/* Textura de pontos, no mesmo desenho do mostrador: a faixa deixa de ser
   um retangulo chapado sem precisar de mais nenhum elemento. Some nas
   bordas para nao virar padrao de papel de parede. */
const Pontilhado = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.5;
  background-image: radial-gradient(circle, ${p => p.theme.text} 1px, transparent 1px);
  background-size: 26px 26px;
  -webkit-mask-image: radial-gradient(70% 60% at 50% 50%, #000 0%, transparent 75%);
  mask-image: radial-gradient(70% 60% at 50% 50%, #000 0%, transparent 75%);
  mix-blend-mode: overlay;
`

const Grid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
  gap: 52px;
  align-items: center;

  @media (max-width: ${bp.tablet}) {
    grid-template-columns: minmax(0, 1fr);
  }
`

const Texto = styled.div`
  ${Lead} {
    margin-top: 20px;
  }
`

/* Os tres custos: filete em cima, titulo e frase. Sem card, sem caixa. */
const Custos = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  margin: 40px 0 36px;

  li {
    padding-top: 16px;
    border-top: 1px solid ${p => p.theme.border};
  }

  strong {
    display: block;
    margin-bottom: 6px;
    font-size: ${p => p.theme.type.subheading.size};
    font-weight: 500;
    line-height: 1.3;
  }

  p {
    font-size: ${p => p.theme.type.body.size};
    line-height: 1.5;
    color: ${p => p.theme.textMuted};
  }

  @media (max-width: ${bp.phone}) {
    grid-template-columns: minmax(0, 1fr);
    gap: 20px;
  }
`

export function Tempo() {
  return (
    <Section id="tempo" $tone="deep" aria-labelledby="tempo-titulo">
      <Pontilhado aria-hidden="true" />
      <Container>
        <Grid>
          <Dial
            valor={tempo.relogio.valor}
            unidade={tempo.relogio.unidade}
            descricao={tempo.relogio.rotulo}
          />

          <Reveal>
            <Texto>
              <Eyebrow>{secoes.tempo.rotulo}</Eyebrow>
              <Title id="tempo-titulo">{secoes.tempo.titulo}</Title>
              <Lead>{secoes.tempo.texto}</Lead>

              <Custos>
                {tempo.custos.map(custo => (
                  <li key={custo.titulo}>
                    <strong>{custo.titulo}</strong>
                    <p>{custo.texto}</p>
                  </li>
                ))}
              </Custos>

              <PrimaryAction href="#contato">Começar agora</PrimaryAction>
            </Texto>
          </Reveal>
        </Grid>
      </Container>
    </Section>
  )
}

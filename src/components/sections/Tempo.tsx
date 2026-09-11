import styled from 'styled-components'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { Eyebrow, Lead, Title } from '../ui/Heading'
import { Dial } from '../ui/Dial'
import { PrimaryAction } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { bp } from '../../styles/theme'
import { secoes, tempo } from '../../data/content'

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
  gap: 72px;
  align-items: center;

  @media (max-width: ${bp.tablet}) {
    grid-template-columns: minmax(0, 1fr);
    gap: 56px;
  }
`

const Texto = styled.div`
  ${Lead} {
    margin-top: 22px;
  }
`

/* Os tres custos: filete em cima, titulo e frase. Sem card, sem caixa. */
const Custos = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 28px;
  margin: 48px 0 40px;

  li {
    padding-top: 18px;
    border-top: 1px solid ${p => p.theme.border};
  }

  strong {
    display: block;
    margin-bottom: 8px;
    font-size: ${p => p.theme.type.bodyLg.size};
    font-weight: 500;
    line-height: 1.35;
  }

  p {
    font-size: ${p => p.theme.type.body.size};
    line-height: 1.6;
    color: ${p => p.theme.textMuted};
  }

  @media (max-width: ${bp.phone}) {
    grid-template-columns: minmax(0, 1fr);
    gap: 24px;
  }
`

export function Tempo() {
  return (
    <Section id="tempo" $tone="deep" aria-labelledby="tempo-titulo">
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

import styled from 'styled-components'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { Eyebrow } from '../ui/Heading'
import { Seal } from '../ui/Seal'
import { Reveal } from '../ui/Reveal'
import { bp } from '../../styles/theme'
import { perfil, secoes, sobre } from '../../data/content'

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
  gap: 52px;
  align-items: center;

  @media (max-width: ${bp.tablet}) {
    grid-template-columns: minmax(0, 1fr);
    gap: 40px;
  }
`

const Palco = styled.div`
  position: relative;
  isolation: isolate;
  display: flex;
  justify-content: center;
  padding: 20px 0;
`

/* Monograma gigante atras do retrato: textura, nao leitura. */
const Monograma = styled.span`
  position: absolute;
  top: -24px;
  left: -8px;
  z-index: -1;
  font-size: clamp(160px, 26vw, 260px);
  line-height: 0.8;
  letter-spacing: -0.04em;
  color: ${p => p.theme.text};
  opacity: 0.05;
  user-select: none;
`

/* Arco: o unico canto que foge do raio de 6px do sistema. E de proposito
   -- e a forma que tira a foto da caixa e conversa com as pilulas. */
const Arco = styled.div`
  position: relative;
  width: min(100%, 340px);
  aspect-ratio: 4 / 5;
  overflow: hidden;
  border-radius: 9999px 9999px ${p => p.theme.radius.card} ${p => p.theme.radius.card};
  border: 1px solid ${p => p.theme.border};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* Recorte no rosto: a capa ja mostra ela inteira, aqui e o detalhe. */
    object-position: 52% 20%;
  }
`

const Selo = styled(Seal)`
  position: absolute;
  right: -10px;
  bottom: 28px;
  background: ${p => p.theme.bg};
`

const Citacao = styled.blockquote`
  margin-bottom: 28px;

  p {
    font-size: clamp(28px, 3.6vw, ${p => p.theme.type.headingLg.size});
    line-height: 1.15;
    letter-spacing: ${p => p.theme.type.headingLg.tracking};
    text-wrap: balance;
  }

  footer {
    margin-top: 16px;
    font-size: ${p => p.theme.type.body.size};
    color: ${p => p.theme.textMuted};
  }
`

const Texto = styled.div`
  > p {
    font-size: ${p => p.theme.type.bodyLg.size};
    line-height: 1.6;
    color: ${p => p.theme.textMuted};
  }

  > p + p {
    margin-top: 14px;
  }

  dl {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0 32px;
    margin-top: 32px;
  }

  dl > div {
    padding: 14px 0;
    border-top: 1px solid ${p => p.theme.border};
  }

  dt {
    margin-bottom: 2px;
    font-size: ${p => p.theme.type.body.size};
    color: ${p => p.theme.textMuted};
  }

  dd {
    font-size: ${p => p.theme.type.body.size};
    font-weight: 500;
  }

  @media (max-width: ${bp.phone}) {
    dl {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`

export function About() {
  return (
    <Section id="sobre" aria-labelledby="sobre-titulo">
      <Container>
        <Grid>
          <Reveal>
            <Palco>
              <Monograma aria-hidden="true">{perfil.monograma}</Monograma>
              <Arco>
                <img
                  src={perfil.foto}
                  alt={`${perfil.nome} sorrindo, em retrato de estúdio`}
                  loading="lazy"
                  decoding="async"
                />
                <Selo $angulo={-6}>{perfil.creci}</Selo>
              </Arco>
            </Palco>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <Eyebrow as="h2" id="sobre-titulo">
                {secoes.sobre.rotulo}
              </Eyebrow>

              <Citacao>
                <p>{sobre.citacao}</p>
                <footer>— {perfil.nome}</footer>
              </Citacao>

              <Texto>
                {sobre.paragrafos.map(paragrafo => (
                  <p key={paragrafo.slice(0, 24)}>{paragrafo}</p>
                ))}
                <dl>
                  {sobre.credenciais.map(item => (
                    <div key={item.rotulo}>
                      <dt>{item.rotulo}</dt>
                      <dd>{item.valor}</dd>
                    </div>
                  ))}
                </dl>
              </Texto>
            </div>
          </Reveal>
        </Grid>
      </Container>
    </Section>
  )
}

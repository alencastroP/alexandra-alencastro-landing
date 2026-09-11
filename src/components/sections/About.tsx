import styled from 'styled-components'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { Eyebrow } from '../ui/Heading'
import { Reveal } from '../ui/Reveal'
import { bp } from '../../styles/theme'
import { perfil, secoes, sobre } from '../../data/content'

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
  gap: 80px;
  align-items: center;

  @media (max-width: ${bp.tablet}) {
    grid-template-columns: minmax(0, 1fr);
    gap: 48px;
  }
`

/* Arco: o unico canto que foge do raio de 6px do sistema. E a forma que
   tira a foto da caixa e conversa com as pilulas. Sem selo, sem marca
   d'agua: a foto sozinha ja sustenta a coluna. */
const Arco = styled.div`
  width: min(100%, 360px);
  aspect-ratio: 4 / 5;
  overflow: hidden;
  margin: 0 auto;
  border-radius: 9999px 9999px ${p => p.theme.radius.card} ${p => p.theme.radius.card};
  background: ${p => p.theme.borderSoft};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* Recorte no rosto: a capa ja mostra ela inteira, aqui e o detalhe. */
    object-position: 52% 20%;
  }
`

const Citacao = styled.blockquote`
  margin-bottom: 36px;

  p {
    font-size: clamp(28px, 3.6vw, ${p => p.theme.type.headingLg.size});
    line-height: 1.18;
    letter-spacing: ${p => p.theme.type.headingLg.tracking};
    text-wrap: balance;
  }

  footer {
    margin-top: 18px;
    font-size: ${p => p.theme.type.body.size};
    color: ${p => p.theme.textMuted};
  }
`

const Texto = styled.div`
  > p {
    max-width: 58ch;
    font-size: ${p => p.theme.type.bodyLg.size};
    line-height: 1.7;
    color: ${p => p.theme.textMuted};
  }

  > p + p {
    margin-top: 16px;
  }

  dl {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0 40px;
    margin-top: 40px;
  }

  dl > div {
    padding: 16px 0;
    border-top: 1px solid ${p => p.theme.border};
  }

  dt {
    margin-bottom: 4px;
    font-size: ${p => p.theme.type.caption.size};
    letter-spacing: 0.04em;
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
            <Arco>
              <img
                src={perfil.foto}
                alt={`${perfil.nome} sorrindo, em retrato de estúdio`}
                loading="lazy"
                decoding="async"
              />
            </Arco>
          </Reveal>

          <Reveal delay={0.08}>
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

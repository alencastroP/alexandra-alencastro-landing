import styled from 'styled-components'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { Eyebrow, Lead, SectionHead, Title } from '../ui/Heading'
import { IconCircle } from '../ui/Badge'
import { Icon } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'
import { useLeadIntent } from '../../context/LeadIntentContext'
import { scrollToId } from '../../utils/scroll'
import { ease } from '../../styles/animations'
import { bp } from '../../styles/theme'
import { secoes, servicos, type Objetivo } from '../../data/content'

/* Sem card: quatro linhas largas, separadas por filete e escalonadas --
   as pares entram 72px. Grade de caixas iguais e o que faz a pagina
   parecer template; linha comprida com numeral vazado tem ritmo. */
const Lista = styled.div`
  border-top: 1px solid ${p => p.theme.border};
`

const Item = styled.article<{ $i: number }>`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 32px;
  align-items: start;
  padding: 32px 0;
  padding-left: ${p => (p.$i % 2 ? '72px' : '0')};
  border-bottom: 1px solid ${p => p.theme.border};
  transition: padding-left 0.4s ${ease.out};

  &:hover {
    padding-left: ${p => (p.$i % 2 ? '84px' : '12px')};
  }

  h3 {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: ${p => p.theme.type.headingSm.size};
    font-weight: 500;
    line-height: ${p => p.theme.type.headingSm.leading};
    letter-spacing: ${p => p.theme.type.headingSm.tracking};
  }

  > div > p {
    margin: 10px 0 14px;
    max-width: 46ch;
    font-size: ${p => p.theme.type.body.size};
    color: ${p => p.theme.textMuted};
  }

  /* Itens em linha, com bolinha no lugar de marcador: some a cara de
     lista de requisitos e cabe tudo numa faixa so. */
  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 20px;
  }

  li {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: ${p => p.theme.type.body.size};
  }

  li::before {
    content: '';
    width: 4px;
    height: 4px;
    border-radius: ${p => p.theme.radius.pill};
    background: ${p => p.theme.textMuted};
  }

  @media (max-width: ${bp.tablet}) {
    grid-template-columns: auto minmax(0, 1fr);
    gap: 20px;
    padding-left: 0;

    &:hover {
      padding-left: 0;
    }
  }
`

/* Numeral vazado: ocupa espaco como imagem, nao como texto. No hover o
   contorno acende em ambar -- o unico momento de cor da linha. */
const Numero = styled.span`
  font-size: clamp(40px, 5vw, ${p => p.theme.type.displayLg.size});
  line-height: 0.9;
  letter-spacing: ${p => p.theme.type.displayLg.tracking};
  color: transparent;
  -webkit-text-stroke: 1px ${p => p.theme.border};
  transition: -webkit-text-stroke-color 0.35s ${ease.inOut};
  font-variant-numeric: tabular-nums;

  ${Item}:hover & {
    -webkit-text-stroke-color: ${p => p.theme.accent};
  }
`

const Acao = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  align-self: center;
  padding: 6px 0;
  border: 0;
  background: none;
  cursor: pointer;
  white-space: nowrap;
  font-size: ${p => p.theme.type.body.size};
  font-weight: 500;
  color: ${p => p.theme.text};
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 6px;
  text-decoration-color: ${p => p.theme.border};
  transition: text-decoration-color 0.25s ${ease.inOut};

  svg {
    transition: transform 0.3s ${ease.out};
  }

  &:hover {
    text-decoration-color: ${p => p.theme.text};

    svg {
      transform: translateX(4px);
    }
  }

  @media (max-width: ${bp.tablet}) {
    grid-column: 2;
    align-self: start;
    margin-top: 4px;
  }
`

export function Services() {
  const { setObjetivo } = useLeadIntent()

  // Chega no formulario com o objetivo ja marcado.
  const escolher = (objetivo: Objetivo) => {
    setObjetivo(objetivo)
    scrollToId('formulario')
  }

  return (
    <Section id="servicos" aria-labelledby="servicos-titulo">
      <Container>
        <Reveal>
          <SectionHead>
            <div>
              <Eyebrow>{secoes.servicos.rotulo}</Eyebrow>
              <Title id="servicos-titulo">{secoes.servicos.titulo}</Title>
            </div>
            <Lead>{secoes.servicos.texto}</Lead>
          </SectionHead>
        </Reveal>

        <Lista>
          {servicos.map((servico, i) => (
            <Reveal key={servico.objetivo} delay={i * 0.06}>
              <Item $i={i}>
                <Numero aria-hidden="true">{String(i + 1).padStart(2, '0')}</Numero>

                <div>
                  <h3>
                    <IconCircle $size={36}>
                      <Icon name={servico.icon} size={16} />
                    </IconCircle>
                    {servico.titulo}
                  </h3>
                  <p>{servico.texto}</p>
                  <ul>
                    {servico.itens.map(item => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <Acao type="button" onClick={() => escolher(servico.objetivo)}>
                  {servico.cta}
                  <Icon name="arrowRight" size={16} />
                </Acao>
              </Item>
            </Reveal>
          ))}
        </Lista>
      </Container>
    </Section>
  )
}

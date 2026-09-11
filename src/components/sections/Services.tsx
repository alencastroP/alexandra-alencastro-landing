import styled from 'styled-components'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { Eyebrow, Lead, SectionHead, Title } from '../ui/Heading'
import { Icon } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'
import { useLeadIntent } from '../../context/LeadIntentContext'
import { scrollToId } from '../../utils/scroll'
import { ease } from '../../styles/animations'
import { bp } from '../../styles/theme'
import { secoes, servicos, type Objetivo } from '../../data/content'

/* Quatro linhas largas separadas por filete, todas no mesmo alinhamento:
   o numeral a esquerda da o ritmo, o resto e tipografia e espaco. */
const Lista = styled.div`
  border-top: 1px solid ${p => p.theme.border};
`

const Item = styled.article`
  display: grid;
  grid-template-columns: 112px minmax(0, 1fr) auto;
  gap: 32px;
  align-items: baseline;
  padding: 40px 0;
  border-bottom: 1px solid ${p => p.theme.border};

  h3 {
    font-size: ${p => p.theme.type.headingSm.size};
    font-weight: 500;
    line-height: ${p => p.theme.type.headingSm.leading};
    letter-spacing: ${p => p.theme.type.headingSm.tracking};
  }

  > div > p {
    margin: 12px 0 18px;
    max-width: 48ch;
    font-size: ${p => p.theme.type.body.size};
    line-height: 1.65;
    color: ${p => p.theme.textMuted};
  }

  /* Itens em linha, separados so pelo espaco e por um ponto discreto. */
  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 28px;
  }

  li {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: ${p => p.theme.type.body.size};
  }

  li::before {
    content: '';
    width: 3px;
    height: 3px;
    border-radius: ${p => p.theme.radius.pill};
    background: ${p => p.theme.textMuted};
  }

  @media (max-width: ${bp.tablet}) {
    grid-template-columns: 56px minmax(0, 1fr);
    gap: 20px;
    padding: 32px 0;
  }
`

/* Numeral grande em creme quase apagado: marca a linha sem competir com
   o titulo. Acende um pouco quando a linha e a da vez. */
const Numero = styled.span`
  font-size: clamp(32px, 4vw, ${p => p.theme.type.display.size});
  line-height: 1;
  letter-spacing: ${p => p.theme.type.display.tracking};
  font-variant-numeric: tabular-nums;
  color: ${p => p.theme.text};
  opacity: 0.2;
  transition: opacity 0.5s ${ease.out};

  ${Item}:hover & {
    opacity: 0.55;
  }
`

const Acao = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
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
  text-decoration-color: ${p => p.theme.borderStrong};
  transition: text-decoration-color 0.3s ${ease.inOut};

  svg {
    transition: transform 0.4s ${ease.out};
  }

  &:hover {
    text-decoration-color: ${p => p.theme.text};

    svg {
      transform: translateX(3px);
    }
  }

  @media (max-width: ${bp.tablet}) {
    grid-column: 2;
    justify-self: start;
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

        <Reveal delay={0.08}>
          <Lista>
            {servicos.map((servico, i) => (
              <Item key={servico.objetivo}>
                <Numero aria-hidden="true">{String(i + 1).padStart(2, '0')}</Numero>

                <div>
                  <h3>{servico.titulo}</h3>
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
            ))}
          </Lista>
        </Reveal>
      </Container>
    </Section>
  )
}

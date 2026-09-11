import { useState } from 'react'
import styled from 'styled-components'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { Eyebrow, Lead, Title } from '../ui/Heading'
import { OutlineButton } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'
import { ease } from '../../styles/animations'
import { bp } from '../../styles/theme'
import { perguntas, secoes } from '../../data/content'
import { mensagemPadrao, whatsappUrl } from '../../utils/whatsapp'

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
  gap: 52px;
  align-items: start;

  @media (max-width: ${bp.tablet}) {
    grid-template-columns: minmax(0, 1fr);
    gap: 32px;
  }
`

/* O titulo acompanha a leitura da lista enquanto ha perguntas na tela. */
const Aside = styled.div`
  position: sticky;
  top: calc(${p => p.theme.layout.navHeight} + 32px);

  ${Lead} {
    margin: 16px 0 24px;
  }

  @media (max-width: ${bp.tablet}) {
    position: static;
  }
`

/* Walnut a 30%: na faixa creme o filete cheio pesaria demais. */
const List = styled.div`
  border-top: 1px solid ${p => p.theme.border}4d;
`

const Item = styled.div`
  border-bottom: 1px solid ${p => p.theme.border}4d;
`

const Question = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  width: 100%;
  min-height: 56px;
  padding: 14px 0;
  border: 0;
  background: none;
  cursor: pointer;
  text-align: left;
  font-size: 17px;
  font-weight: 500;
  line-height: 1.4;
  color: ${p => p.theme.textInverse};

  svg {
    flex-shrink: 0;
    transition: transform 0.35s ${ease.inOut};
  }

  /* O + gira ate virar x: o mesmo icone abre e fecha. */
  &[aria-expanded='true'] svg {
    transform: rotate(45deg);
  }
`

/* Altura animada com grid-template-rows (0fr -> 1fr): anima ate o tamanho
   real do texto, sem medir nada em JS. */
const Answer = styled.div<{ $open: boolean }>`
  display: grid;
  grid-template-rows: ${p => (p.$open ? '1fr' : '0fr')};
  transition: grid-template-rows 0.35s ${ease.inOut};

  > div {
    overflow: hidden;
  }

  p {
    max-width: 60ch;
    padding: 0 40px 20px 0;
    font-size: ${p => p.theme.type.bodyLg.size};
    line-height: 1.6;
    color: ${p => p.theme.textInverseMuted};
  }
`

export function Faq() {
  const [aberta, setAberta] = useState<number | null>(0)

  return (
    <Section id="perguntas" $tone="inverse" aria-labelledby="perguntas-titulo">
      <Container>
        <Grid>
          <Aside>
            <Eyebrow $inverse>{secoes.perguntas.rotulo}</Eyebrow>
            <Title id="perguntas-titulo" $inverse>
              {secoes.perguntas.titulo}
            </Title>
            <Lead $inverse>{secoes.perguntas.texto}</Lead>
            <OutlineButton
              as="a"
              $inverse
              href={whatsappUrl(mensagemPadrao)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="whatsapp" size={16} />
              {secoes.perguntas.cta}
            </OutlineButton>
          </Aside>

          <Reveal>
            <List>
              {perguntas.map((item, i) => {
                const open = aberta === i
                return (
                  <Item key={item.pergunta}>
                    <h3>
                      <Question
                        type="button"
                        id={`faq-pergunta-${i}`}
                        aria-expanded={open}
                        aria-controls={`faq-resposta-${i}`}
                        onClick={() => setAberta(open ? null : i)}
                      >
                        {item.pergunta}
                        <Icon name="plus" size={18} />
                      </Question>
                    </h3>
                    <Answer
                      id={`faq-resposta-${i}`}
                      role="region"
                      aria-labelledby={`faq-pergunta-${i}`}
                      aria-hidden={!open}
                      $open={open}
                    >
                      <div>
                        <p>{item.resposta}</p>
                      </div>
                    </Answer>
                  </Item>
                )
              })}
            </List>
          </Reveal>
        </Grid>
      </Container>
    </Section>
  )
}

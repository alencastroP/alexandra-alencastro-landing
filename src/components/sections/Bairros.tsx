import styled from 'styled-components'
import { Container } from '../ui/Container'
import { Carousel } from '../ui/Carousel'
import { bairros, secoes } from '../../data/content'
import { bp } from '../../styles/theme'

/** Faixa de ponta a ponta, presa por filetes: separa a capa dos servicos. */
const Faixa = styled.div`
  padding: 30px 0;
  border-top: 1px solid ${p => p.theme.border};
  border-bottom: 1px solid ${p => p.theme.border};
`

const Linha = styled(Container)`
  display: flex;
  align-items: center;
  gap: 40px;

  @media (max-width: ${bp.tablet}) {
    flex-direction: column;
    gap: 20px;
  }
`

const Rotulo = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  font-size: ${p => p.theme.type.body.size};
  letter-spacing: 0.01em;
  color: ${p => p.theme.textMuted};

  &::after {
    content: '';
    width: 24px;
    height: 1px;
    background: currentColor;
  }
`

const Roda = styled(Carousel)`
  flex: 1;
  min-width: 0;
`

/* Um bairro sim, outro nao vem vazado: a linha ganha ritmo sem precisar
   de mais nenhum enfeite. */
const Bairro = styled.span<{ $cheio: boolean }>`
  font-size: ${p => p.theme.type.headingLg.size};
  line-height: 1.2;
  letter-spacing: ${p => p.theme.type.headingLg.tracking};
  white-space: nowrap;
  color: ${p => (p.$cheio ? p.theme.text : 'transparent')};
  -webkit-text-stroke: ${p => (p.$cheio ? '0' : `1px ${p.theme.border}`)};

  @media (max-width: ${bp.phone}) {
    font-size: ${p => p.theme.type.headingSm.size};
  }
`

export function Bairros() {
  return (
    <Faixa>
      <Linha>
        <Rotulo>{secoes.bairros.rotulo}</Rotulo>
        <Roda count={4} legenda={`${secoes.bairros.rotulo}: ${bairros.join(', ')}.`}>
          {bairros.map((bairro, i) => (
            <Bairro key={bairro} $cheio={i % 2 === 1}>
              {bairro}
            </Bairro>
          ))}
        </Roda>
      </Linha>
    </Faixa>
  )
}

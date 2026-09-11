import styled from 'styled-components'
import { Container } from '../ui/Container'
import { Carousel } from '../ui/Carousel'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { bairros, secoes } from '../../data/content'
import { bp } from '../../styles/theme'

/** Faixa de ponta a ponta, presa por filetes: separa a capa dos servicos. */
const Faixa = styled.div`
  padding: 28px 0;
  border-top: 1px solid ${p => p.theme.border};
  border-bottom: 1px solid ${p => p.theme.border};
`

const Linha = styled(Container)`
  display: flex;
  align-items: center;
  gap: 48px;

  @media (max-width: ${bp.tablet}) {
    flex-direction: column;
    gap: 16px;
  }
`

const Rotulo = styled.p`
  flex-shrink: 0;
  font-size: ${p => p.theme.type.body.size};
  color: ${p => p.theme.textMuted};
`

const Roda = styled(Carousel)`
  flex: 1;
  min-width: 0;
`

/* Todos iguais: o carrossel ja da o movimento, o texto nao precisa de
   mais nenhum efeito. */
const Bairro = styled.span`
  font-size: ${p => p.theme.type.headingSm.size};
  line-height: 1.3;
  letter-spacing: ${p => p.theme.type.headingSm.tracking};
  white-space: nowrap;

  @media (max-width: ${bp.phone}) {
    font-size: ${p => p.theme.type.subheading.size};
  }
`

export function Bairros() {
  // No celular quatro nomes quebram em duas linhas, e o grupo que sai
  // encavala no que entra. Dois por vez cabem numa linha so.
  const celular = useMediaQuery(`(max-width: ${bp.phone})`)

  return (
    <Faixa>
      <Linha>
        <Rotulo>{secoes.bairros.rotulo}</Rotulo>
        <Roda
          count={celular ? 2 : 4}
          duration={700}
          interval={2800}
          legenda={`${secoes.bairros.rotulo}: ${bairros.join(', ')}.`}
        >
          {bairros.map(bairro => (
            <Bairro key={bairro}>{bairro}</Bairro>
          ))}
        </Roda>
      </Linha>
    </Faixa>
  )
}

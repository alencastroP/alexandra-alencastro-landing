import styled from 'styled-components'
import { bp } from '../../styles/theme'

/** Trilho central de 1200px usado por todas as secoes. */
export const Container = styled.div`
  width: 100%;
  max-width: calc(${p => p.theme.layout.maxWidth} + 48px);
  margin: 0 auto;
  padding: 0 24px;

  @media (max-width: ${bp.phone}) {
    padding: 0 16px;
  }
`

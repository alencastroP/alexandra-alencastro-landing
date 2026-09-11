import styled, { css } from 'styled-components'
import { bp } from '../../styles/theme'

export type SectionTone = 'base' | 'deep' | 'inverse'

/**
 * Bloco vertical padrao das secoes.
 *
 * O ritmo alterna faixas: `base` (espresso), `deep` (um degrau abaixo,
 * para faixas de dado) e `inverse` (creme, que vira o sistema do avesso --
 * usada uma vez so, no FAQ, para a pagina respirar).
 */
export const Section = styled.section<{ $tone?: SectionTone }>`
  position: relative;
  padding: 72px 0;

  ${p =>
    p.$tone === 'deep' &&
    css`
      background: ${p.theme.bgDeep};
    `}

  ${p =>
    p.$tone === 'inverse' &&
    css`
      background: ${p.theme.bgInverse};
      color: ${p.theme.textInverse};

      /* Ambar sobre creme some -- no claro, o foco vira espresso. */
      *:focus-visible {
        outline-color: ${p.theme.textInverse};
      }
    `}

  @media (max-width: ${bp.phone}) {
    padding: 52px 0;
  }
`

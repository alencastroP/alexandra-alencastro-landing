import styled, { css } from 'styled-components'
import type { AppTheme } from '../../styles/theme'

type TitleSize = 'headingLg' | 'display' | 'displayLg'

/** Piso de cada degrau no celular -- o teto vem do token. */
const MIN_SIZE: Record<TitleSize, string> = {
  headingLg: '28px',
  display: '32px',
  displayLg: '38px',
}

const titleStep = (theme: AppTheme, size: TitleSize) => {
  const step = theme.type[size]
  return css`
    font-size: clamp(${MIN_SIZE[size]}, 4.4vw, ${step.size});
    line-height: ${step.leading};
    letter-spacing: ${step.tracking};
  `
}

/**
 * Rotulo curto acima dos titulos. So texto, sem traco na frente: um
 * filete antes de cada rotulo, em toda secao, era a marca mais facil de
 * reconhecer como template.
 */
export const Eyebrow = styled.p<{ $inverse?: boolean }>`
  margin-bottom: 18px;
  font-size: ${p => p.theme.type.body.size};
  font-weight: 400;
  letter-spacing: 0.01em;
  color: ${p => (p.$inverse ? p.theme.textInverseMuted : p.theme.textMuted)};
`

/** Titulo de secao: peso 400 e tracking negativo, como pede a marca. */
export const Title = styled.h2<{ $size?: TitleSize; $inverse?: boolean }>`
  font-weight: 400;
  ${p => titleStep(p.theme, p.$size ?? 'display')}
  color: ${p => (p.$inverse ? p.theme.textInverse : p.theme.text)};
  text-wrap: balance;
`

/** Cabecalho de secao: titulo a esquerda, apoio a direita (quebra no celular). */
export const SectionHead = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px 56px;
  margin-bottom: ${p => p.theme.layout.sectionGap};

  > div {
    max-width: 660px;
  }
`

/** Paragrafo de apoio: tom de apoio, 16px, coluna curta. */
export const Lead = styled.p<{ $inverse?: boolean }>`
  max-width: 420px;
  font-size: ${p => p.theme.type.bodyLg.size};
  line-height: 1.6;
  color: ${p => (p.$inverse ? p.theme.textInverseMuted : p.theme.textMuted)};
`

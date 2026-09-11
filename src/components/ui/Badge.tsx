import styled, { css } from 'styled-components'

/** Etiqueta pequena, em pilula. Usada com parcimonia. */
export const Badge = styled.span<{ $variant?: 'filled' | 'outline' }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: ${p => p.theme.radius.pill};
  font-size: ${p => p.theme.type.caption.size};
  line-height: ${p => p.theme.type.caption.leading};
  letter-spacing: 0.02em;
  color: ${p => p.theme.text};

  /* Preenchida e so um veu de creme a 7%: some no fundo sem sumir. */
  ${p =>
    p.$variant === 'outline'
      ? css`
          border: 1px solid ${p.theme.borderStrong};
        `
      : css`
          background: rgba(255, 241, 224, 0.07);
          border: 1px solid transparent;
        `}
`

/** Circulo com filete que abriga um icone de linha. */
export const IconCircle = styled.span<{ $size?: number }>`
  display: inline-grid;
  place-items: center;
  flex-shrink: 0;
  width: ${p => p.$size ?? 40}px;
  height: ${p => p.$size ?? 40}px;
  border-radius: ${p => p.theme.radius.pill};
  border: 1px solid ${p => p.theme.borderStrong};
  color: ${p => p.theme.text};
`

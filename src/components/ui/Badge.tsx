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
  letter-spacing: ${p => p.theme.type.caption.tracking};
  color: ${p => p.theme.text};

  ${p =>
    p.$variant === 'outline'
      ? css`
          border: 1px solid ${p.theme.text};
        `
      : css`
          background: ${p.theme.border};
          border: 1px solid ${p.theme.border};
        `}
`

/** Circulo com filete walnut que abriga os icones de linha. */
export const IconCircle = styled.span<{ $size?: number }>`
  display: inline-grid;
  place-items: center;
  flex-shrink: 0;
  width: ${p => p.$size ?? 40}px;
  height: ${p => p.$size ?? 40}px;
  border-radius: ${p => p.theme.radius.pill};
  border: 1px solid ${p => p.theme.border};
  color: ${p => p.theme.text};
`

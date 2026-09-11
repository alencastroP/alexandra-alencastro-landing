import styled from 'styled-components'

/** Monograma "AA" em circulo -- e icone de marca, entao segue a regra da pilula. */
export const Mark = styled.span<{ $size?: number }>`
  display: inline-grid;
  place-items: center;
  flex-shrink: 0;
  width: ${p => p.$size ?? 36}px;
  height: ${p => p.$size ?? 36}px;
  border: 1px solid ${p => p.theme.text};
  border-radius: ${p => p.theme.radius.pill};
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.06em;
`

import styled from 'styled-components'

/**
 * Selo girado, tipo carimbo de cartorio: contorno creme, texto em caixa
 * alta pequena. Serve para pendurar o registro do CRECI num canto sem
 * virar mais uma linha de texto.
 */
export const Seal = styled.span<{ $angulo?: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  border: 1px solid ${p => p.theme.text};
  border-radius: ${p => p.theme.radius.pill};
  font-size: ${p => p.theme.type.caption.size};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;
  transform: rotate(${p => p.$angulo ?? -6}deg);
`

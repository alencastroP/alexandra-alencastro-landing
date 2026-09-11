import type { ReactNode } from 'react'
import styled, { css } from 'styled-components'
import { ease } from '../../styles/animations'
import { Icon } from './Icon'

/**
 * Acoes da marca.
 *
 * Toda acao e pilula (9999px) e fica chapada na pagina: sem sombra, sem
 * brilho. A profundidade vem so do contraste -- ambar sobre espresso. No
 * hover o ambar "esfria" para creme, sem introduzir cor nova.
 */
const pill = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
  padding: 12px 20px;
  border-radius: ${p => p.theme.radius.pill};
  font-size: ${p => p.theme.type.body.size};
  font-weight: 500;
  line-height: 1.2;
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.25s ${ease.inOut}, color 0.25s ${ease.inOut},
    border-color 0.25s ${ease.inOut};
`

/** CTA primario: preenchimento ambar, tinta espresso. */
export const Button = styled.button`
  ${pill}
  border: 1px solid ${p => p.theme.accent};
  background: ${p => p.theme.accent};
  color: ${p => p.theme.onAccent};

  &:hover {
    background: ${p => p.theme.text};
    border-color: ${p => p.theme.text};
  }
`

/** Acao secundaria: contorno creme. Na faixa clara (`$inverse`), espresso. */
export const OutlineButton = styled.button<{ $inverse?: boolean }>`
  ${pill}
  background: transparent;
  color: ${p => (p.$inverse ? p.theme.textInverse : p.theme.text)};
  border: 1px solid currentColor;

  &:hover {
    background: ${p => (p.$inverse ? p.theme.textInverse : p.theme.text)};
    border-color: ${p => (p.$inverse ? p.theme.textInverse : p.theme.text)};
    color: ${p => (p.$inverse ? p.theme.bgInverse : p.theme.bg)};
  }
`

/** Circulo ambar com a seta diagonal: o "vai" que acompanha os CTAs. */
export const ArrowCircle = styled.span<{ $size?: number }>`
  display: inline-grid;
  place-items: center;
  flex-shrink: 0;
  width: ${p => p.$size ?? 44}px;
  height: ${p => p.$size ?? 44}px;
  border-radius: ${p => p.theme.radius.pill};
  background: ${p => p.theme.accent};
  color: ${p => p.theme.onAccent};

  svg {
    transition: transform 0.35s ${ease.out};
  }
`

const Group = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 4px;

  .label {
    ${pill}
    border: 1px solid ${p => p.theme.accent};
    background: ${p => p.theme.accent};
    color: ${p => p.theme.onAccent};
  }

  &:hover .label {
    background: ${p => p.theme.text};
    border-color: ${p => p.theme.text};
  }

  /* A seta diagonal endireita para a frente: o botao "aponta" o caminho. */
  &:hover ${ArrowCircle} svg {
    transform: rotate(45deg);
  }
`

interface PrimaryActionProps {
  children: ReactNode
  href: string
  className?: string
}

/** CTA completo: pilula ambar + circulo com seta, clicaveis como um so link. */
export function PrimaryAction({ children, href, className }: PrimaryActionProps) {
  return (
    <Group href={href} className={className}>
      <span className="label">{children}</span>
      <ArrowCircle aria-hidden="true">
        <Icon name="arrowUpRight" size={18} />
      </ArrowCircle>
    </Group>
  )
}

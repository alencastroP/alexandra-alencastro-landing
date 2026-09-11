import type { ReactElement, SVGProps } from 'react'

/**
 * Icones de linha, monocromaticos, na cor do texto (currentColor).
 *
 * Desenhados num grid de 24px com o mesmo traco em todos, para nenhum
 * "gritar" mais que o outro. Sem biblioteca: sao poucos, e assim a pagina
 * nao carrega o que nao usa.
 */
const PATHS = {
  arrowUpRight: <path d="M7 17 17 7M8.5 7H17v8.5" />,
  arrowRight: <path d="M4.5 12h15m-5.5-5.5L19.5 12 14 17.5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.35-4.35" />
    </>
  ),
  chart: (
    <>
      <path d="M4 4v16h16" />
      <path d="m8 15 3.5-3.5 3 3L20 9" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.5 5 6.2v5.3c0 4.2 2.9 7.8 7 9 4.1-1.2 7-4.8 7-9V6.2z" />
      <path d="m9 12 2.2 2.2L15.2 10" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="15.5" r="3.8" />
      <path d="m10.8 12.8 8.7-8.7M16.5 7.1l2.6 2.6M14.3 9.3l2 2" />
    </>
  ),
  tag: (
    <>
      <path d="M3.5 12.2V4.5a1 1 0 0 1 1-1h7.7l8.3 8.3a1 1 0 0 1 0 1.4l-7.8 7.8a1 1 0 0 1-1.4 0z" />
      <circle cx="8.2" cy="8.2" r="1.3" />
    </>
  ),
  home: (
    <>
      <path d="M3.5 11 12 4l8.5 7" />
      <path d="M6 9.2V20h12V9.2" />
      <path d="M10 20v-5.5h4V20" />
    </>
  ),
  building: (
    <>
      <path d="M5 20.5V5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v15.5" />
      <path d="M14 9.5h4a1 1 0 0 1 1 1v10" />
      <path d="M3 20.5h18M8.5 8h2M8.5 11.5h2M8.5 15h2" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s6.5-5.7 6.5-11a6.5 6.5 0 0 0-13 0c0 5.3 6.5 11 6.5 11z" />
      <circle cx="12" cy="10" r="2.4" />
    </>
  ),
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4.5 7.5 7.5 5.5 7.5-5.5" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.4" fill="currentColor" />
    </>
  ),
  menu: <path d="M4 8.5h16M4 15.5h16" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  whatsapp: (
    <>
      <path d="M20.5 11.8a8.5 8.5 0 0 1-12.6 7.4l-4.4 1.3 1.4-4.2a8.5 8.5 0 1 1 15.6-4.5z" />
      <path
        d="M9.2 8.2c.2-.4.5-.5.8-.5h.5c.2 0 .4.1.5.4l.8 1.8c.1.2 0 .5-.1.7l-.6.7c.6 1.2 1.6 2.2 2.8 2.8l.7-.6c.2-.2.5-.2.7-.1l1.8.8c.3.1.4.3.4.5v.5c0 .3-.1.6-.5.8-.6.3-1.3.4-2 .3-2.8-.5-5.2-2.9-5.7-5.7-.1-.7 0-1.4.4-2.1z"
        fill="currentColor"
        stroke="none"
      />
    </>
  ),
} satisfies Record<string, ReactElement>

export type IconName = keyof typeof PATHS

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName
  size?: number
  strokeWidth?: number
}

export function Icon({ name, size = 18, strokeWidth = 1.6, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {PATHS[name]}
    </svg>
  )
}

import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    /* PP Neue Montreal primeiro: se a licenca for instalada via @font-face,
       ela assume sozinha. Ate la, o Inter (carregado no index.html) segura. */
    --font-sans: 'PP Neue Montreal', 'Inter', ui-sans-serif, system-ui, -apple-system,
      BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  html {
    scroll-behavior: smooth;
    /* A navbar e fixa: garante que ancoras nao parem embaixo dela. */
    scroll-padding-top: calc(${p => p.theme.layout.navHeight} + 8px);
  }

  body {
    background: ${p => p.theme.bg};
    color: ${p => p.theme.text};
    font-family: var(--font-sans);
    font-size: ${p => p.theme.type.bodyLg.size};
    line-height: ${p => p.theme.type.bodyLg.leading};
    font-weight: 400;
    font-feature-settings: 'ss01' on, 'kern' on, 'liga' on;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  /* A marca so conhece dois pesos. Qualquer <strong>/<h*> do navegador
     viraria 700 -- aqui ele volta para o 500. */
  h1, h2, h3, h4, strong, b { font-weight: 500; }

  img { display: block; max-width: 100%; }

  a { color: inherit; text-decoration: none; }

  button, input, select, textarea { font: inherit; color: inherit; }

  ul, ol { list-style: none; }

  ::selection {
    background: ${p => p.theme.accent};
    color: ${p => p.theme.onAccent};
  }

  /* Foco visivel no ambar -- contorno, nunca brilho (a marca nao tem glow). */
  :focus-visible {
    outline: 2px solid ${p => p.theme.accent};
    outline-offset: 3px;
  }

  ::-webkit-scrollbar { width: 10px; }
  ::-webkit-scrollbar-track { background: ${p => p.theme.bgDeep}; }
  ::-webkit-scrollbar-thumb {
    background: ${p => p.theme.border};
    border-radius: ${p => p.theme.radius.pill};
    border: 2px solid ${p => p.theme.bgDeep};
  }
  ::-webkit-scrollbar-thumb:hover { background: ${p => p.theme.textMuted}; }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after {
      animation-duration: 0.001ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.001ms !important;
      scroll-behavior: auto !important;
    }
  }
`

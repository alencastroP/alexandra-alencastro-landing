import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import { App } from './App'
import { GlobalStyle } from './styles/GlobalStyle'
import { theme } from './styles/theme'
import { LeadIntentProvider } from './context/LeadIntentContext'

const container = document.getElementById('root')
if (!container) throw new Error('Elemento #root nao encontrado no index.html')

createRoot(container).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <LeadIntentProvider>
        <App />
      </LeadIntentProvider>
    </ThemeProvider>
  </StrictMode>,
)

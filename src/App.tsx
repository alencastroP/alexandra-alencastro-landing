import styled from 'styled-components'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { WhatsAppFab } from './components/layout/WhatsAppFab'
import { Hero } from './components/sections/Hero'
import { Bairros } from './components/sections/Bairros'
import { Services } from './components/sections/Services'
import { Tempo } from './components/sections/Tempo'
import { Process } from './components/sections/Process'
import { About } from './components/sections/About'
import { Instagram } from './components/sections/Instagram'
import { Faq } from './components/sections/Faq'
import { LeadForm } from './components/sections/LeadForm'

/* `clip` e nao `hidden`: corta o vazamento lateral sem criar um container
   de rolagem -- o que quebraria o `position: sticky` do FAQ. */
const Page = styled.div`
  width: 100%;
  overflow-x: clip;
`

export function App() {
  return (
    <Page>
      <Navbar />
      <main>
        <Hero />
        <Bairros />
        <Services />
        <Tempo />
        <Process />
        <About />
        <Instagram />
        <Faq />
        <LeadForm />
      </main>
      <Footer />
      <WhatsAppFab />
    </Page>
  )
}

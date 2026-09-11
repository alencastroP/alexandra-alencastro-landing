import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Container } from '../ui/Container'
import { Button, OutlineButton } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { useScrolled } from '../../hooks/useScrolled'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { navLinks, perfil, secoesObservadas } from '../../data/content'
import { mensagemPadrao, whatsappUrl } from '../../utils/whatsapp'
import { ease } from '../../styles/animations'
import { bp } from '../../styles/theme'

/** Transparente sobre a capa; vira espresso solido assim que a pagina rola. */
const Bar = styled.header<{ $solid: boolean }>`
  position: fixed;
  inset: 0 0 auto;
  z-index: 50;
  background: ${p => (p.$solid ? p.theme.bg : 'transparent')};
  border-bottom: 1px solid ${p => (p.$solid ? p.theme.border : 'transparent')};
  transition: background-color 0.35s ${ease.inOut}, border-color 0.35s ${ease.inOut};
`

const Inner = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  height: ${p => p.theme.layout.navHeight};
`

/* So o nome, sem simbolo: a assinatura da pagina e o nome dela. */
const Brand = styled.a`
  font-size: ${p => p.theme.type.bodyLg.size};
  font-weight: 500;
  letter-spacing: -0.01em;
  white-space: nowrap;
`

const Links = styled.nav`
  ul {
    display: flex;
    gap: 28px;
  }

  @media (max-width: ${bp.tablet}) {
    display: none;
  }
`

const NavLink = styled.a<{ $active: boolean }>`
  padding: 6px 0;
  font-size: ${p => p.theme.type.body.size};
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 6px;
  text-decoration-color: ${p => (p.$active ? p.theme.text : 'transparent')};
  transition: text-decoration-color 0.25s ${ease.inOut};

  &:hover {
    text-decoration-color: ${p => p.theme.textMuted};
  }
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const WhatsLink = styled(OutlineButton)`
  @media (max-width: ${bp.phone}) {
    display: none;
  }
`

/* No celular a capa ja traz o CTA e o botao flutuante assume depois dela. */
const NavCta = styled(Button)`
  @media (max-width: ${bp.phone}) {
    display: none;
  }
`

const Burger = styled.button`
  display: none;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 1px solid ${p => p.theme.borderStrong};
  border-radius: ${p => p.theme.radius.pill};
  background: transparent;
  color: ${p => p.theme.text};
  cursor: pointer;

  @media (max-width: ${bp.tablet}) {
    display: inline-grid;
  }
`

/* Faixa cheia, sem moldura: e superficie estrutural, nao card -- por isso
   pode abrigar a pilula do WhatsApp sem quebrar a regra de raios. */
const MobileMenu = styled.div<{ $open: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  padding: 8px 0 24px;
  background: ${p => p.theme.bg};
  border-bottom: 1px solid ${p => p.theme.border};
  visibility: ${p => (p.$open ? 'visible' : 'hidden')};
  opacity: ${p => (p.$open ? 1 : 0)};
  transform: translateY(${p => (p.$open ? '0' : '-8px')});
  transition: opacity 0.3s ${ease.out}, transform 0.3s ${ease.out}, visibility 0.3s;

  ul {
    margin-bottom: 20px;
  }

  li + li {
    border-top: 1px solid ${p => p.theme.border};
  }

  li a {
    display: block;
    padding: 14px 0;
    font-size: ${p => p.theme.type.subheading.size};
  }

  @media (min-width: 981px) {
    display: none;
  }
`

const MenuWhats = styled(OutlineButton)`
  width: 100%;
`

export function Navbar() {
  const scrolled = useScrolled(12)
  const active = useScrollSpy(secoesObservadas)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onResize = () => {
      if (window.innerWidth > 980) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const close = () => setOpen(false)
  const whats = whatsappUrl(mensagemPadrao)

  return (
    <Bar $solid={scrolled || open}>
      <Inner>
        <Brand href="#topo" onClick={close} aria-label={`${perfil.nome}, voltar ao início`}>
          {perfil.nome}
        </Brand>

        <Links aria-label="Seções da página">
          <ul>
            {navLinks.map(link => (
              <li key={link.id}>
                <NavLink
                  href={`#${link.id}`}
                  $active={active === link.id}
                  aria-current={active === link.id ? 'location' : undefined}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </Links>

        <Actions>
          <WhatsLink as="a" href={whats} target="_blank" rel="noopener noreferrer">
            <Icon name="whatsapp" size={16} />
            WhatsApp
          </WhatsLink>
          <NavCta as="a" href="#contato">
            Agendar conversa
          </NavCta>
          <Burger
            type="button"
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
            aria-controls="menu-celular"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          >
            <Icon name={open ? 'close' : 'menu'} size={20} />
          </Burger>
        </Actions>
      </Inner>

      <MobileMenu id="menu-celular" $open={open}>
        <Container>
          <ul>
            {navLinks.map(link => (
              <li key={link.id}>
                <a href={`#${link.id}`} onClick={close}>
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#contato" onClick={close}>
                Contato
              </a>
            </li>
          </ul>
          <MenuWhats as="a" href={whats} target="_blank" rel="noopener noreferrer">
            <Icon name="whatsapp" size={16} />
            Conversar no WhatsApp
          </MenuWhats>
        </Container>
      </MobileMenu>
    </Bar>
  )
}

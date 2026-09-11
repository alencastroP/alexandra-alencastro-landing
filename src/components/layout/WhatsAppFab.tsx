import styled from 'styled-components'
import { Icon } from '../ui/Icon'
import { useScrolled } from '../../hooks/useScrolled'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { perfil, secoesObservadas } from '../../data/content'
import { mensagemPadrao, whatsappUrl } from '../../utils/whatsapp'
import { ease } from '../../styles/animations'

const Fab = styled.a<{ $visible: boolean }>`
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 40;
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: ${p => p.theme.radius.pill};
  background: ${p => p.theme.accent};
  color: ${p => p.theme.onAccent};
  visibility: ${p => (p.$visible ? 'visible' : 'hidden')};
  opacity: ${p => (p.$visible ? 1 : 0)};
  transform: translateY(${p => (p.$visible ? '0' : '12px')});
  transition: opacity 0.3s ${ease.out}, transform 0.3s ${ease.out}, visibility 0.3s,
    background-color 0.25s ${ease.inOut};

  &:hover {
    background: ${p => p.theme.text};
  }
`

/**
 * Atalho fixo para o WhatsApp. Aparece depois da capa (onde o CTA ja esta
 * a vista) e some no formulario, para nao cobrir o botao de enviar.
 */
export function WhatsAppFab() {
  const passouDaCapa = useScrolled(560)
  const ativa = useScrollSpy(secoesObservadas)
  const visivel = passouDaCapa && ativa !== 'contato'

  return (
    <Fab
      href={whatsappUrl(mensagemPadrao)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Conversar com a ${perfil.primeiroNome} no WhatsApp`}
      $visible={visivel}
    >
      <Icon name="whatsapp" size={24} />
    </Fab>
  )
}

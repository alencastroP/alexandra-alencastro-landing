import styled from 'styled-components'
import { Container } from '../ui/Container'
import { Icon } from '../ui/Icon'
import { Mark } from '../ui/Mark'
import { navLinks, perfil } from '../../data/content'
import { mensagemPadrao, whatsappUrl } from '../../utils/whatsapp'
import { bp } from '../../styles/theme'

/** Midnight Cocoa: um degrau abaixo da pagina, fecha a leitura. */
const Wrap = styled.footer`
  overflow: hidden;
  padding: 52px 0 24px;
  background: ${p => p.theme.bgDeep};
  border-top: 1px solid ${p => p.theme.borderSoft};
`

const Top = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: 32px;
  padding-bottom: 40px;
  border-bottom: 1px solid ${p => p.theme.border};

  @media (max-width: ${bp.tablet}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: ${bp.phone}) {
    grid-template-columns: 1fr;
  }
`

const BrandCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;

  @media (max-width: ${bp.tablet}) {
    grid-column: 1 / -1;
  }

  .brand {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: ${p => p.theme.type.bodyLg.size};
    font-weight: 500;
  }

  p {
    max-width: 320px;
    font-size: ${p => p.theme.type.body.size};
    color: ${p => p.theme.textMuted};
  }
`

const Col = styled.div`
  h2 {
    margin-bottom: 14px;
    font-size: ${p => p.theme.type.body.size};
    font-weight: 500;
    color: ${p => p.theme.textMuted};
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  a {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: ${p => p.theme.type.body.size};
    text-decoration: underline;
    text-decoration-color: transparent;
    text-underline-offset: 5px;
    transition: text-decoration-color 0.2s;
  }

  a:hover {
    text-decoration-color: currentColor;
  }
`

/* O nome em letra vazada, sangrando para fora da tela: assina a pagina
   sem virar mais um paragrafo. E decoracao, entao sai do fluxo de leitura. */
const Assinatura = styled.div`
  margin: 36px 0 8px;
  font-size: clamp(56px, 13vw, 168px);
  line-height: 0.82;
  letter-spacing: -0.04em;
  white-space: nowrap;
  color: transparent;
  -webkit-text-stroke: 1px ${p => p.theme.border};
  user-select: none;
`

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px 24px;
  padding-top: 20px;
  font-size: ${p => p.theme.type.caption.size};
  line-height: ${p => p.theme.type.caption.leading};
  color: ${p => p.theme.textMuted};

  a:hover {
    color: ${p => p.theme.text};
  }
`

export function Footer() {
  return (
    <Wrap>
      <Container>
        <Top>
          <BrandCol>
            <span className="brand">
              <Mark aria-hidden="true">{perfil.monograma}</Mark>
              {perfil.nome}
            </span>
            <p>
              {perfil.profissao} em {perfil.cidade}/{perfil.estado}. Compra, venda, aluguel e
              investimento em {perfil.regiao}.
            </p>
            <p>{perfil.creci}</p>
          </BrandCol>

          <Col>
            <h2>A página</h2>
            <ul>
              {navLinks.map(link => (
                <li key={link.id}>
                  <a href={`#${link.id}`}>{link.label}</a>
                </li>
              ))}
            </ul>
          </Col>

          <Col>
            <h2>Falar comigo</h2>
            <ul>
              <li>
                <a href={whatsappUrl(mensagemPadrao)} target="_blank" rel="noopener noreferrer">
                  <Icon name="whatsapp" size={16} />
                  {perfil.whatsappExibicao}
                </a>
              </li>
              <li>
                <a href={perfil.instagram} target="_blank" rel="noopener noreferrer">
                  <Icon name="instagram" size={16} />
                  {perfil.instagramUsuario}
                </a>
              </li>
              <li>
                <a href="#contato">
                  <Icon name="arrowUpRight" size={16} />
                  Formulário
                </a>
              </li>
            </ul>
          </Col>
        </Top>

        <Assinatura aria-hidden="true">{perfil.nome.toUpperCase()}</Assinatura>

        <Bottom>
          <p>
            © {new Date().getFullYear()} {perfil.nome} · {perfil.creci}. Informações sobre imóveis
            sujeitas a confirmação e alteração sem aviso prévio.
          </p>
          <a href="#topo">Voltar ao topo ↑</a>
        </Bottom>
      </Container>
    </Wrap>
  )
}

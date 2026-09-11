import { useEffect, useRef, useState, type FormEvent } from 'react'
import styled, { css } from 'styled-components'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { Eyebrow, Lead, Title } from '../ui/Heading'
import { Button } from '../ui/Button'
import { IconCircle } from '../ui/Badge'
import { Icon } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'
import { useLeadIntent } from '../../context/LeadIntentContext'
import { ease, riseIn } from '../../styles/animations'
import { bp } from '../../styles/theme'
import {
  contato,
  detalhesPorObjetivo,
  objetivos,
  perfil,
  tiposImovel,
} from '../../data/content'
import {
  abrirWhatsApp,
  mensagemPadrao,
  montarMensagemLead,
  whatsappUrl,
} from '../../utils/whatsapp'

/* Duas colunas separadas por um filete, sem moldura em volta do form:
   a marca nao deixa botao-pilula morar dentro de card de 6px. */
const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);

  @media (max-width: ${bp.tablet}) {
    grid-template-columns: minmax(0, 1fr);
  }
`

const Intro = styled.div`
  padding-right: 52px;

  ${Lead} {
    margin-top: 20px;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 32px;
  }

  li {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: ${p => p.theme.type.bodyLg.size};
  }

  @media (max-width: ${bp.tablet}) {
    padding: 0 0 40px;
  }
`

const Direct = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid ${p => p.theme.border};

  p {
    font-size: ${p => p.theme.type.body.size};
    color: ${p => p.theme.textMuted};
  }

  a {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    width: fit-content;
    font-size: ${p => p.theme.type.bodyLg.size};
    text-decoration: underline;
    text-decoration-color: transparent;
    text-underline-offset: 5px;
    transition: text-decoration-color 0.2s;
  }

  a:hover {
    text-decoration-color: currentColor;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-left: 52px;
  border-left: 1px solid ${p => p.theme.border};

  @media (max-width: ${bp.tablet}) {
    padding: 40px 0 0;
    border-left: 0;
    border-top: 1px solid ${p => p.theme.border};
  }
`

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Label = styled.label`
  font-size: ${p => p.theme.type.body.size};
  font-weight: 500;
`

const Optional = styled.span`
  font-weight: 400;
  color: ${p => p.theme.textMuted};
`

/* Campo pilula: transparente, filete cedar, foco so troca a cor da borda
   para ambar -- sem brilho. 16px de fonte evita o zoom automatico do iOS. */
const control = css`
  width: 100%;
  min-height: 48px;
  padding: 12px 20px;
  border: 1px solid ${p => p.theme.borderInput};
  border-radius: ${p => p.theme.radius.pill};
  background: transparent;
  color: ${p => p.theme.text};
  font-size: ${p => p.theme.type.bodyLg.size};
  transition: border-color 0.2s ${ease.inOut};

  &::placeholder {
    color: ${p => p.theme.textMuted};
  }

  &:hover {
    border-color: ${p => p.theme.textMuted};
  }

  &:focus,
  &:focus-visible {
    outline: none;
    border-color: ${p => p.theme.accent};
  }

  &[aria-invalid='true'] {
    border-color: ${p => p.theme.accent};
  }
`

const Input = styled.input`
  ${control}
`

const CHEVRON =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none' stroke='%23fff1e0' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m1 1.5 5 5 5-5'/%3E%3C/svg%3E\")"

const Select = styled.select`
  ${control}
  appearance: none;
  padding-right: 48px;
  background-image: ${CHEVRON};
  background-repeat: no-repeat;
  background-position: right 20px center;
  cursor: pointer;

  /* A lista nativa abre com fundo do sistema -- no Windows seria branca. */
  option {
    background: ${p => p.theme.bg};
    color: ${p => p.theme.text};
  }
`

/* Multilinha nao vira pilula de verdade (ficaria uma capsula estranha):
   raio generoso mantem a familia sem distorcer o campo. */
const Textarea = styled.textarea`
  ${control}
  min-height: 112px;
  border-radius: 22px;
  line-height: 1.5;
  resize: vertical;
`

const Row = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 20px;

  @media (max-width: ${bp.phone}) {
    grid-template-columns: minmax(0, 1fr);
  }
`

const Choices = styled.fieldset`
  min-width: 0;
  border: 0;

  legend {
    margin-bottom: 8px;
    padding: 0;
    font-size: ${p => p.theme.type.body.size};
    font-weight: 500;
  }

  .opcoes {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
`

/* Radio nativo por baixo (teclado e leitor de tela funcionam de graca);
   a pilula e so a pele. Selecionado inverte para creme -- o ambar fica
   reservado para o botao de enviar. */
const Choice = styled.label`
  position: relative;

  input {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    pointer-events: none;
  }

  span {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    padding: 10px 18px;
    border: 1px solid ${p => p.theme.borderInput};
    border-radius: ${p => p.theme.radius.pill};
    font-size: ${p => p.theme.type.body.size};
    cursor: pointer;
    transition: background-color 0.2s ${ease.inOut}, color 0.2s ${ease.inOut},
      border-color 0.2s ${ease.inOut};
  }

  span:hover {
    border-color: ${p => p.theme.textMuted};
  }

  input:checked + span {
    background: ${p => p.theme.text};
    border-color: ${p => p.theme.text};
    color: ${p => p.theme.bg};
  }

  input:focus-visible + span {
    outline: 2px solid ${p => p.theme.accent};
    outline-offset: 3px;
  }
`

const FieldError = styled.p`
  display: flex;
  align-items: center;
  gap: 6px;
  padding-left: 20px;
  font-size: ${p => p.theme.type.body.size};
  color: ${p => p.theme.accent};
`

const Submit = styled(Button)`
  width: 100%;
  min-height: 52px;
  margin-top: 4px;
`

const Note = styled.p`
  font-size: 13px;
  line-height: 1.4;
  text-align: center;
  color: ${p => p.theme.textMuted};
`

const Success = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  border: 1px solid ${p => p.theme.border};
  border-radius: ${p => p.theme.radius.card};
  font-size: ${p => p.theme.type.body.size};
  line-height: 1.5;
  animation: ${riseIn} 0.5s ${ease.out} both;

  > svg {
    flex-shrink: 0;
    margin-top: 1px;
    color: ${p => p.theme.accent};
  }

  a {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
`

export function LeadForm() {
  const { objetivo, setObjetivo } = useLeadIntent()
  const [nome, setNome] = useState('')
  const [tipo, setTipo] = useState('')
  const [faixa, setFaixa] = useState('')
  const [regiao, setRegiao] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')
  const [enviadoUrl, setEnviadoUrl] = useState<string | null>(null)
  const nomeRef = useRef<HTMLInputElement>(null)

  const detalhes = detalhesPorObjetivo[objetivo]

  // Faixa de compra nao serve para aluguel (e vice-versa): trocar o
  // objetivo -- aqui ou pelos cards de servico -- limpa a escolha antiga.
  useEffect(() => {
    setFaixa('')
  }, [objetivo])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (nome.trim().length < 2) {
      setErro('Me conta seu nome para eu saber com quem vou falar.')
      nomeRef.current?.focus()
      return
    }

    const url = whatsappUrl(
      montarMensagemLead({
        nome: nome.trim(),
        objetivo,
        tipo,
        faixa,
        faixaRotulo: detalhes.faixaRotulo,
        regiao: regiao.trim(),
        regiaoRotulo: detalhes.regiaoRotulo,
        mensagem: mensagem.trim(),
      }),
    )

    // Ponto de conversao: se usar Meta Pixel / GA4 / Google Ads,
    // dispare o evento de lead aqui, antes de abrir o WhatsApp.
    abrirWhatsApp(url)
    setEnviadoUrl(url)
  }

  return (
    <Section id="contato" aria-labelledby="contato-titulo">
      <Container>
        <Grid>
          <Reveal>
            <Intro>
              <Eyebrow>{contato.rotulo}</Eyebrow>
              <Title id="contato-titulo">{contato.titulo}</Title>
              <Lead>{contato.texto}</Lead>
              <ul>
                {contato.beneficios.map(beneficio => (
                  <li key={beneficio}>
                    <IconCircle $size={32}>
                      <Icon name="check" size={16} />
                    </IconCircle>
                    {beneficio}
                  </li>
                ))}
              </ul>

              <Direct>
                <p>Prefere chamar direto?</p>
                <a href={whatsappUrl(mensagemPadrao)} target="_blank" rel="noopener noreferrer">
                  <Icon name="whatsapp" size={18} />
                  {perfil.whatsappExibicao}
                </a>
              </Direct>
            </Intro>
          </Reveal>

          <Reveal delay={0.1}>
            <Form id="formulario" onSubmit={handleSubmit} noValidate aria-describedby="contato-nota">
              <Choices>
                <legend>O que você quer fazer?</legend>
                <div className="opcoes">
                  {objetivos.map(opcao => (
                    <Choice key={opcao}>
                      <input
                        type="radio"
                        name="objetivo"
                        value={opcao}
                        checked={objetivo === opcao}
                        onChange={() => setObjetivo(opcao)}
                      />
                      <span>{opcao}</span>
                    </Choice>
                  ))}
                </div>
              </Choices>

              <Field>
                <Label htmlFor="lead-nome">Seu nome</Label>
                <Input
                  ref={nomeRef}
                  id="lead-nome"
                  name="nome"
                  value={nome}
                  onChange={e => {
                    setNome(e.target.value)
                    setErro('')
                  }}
                  placeholder="Como posso te chamar?"
                  autoComplete="name"
                  aria-invalid={erro ? true : undefined}
                  aria-describedby={erro ? 'lead-nome-erro' : undefined}
                />
                {erro && (
                  <FieldError id="lead-nome-erro" role="alert">
                    {erro}
                  </FieldError>
                )}
              </Field>

              <Row>
                <Field>
                  <Label htmlFor="lead-tipo">
                    Tipo de imóvel <Optional>(opcional)</Optional>
                  </Label>
                  <Select id="lead-tipo" value={tipo} onChange={e => setTipo(e.target.value)}>
                    <option value="">Selecione</option>
                    {tiposImovel.map(opcao => (
                      <option key={opcao}>{opcao}</option>
                    ))}
                  </Select>
                </Field>

                <Field>
                  <Label htmlFor="lead-faixa">
                    {detalhes.faixaRotulo} <Optional>(opcional)</Optional>
                  </Label>
                  <Select id="lead-faixa" value={faixa} onChange={e => setFaixa(e.target.value)}>
                    <option value="">Selecione</option>
                    {detalhes.faixas.map(opcao => (
                      <option key={opcao}>{opcao}</option>
                    ))}
                  </Select>
                </Field>
              </Row>

              <Field>
                <Label htmlFor="lead-regiao">
                  {detalhes.regiaoRotulo} <Optional>(opcional)</Optional>
                </Label>
                <Input
                  id="lead-regiao"
                  name="regiao"
                  value={regiao}
                  onChange={e => setRegiao(e.target.value)}
                  placeholder={detalhes.regiaoPlaceholder}
                />
              </Field>

              <Field>
                <Label htmlFor="lead-mensagem">
                  Algo mais que eu deva saber? <Optional>(opcional)</Optional>
                </Label>
                <Textarea
                  id="lead-mensagem"
                  name="mensagem"
                  value={mensagem}
                  onChange={e => setMensagem(e.target.value)}
                  placeholder="Prazo, número de quartos, vaga, se aceita pet..."
                  rows={3}
                />
              </Field>

              <Submit type="submit">
                <Icon name="whatsapp" size={18} />
                {contato.enviar}
              </Submit>

              {enviadoUrl && (
                <Success role="status">
                  <Icon name="check" size={18} />
                  <p>
                    Pronto! O WhatsApp abriu com a sua mensagem — é só tocar em enviar. Não abriu?{' '}
                    <a href={enviadoUrl} target="_blank" rel="noopener noreferrer">
                      Toque aqui
                    </a>
                    .
                  </p>
                </Success>
              )}

              <Note id="contato-nota">{contato.nota}</Note>
            </Form>
          </Reveal>
        </Grid>
      </Container>
    </Section>
  )
}

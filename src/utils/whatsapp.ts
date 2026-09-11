import { perfil, type Objetivo } from '../data/content'

/**
 * Captacao via WhatsApp: sem backend, o lead chega direto no celular da
 * Alexandra, ja com os dados do formulario escritos na mensagem.
 */

/** Link wa.me, com mensagem opcional ja preenchida. */
export function whatsappUrl(mensagem?: string) {
  const base = `https://wa.me/${perfil.whatsapp}`
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base
}

/** Mensagem dos atalhos soltos (nav, FAQ, rodape, botao flutuante). */
export const mensagemPadrao = `Olá, ${perfil.primeiroNome}! Vim pelo seu site e gostaria de conversar sobre um imóvel.`

export interface Lead {
  nome: string
  objetivo: Objetivo
  tipo: string
  faixa: string
  faixaRotulo: string
  regiao: string
  regiaoRotulo: string
  mensagem: string
}

/**
 * Monta a mensagem do lead. Os rotulos em *negrito* sao a marcacao do
 * proprio WhatsApp -- a Alexandra bate o olho e ja entende o pedido.
 * Campos opcionais em branco simplesmente nao aparecem.
 */
export function montarMensagemLead(lead: Lead) {
  const linhas: (string | null)[] = [
    `Olá, ${perfil.primeiroNome}! Vim pelo seu site.`,
    '',
    `*Nome:* ${lead.nome}`,
    `*Objetivo:* ${lead.objetivo}`,
    lead.tipo ? `*Tipo de imóvel:* ${lead.tipo}` : null,
    lead.faixa ? `*${lead.faixaRotulo}:* ${lead.faixa}` : null,
    lead.regiao ? `*${lead.regiaoRotulo}:* ${lead.regiao}` : null,
    lead.mensagem ? `\n${lead.mensagem}` : null,
  ]
  return linhas.filter((linha): linha is string => linha !== null).join('\n')
}

/**
 * Abre o WhatsApp em outra aba. Se o navegador bloquear o pop-up, cai para
 * a mesma aba -- perder o lead por causa de bloqueador nao e opcao.
 */
export function abrirWhatsApp(url: string) {
  const janela = window.open(url, '_blank')
  if (janela) janela.opener = null
  else window.location.href = url
}

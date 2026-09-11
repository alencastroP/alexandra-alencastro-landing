import type { IconName } from '../components/ui/Icon'
import fotoAlexandra from '../components/alexandra.jpg'

/**
 * Todo o texto da pagina mora aqui -- as secoes so desenham.
 *
 * A voz e a dela, em primeira pessoa: frase curta, palavra do dia a dia,
 * nada de "solucao personalizada" ou "experiencia unica". Se uma frase
 * podia estar no site de qualquer corretora do Brasil, ela nao serve aqui.
 *
 * Nao ha numero de resultado nem depoimento nesta pagina de proposito:
 * nenhum dos dois existia de verdade. Quando houver (print de conversa,
 * avaliacao do Google, numero real de vendas), da para colocar.
 */

export const perfil = {
  nome: 'Alexandra Alencastro',
  primeiroNome: 'Alexandra',
  monograma: 'AA',
  profissao: 'Corretora de imóveis',
  cidade: 'Natal',
  estado: 'RN',
  regiao: 'Natal e região metropolitana',
  creci: 'CRECI-RN 6091',
  /** So digitos: 55 + DDD + numero. */
  whatsapp: '5584999628398',
  /** Como o numero aparece escrito na pagina. */
  whatsappExibicao: '(84) 99962-8398',
  instagram: 'https://www.instagram.com/alexandraalencastro_/',
  instagramUsuario: '@alexandraalencastro_',
  /** Foto da capa: src/components/alexandra.jpg (o Vite poe hash no nome no build). */
  foto: fotoAlexandra,
  tempoResposta: 'até 2 horas',
} as const

export const navLinks = [
  { id: 'servicos', label: 'Serviços' },
  { id: 'tempo', label: 'Por que agora' },
  { id: 'processo', label: 'Como funciona' },
  { id: 'sobre', label: 'Quem sou' },
  { id: 'perguntas', label: 'Dúvidas' },
] as const

/** Secoes que o scroll spy acompanha (nav ativa e botao flutuante). */
export const secoesObservadas: readonly string[] = [
  'topo',
  ...navLinks.map(link => link.id),
  'instagram',
  'contato',
]

/* ------------------------------------------------------------------ */
/* Capa                                                                */
/* ------------------------------------------------------------------ */

export const hero = {
  selo: `${perfil.profissao} · ${perfil.cidade}/${perfil.estado}`,
  /** Uma linha por item: cada uma sobe por tras da propria mascara. */
  titulo: ['Em Natal,', 'o imóvel certo', 'não espera.'],
  lead: 'Sou Alexandra, corretora em Natal. Cuido da busca, das visitas e da papelada com você, do primeiro contato até a chave na mão.',
  cta: 'Me conta o que você procura',
  ctaSecundario: 'Como eu trabalho',
  /** Aparece com o icone de localizacao, ao lado do CRECI. */
  nota: `${perfil.regiao}`,
}

export interface Feature {
  icon: IconName
  titulo: string
  texto: string
}

export const features: Feature[] = [
  {
    icon: 'search',
    titulo: 'Eu filtro antes de te mostrar',
    texto:
      'Você não vai receber vinte links por dia. Eu vejo os imóveis primeiro e só te chamo para o que faz sentido.',
  },
  {
    icon: 'chart',
    titulo: 'Preço com pé no chão',
    texto:
      'Comparo com o que foi vendido de verdade na região antes de você fazer proposta. Ninguém paga a mais por pressa.',
  },
  {
    icon: 'shield',
    titulo: 'Documento antes do sinal',
    texto:
      'Matrícula, certidões e contrato conferidos antes de você assinar ou pagar qualquer coisa.',
  },
]

/** Faixa de bairros: onde ela atende. */
export const bairros = [
  'Ponta Negra',
  'Capim Macio',
  'Candelária',
  'Lagoa Nova',
  'Tirol',
  'Petrópolis',
  'Areia Preta',
  'Neópolis',
  'Nova Parnamirim',
  'Cotovelo',
  'Pium',
  'Extremoz',
]

/* ------------------------------------------------------------------ */
/* Cabecalhos das secoes                                               */
/* ------------------------------------------------------------------ */

export const secoes = {
  bairros: {
    rotulo: 'Onde eu atendo',
  },
  servicos: {
    rotulo: 'Serviços',
    titulo: 'No que eu entro com você.',
    texto: 'Em qualquer uma dessas frentes, quem fala com você sou eu, do começo ao fim.',
  },
  tempo: {
    rotulo: 'Por que agora',
    titulo: 'Enquanto você pensa, o preço anda.',
    texto:
      'Cada mês procurando sozinho é mês de imóvel subindo e de parcela maior no financiamento. Decidir rápido não é ter pressa: é ter informação na mão.',
  },
  processo: {
    rotulo: 'Como funciona',
    titulo: 'Do primeiro oi até a chave.',
    texto: 'Quatro etapas, sem etapa surpresa no meio do caminho.',
    cta: 'Começar pela conversa',
    nota: 'A primeira conversa não custa nada.',
  },
  sobre: {
    rotulo: 'Quem sou',
  },
  instagram: {
    rotulo: 'Instagram',
    titulo: 'O que eu ando postando.',
    texto: 'Imóvel novo, bastidor de visita e o que está acontecendo no mercado de Natal.',
    /** Aparece enquanto o feed nao estiver conectado (ver INSTAGRAM.md). */
    convite: 'Todo imóvel novo aparece primeiro por lá.',
    cta: 'Ver o perfil',
  },
  perguntas: {
    rotulo: 'Dúvidas',
    titulo: 'O que me perguntam sempre',
    texto: 'Ficou faltando alguma? Pergunta direto, eu mesma respondo.',
    cta: 'Perguntar no WhatsApp',
  },
}

/* ------------------------------------------------------------------ */
/* Servicos                                                            */
/* ------------------------------------------------------------------ */

export type Objetivo = 'Comprar' | 'Vender' | 'Alugar' | 'Investir'

export const objetivos: Objetivo[] = ['Comprar', 'Vender', 'Alugar', 'Investir']

export interface Servico {
  objetivo: Objetivo
  icon: IconName
  titulo: string
  texto: string
  itens: string[]
  cta: string
}

export const servicos: Servico[] = [
  {
    objetivo: 'Comprar',
    icon: 'key',
    titulo: 'Comprar',
    texto: 'Busco o imóvel dentro do que você pode pagar e do prazo que você tem.',
    itens: [
      'Lista curta, sem visita à toa',
      'Simulação em mais de um banco',
      'Documentação conferida antes da proposta',
    ],
    cta: 'Quero comprar',
  },
  {
    objetivo: 'Vender',
    icon: 'tag',
    titulo: 'Vender',
    texto: 'Preço realista, anúncio bem feito e comprador filtrado antes de entrar na sua casa.',
    itens: [
      'Avaliação pelo que vendeu de verdade na região',
      'Fotos e anúncio nos portais',
      'Visita só com quem tem condição de comprar',
    ],
    cta: 'Quero vender',
  },
  {
    objetivo: 'Alugar',
    icon: 'home',
    titulo: 'Alugar',
    texto: 'Locação sem susto, para quem procura e para quem anuncia.',
    itens: [
      'Análise de cadastro e garantia',
      'Contrato e vistoria por escrito',
      'Acompanho até a entrega das chaves',
    ],
    cta: 'Quero alugar',
  },
  {
    objetivo: 'Investir',
    icon: 'building',
    titulo: 'Investir',
    texto: 'Imóvel para render: na planta ou pronto, com a conta na mesa.',
    itens: [
      'Lançamento com análise da construtora',
      'Projeção de aluguel na região',
      'Comparativo entre planta e pronto',
    ],
    cta: 'Quero investir',
  },
]

/* ------------------------------------------------------------------ */
/* O custo de esperar (o relogio)                                      */
/* ------------------------------------------------------------------ */

export const tempo = {
  /** O anel tem 365 pontos: um ano inteiro, dia a dia. */
  relogio: {
    valor: 365,
    unidade: 'dias',
    rotulo: 'de espera é um ano de valorização já embutido no preço que você vai pagar',
  },
  custos: [
    {
      titulo: 'A faixa muda',
      texto: 'O imóvel que cabia no seu orçamento em janeiro pode não caber mais em dezembro.',
    },
    {
      titulo: 'A parcela acompanha',
      texto: 'Preço maior é entrada maior e financiamento mais alto, com o mesmo salário.',
    },
    {
      titulo: 'O bom sai primeiro',
      texto: 'Imóvel bem localizado e bem precificado não fica meses anunciado. Ele some.',
    },
  ],
}

/* ------------------------------------------------------------------ */
/* Processo                                                            */
/* ------------------------------------------------------------------ */

export const etapas = [
  {
    numero: '01',
    titulo: 'A gente conversa',
    texto:
      'Quinze minutos no WhatsApp ou por vídeo para eu entender o que você procura, quanto pode pagar e para quando.',
  },
  {
    numero: '02',
    titulo: 'Eu separo, você visita',
    texto: 'Mando uma lista curta com o que faz sentido e agendo as visitas no seu horário.',
  },
  {
    numero: '03',
    titulo: 'Proposta e papelada',
    texto:
      'Negocio com base em preço de mercado e confiro a documentação antes de qualquer pagamento.',
  },
  {
    numero: '04',
    titulo: 'Chave na mão',
    texto: 'Acompanho assinatura, financiamento e vistoria até o dia da mudança.',
  },
]

/* ------------------------------------------------------------------ */
/* Quem sou                                                            */
/* ------------------------------------------------------------------ */

export const sobre = {
  citacao: 'Imóvel não é vitrine. É onde você vai acordar todo dia.',
  paragrafos: [
    `Sou Alexandra Alencastro, corretora de imóveis em ${perfil.cidade}, inscrita no ${perfil.creci}. Atendo compra, venda e locação em ${perfil.regiao}.`,
    'Trabalho com poucos clientes por vez porque gosto de conhecer quem está do outro lado: a rotina, o orçamento, o bairro onde faz sentido morar. É isso que encurta a busca.',
    'Você fala comigo direto no WhatsApp e recebe o que eu prometi: resposta, informação clara e tudo combinado por escrito.',
  ],
  credenciais: [
    { rotulo: 'Registro', valor: perfil.creci },
    { rotulo: 'Onde atuo', valor: perfil.regiao },
    { rotulo: 'Atendo', valor: 'Moradia, praia e investimento' },
    { rotulo: 'Instagram', valor: perfil.instagramUsuario },
  ],
}

/* ------------------------------------------------------------------ */
/* Duvidas                                                             */
/* ------------------------------------------------------------------ */

export const perguntas = [
  {
    pergunta: 'Quem paga a corretagem?',
    resposta:
      'Na compra, normalmente quem vende. Na venda, a comissão segue a tabela do CRECI-RN e a gente combina por escrito antes de anunciar. Você só paga se o negócio fechar.',
  },
  {
    pergunta: 'Você atende só em Natal?',
    resposta:
      'Natal e região metropolitana: Parnamirim, Nova Parnamirim, Pium, Cotovelo e Extremoz. Se o imóvel estiver fora disso, eu te falo na hora em vez de enrolar.',
  },
  {
    pergunta: 'Dá para comprar financiado?',
    resposta:
      'Dá. Faço a simulação em mais de um banco, organizo a documentação e acompanho a análise de crédito até a assinatura.',
  },
  {
    pergunta: 'Como sei se o imóvel está regular?',
    resposta:
      'Antes de qualquer sinal eu puxo matrícula atualizada, certidões do vendedor e débitos de IPTU e condomínio. Se tiver problema, você fica sabendo antes de assinar.',
  },
  {
    pergunta: 'Trabalha com imóvel na planta?',
    resposta:
      'Sim. Vejo a construtora, o histórico de entrega e o fluxo de pagamento, e comparo com imóvel pronto na mesma faixa de preço.',
  },
  {
    pergunta: 'Quanto tempo demora para me responder?',
    resposta: `Em horário comercial, ${perfil.tempoResposta}. Fora disso, no começo do dia seguinte.`,
  },
]

/* ------------------------------------------------------------------ */
/* Falar comigo                                                        */
/* ------------------------------------------------------------------ */

export const contato = {
  rotulo: 'Falar comigo',
  titulo: 'Me conta o que você procura.',
  texto:
    'Você preenche em menos de um minuto e o WhatsApp abre com a mensagem pronta. Quem responde sou eu.',
  beneficios: [
    'Você fala comigo, não com um robô',
    'A primeira conversa não custa nada',
    'Atendimento em Natal e região metropolitana',
  ],
  enviar: 'Enviar no WhatsApp',
  nota: 'Seus dados vão direto para o meu WhatsApp. Não entram em lista de disparo.',
}

export const tiposImovel = [
  'Apartamento',
  'Casa',
  'Casa em condomínio',
  'Flat ou apart-hotel',
  'Terreno',
  'Sala ou loja',
]

const faixasVenda = [
  'Até R$ 250 mil',
  'R$ 250 a 400 mil',
  'R$ 400 a 700 mil',
  'R$ 700 mil a 1 milhão',
  'Acima de R$ 1 milhão',
  'Ainda não sei',
]

/**
 * Rotulos e faixas que mudam conforme o objetivo -- "faixa de valor" nao
 * quer dizer a mesma coisa para quem compra e para quem aluga.
 */
export const detalhesPorObjetivo: Record<
  Objetivo,
  { faixaRotulo: string; faixas: string[]; regiaoRotulo: string; regiaoPlaceholder: string }
> = {
  Comprar: {
    faixaRotulo: 'Quanto pode investir',
    faixas: faixasVenda,
    regiaoRotulo: 'Bairros de interesse',
    regiaoPlaceholder: 'Ponta Negra, Capim Macio, Nova Parnamirim...',
  },
  Vender: {
    faixaRotulo: 'Valor que você espera',
    faixas: faixasVenda,
    regiaoRotulo: 'Onde fica o imóvel',
    regiaoPlaceholder: 'Bairro e cidade',
  },
  Alugar: {
    faixaRotulo: 'Aluguel mensal',
    faixas: [
      'Até R$ 1.500',
      'R$ 1.500 a 2.500',
      'R$ 2.500 a 4.000',
      'Acima de R$ 4.000',
      'Ainda não sei',
    ],
    regiaoRotulo: 'Bairros de interesse',
    regiaoPlaceholder: 'Ponta Negra, Tirol, Lagoa Nova...',
  },
  Investir: {
    faixaRotulo: 'Quanto pretende investir',
    faixas: faixasVenda,
    regiaoRotulo: 'Região de interesse',
    regiaoPlaceholder: 'Praia, centro ou "aberto a sugestões"',
  },
}

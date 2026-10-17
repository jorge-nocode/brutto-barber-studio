// Configuração do site. Ao adaptar este modelo para outro cliente, troque os valores aqui
// (e os dados de negócio em lib/data.ts: endereço, preços, horários, Instagram).

export const SITE = {
  // Nome da empresa exibido no site e nas páginas legais.
  companyName: "BRUTTO Barber Studio",

  // WhatsApp: só dígitos, DDI+DDD+número. A mensagem é a primeira que o visitante envia pelo botão flutuante.
  whatsapp: {
    number: "5511998703836",
    display: "(11) 99870-3836",
    floatingMessage: "Olá! Conheci o site e gostaria de solicitar um orçamento.",
    floatingLabel: "Falar no WhatsApp",
  },

  // Dados legais. Deixe null o que ainda não foi confirmado: as páginas legais mostram o campo como
  // "A CONFIRMAR" e nada é inventado. Preencher antes de publicar.
  legal: {
    legalName: null as string | null, // razão social
    cnpj: null as string | null, // 00.000.000/0000-00
    address: null as string | null, // endereço do responsável legal (pode diferir do endereço da loja)
    controllerContact: null as string | null, // responsável / canal para pedidos de titulares (e-mail)
    forum: null as string | null, // cidade/UF do foro, ex.: "São Paulo/SP"
    hostingProvider: null as string | null, // quem hospeda o site (registra IP/acessos)
    retentionPeriod: null as string | null, // por quanto tempo as conversas de WhatsApp são guardadas
    // Só trocar para true depois que um advogado revisar os dois textos. Enquanto for false,
    // as páginas legais exibem o aviso de "texto-base para revisão" e a base legal sai marcada como pendente.
    reviewed: false,
    lastUpdated: "15 de outubro de 2026", // revisar a cada alteração dos textos
  },

  // Consentimento. O site não usa tecnologias opcionais (cookies, analytics, pixels, storage), então não há banner.
  // Se um futuro cliente precisar de uma delas, liste aqui: a Política de Privacidade passa a citá-la e
  // é o sinal de que é preciso implementar o aviso de consentimento ANTES de carregar o script.
  consent: {
    optionalTechnologies: [] as string[], // ex.: ["Google Analytics", "Meta Pixel"]
  },
} as const;

export const whatsappLink = (text: string) =>
  `https://wa.me/${SITE.whatsapp.number}?text=${encodeURIComponent(text)}`;

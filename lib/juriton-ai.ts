"use client"

export interface Conversation {
  id: string
  userId: string
  messages: ChatMessage[]
  context: string[]
  createdAt: string
  updatedAt: string
}

export interface ChatMessage {
  id: string
  content: string
  sender: "user" | "juriton"
  timestamp: Date
  attachments?: { name: string; type: string; url: string }[]
  documentGenerated?: GeneratedDocument
}

export interface GeneratedDocument {
  type: "minuta" | "peticao" | "contestacao" | "replica"
  content: string
  title: string
}

export const juritonService = {
  // Gerar resposta inteligente
  generateResponse: async (userMessage: string, conversationContext: string[]): Promise<string> => {
    // Simula processamento de IA
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const lowerMessage = userMessage.toLowerCase()

    // Detecção de intenções
    if (lowerMessage.includes("minuta") || lowerMessage.includes("contrato")) {
      return juritonService.generateMinuta(userMessage)
    }

    if (lowerMessage.includes("jurisprudência") || lowerMessage.includes("jurisprudencia")) {
      return juritonService.searchJurisprudence(userMessage)
    }

    if (lowerMessage.includes("petição") || lowerMessage.includes("peticao")) {
      return juritonService.generatePetition(userMessage)
    }

    if (lowerMessage.includes("contestação") || lowerMessage.includes("contestacao")) {
      return juritonService.generateContestation(userMessage)
    }

    if (lowerMessage.includes("lei") || lowerMessage.includes("artigo") || lowerMessage.includes("código")) {
      return juritonService.explainLaw(userMessage)
    }

    // Resposta geral com contexto
    return `Entendi sua questão. Com base no contexto da nossa conversa e nas leis brasileiras vigentes, posso te auxiliar da seguinte forma:\n\n${juritonService.getGeneralResponse(userMessage, conversationContext)}`
  },

  generateMinuta: (request: string): string => {
    return `Vou criar uma minuta profissional para você. Aqui está o documento:\n\n---\n\nMINUTA DE CONTRATO\n\nPelo presente instrumento particular, as partes:\n\nCONTRATANTE: [Nome completo], [nacionalidade], [estado civil], [profissão], portador da Cédula de Identidade RG nº [número] e inscrito no CPF sob nº [número], residente e domiciliado na [endereço completo];\n\nCONTRATADA: [Nome completo], [nacionalidade], [estado civil], [profissão], portador da Cédula de Identidade RG nº [número] e inscrito no CPF sob nº [número], residente e domiciliado na [endereço completo];\n\nTêm entre si justo e contratado o seguinte:\n\nCLÁUSULA PRIMEIRA - DO OBJETO\nO presente contrato tem por objeto [descrever o objeto do contrato de forma clara e específica].\n\nCLÁUSULA SEGUNDA - DO PRAZO\nO prazo de vigência do presente contrato é de [número] ([número por extenso]) meses/anos, iniciando-se em [data] e encerrando-se em [data].\n\nCLÁUSULA TERCEIRA - DO VALOR E FORMA DE PAGAMENTO\nPelo objeto do presente contrato, o CONTRATANTE pagará à CONTRATADA o valor total de R$ [valor] ([valor por extenso]), que será pago da seguinte forma: [descrever forma de pagamento].\n\nCLÁUSULA QUARTA - DAS OBRIGAÇÕES DO CONTRATANTE\nSão obrigações do CONTRATANTE:\na) [obrigação 1];\nb) [obrigação 2];\nc) [obrigação 3].\n\nCLÁUSULA QUINTA - DAS OBRIGAÇÕES DA CONTRATADA\nSão obrigações da CONTRATADA:\na) [obrigação 1];\nb) [obrigação 2];\nc) [obrigação 3].\n\nCLÁUSULA SEXTA - DA RESCISÃO\nO presente contrato poderá ser rescindido por qualquer das partes, mediante notificação prévia de [número] dias, sem qualquer ônus ou penalidade.\n\nCLÁUSULA SÉTIMA - DO FORO\nAs partes elegem o foro da comarca de [cidade/estado] para dirimir quaisquer dúvidas ou questões oriundas do presente contrato, renunciando a qualquer outro, por mais privilegiado que seja.\n\nE, por estarem assim justos e contratados, firmam o presente instrumento em 2 (duas) vias de igual teor e forma, na presença de duas testemunhas.\n\n[Local], [data].\n\n_______________________________\nCONTRATANTE\n\n_______________________________\nCONTRATADA\n\nTESTEMUNHAS:\n\n_______________________________\nNome: [nome completo]\nCPF: [número]\n\n_______________________________\nNome: [nome completo]\nCPF: [número]\n\n---\n\nEsta é uma minuta básica que pode ser personalizada de acordo com suas necessidades específicas. Recomendo que você preencha os campos indicados e, se necessário, adicione cláusulas específicas para seu caso. Gostaria de alguma modificação ou adição?`
  },

  searchJurisprudence: (query: string): string => {
    return `Realizei uma busca nas bases de jurisprudência e encontrei precedentes relevantes:\n\n📚 JURISPRUDÊNCIAS ENCONTRADAS:\n\n1️⃣ STJ - RECURSO ESPECIAL Nº 1.234.567\n"O direito em questão deve ser interpretado de forma ampla, garantindo a plena proteção ao consumidor conforme estabelece o CDC."\nRelator: Min. [Nome do Ministro]\nData: 15/03/2023\n\n2️⃣ STF - AGRAVO EM RECURSO EXTRAORDINÁRIO Nº 987.654\n"A aplicação do princípio da dignidade da pessoa humana deve prevalecer em casos de conflito de normas."\nRelator: Min. [Nome do Ministro]\nData: 22/01/2023\n\n3️⃣ TJ-SP - APELAÇÃO CÍVEL Nº 2022.0000000-0\n"Resta configurada a responsabilidade civil quando demonstrados os requisitos legais: ato ilícito, dano e nexo causal."\nRelator: Des. [Nome do Desembargador]\nData: 10/11/2022\n\n💡 ANÁLISE:\nCom base nesses precedentes, observa-se que os tribunais superiores têm firmado entendimento no sentido de [análise contextual]. Isso significa que, no seu caso, a tendência é que [conclusão baseada nas jurisprudências].\n\nDeseja que eu analise alguma jurisprudência específica ou busque mais precedentes sobre outro tema?`
  },

  generatePetition: (request: string): string => {
    return `Vou elaborar uma petição inicial estruturada conforme as normas processuais:\n\n---\n\nEXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(A) DE DIREITO DA [NÚMERO]ª VARA [TIPO] DA COMARCA DE [CIDADE/ESTADO]\n\n[NOME COMPLETO DO AUTOR], [nacionalidade], [estado civil], [profissão], inscrito no CPF sob o nº [número], portador da Cédula de Identidade RG nº [número], residente e domiciliado na [endereço completo], por seu advogado que esta subscreve (procuração anexa), vem, respeitosamente, perante Vossa Excelência, propor a presente\n\nAÇÃO [TIPO DE AÇÃO]\n\nem face de [NOME COMPLETO DO RÉU], [qualificação completa], pelos fatos e fundamentos jurídicos a seguir aduzidos:\n\nI - DOS FATOS\n\n1. O(A) Autor(a) [narrar os fatos relevantes de forma cronológica e objetiva].\n\n2. [Continuar a narrativa dos fatos].\n\n3. [Desenvolver o contexto fático].\n\nII - DO DIREITO\n\n4. A presente demanda encontra amparo legal nos seguintes dispositivos:\n\na) Código Civil, artigo [número]: [transcrever ou citar];\nb) [Outras normas aplicáveis];\nc) Constituição Federal, artigo [número].\n\n5. [Fundamentação jurídica detalhada].\n\n6. [Desenvolvimento da tese jurídica].\n\nIII - DO PEDIDO\n\nDiante do exposto, requer-se:\n\na) A citação do(a) Réu(Ré) para, querendo, apresentar contestação, sob pena de revelia;\n\nb) A procedência do pedido para [descrever o pedido principal];\n\nc) A condenação do(a) Réu(Ré) ao pagamento das custas processuais e honorários advocatícios;\n\nd) A produção de todos os meios de prova em direito admitidos, especialmente [especificar provas].\n\nAtribui-se à causa o valor de R$ [valor] ([valor por extenso]).\n\nTermos em que,\nPede deferimento.\n\n[Local], [data].\n\n_______________________________\n[Nome do Advogado]\nOAB/[UF] nº [número]\n\n---\n\nEsta é uma estrutura básica de petição inicial. Para personalizar completamente, preciso de mais detalhes sobre seu caso específico. Posso ajudar com alguma seção em particular?`
  },

  generateContestation: (request: string): string => {
    return `Elaborei uma contestação estruturada para sua defesa:\n\n---\n\nEXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(A) DE DIREITO DA [NÚMERO]ª VARA [TIPO] DA COMARCA DE [CIDADE/ESTADO]\n\nProcesso nº [número do processo]\n\n[NOME COMPLETO DO RÉU], já qualificado nos autos da ação que lhe move [NOME DO AUTOR], vem, por seu advogado que esta subscreve, tempestivamente, apresentar\n\nCONTESTAÇÃO\n\nconforme razões de fato e de direito a seguir expostas:\n\nI - PRELIMINARES\n\n1. DA ILEGITIMIDADE PASSIVA (se aplicável)\n[Argumentação sobre ilegitimidade, se houver fundamento].\n\n2. DA INCOMPETÊNCIA DO JUÍZO (se aplicável)\n[Argumentação sobre incompetência, se houver fundamento].\n\nII - DO MÉRITO\n\n3. [Contestar os fatos alegados pelo autor, apresentando a versão do réu].\n\n4. [Refutar a fundamentação jurídica apresentada].\n\n5. DOS FATOS CONSTITUTIVOS DO DIREITO DO AUTOR\nO Autor não logrou êxito em comprovar os fatos constitutivos do direito alegado, conforme determina o artigo 373, I, do CPC.\n\n6. [Apresentar a tese de defesa com fundamentos jurídicos].\n\nIII - DO DIREITO APLICÁVEL\n\n7. A presente contestação encontra amparo nos seguintes dispositivos legais:\n\na) Código de Processo Civil, artigo [número];\nb) [Outras normas aplicáveis];\nc) Código Civil, artigo [número].\n\nIV - DOS PEDIDOS\n\nDiante do exposto, requer-se:\n\na) O acolhimento das preliminares arguidas, com a consequente extinção do processo sem resolução do mérito;\n\nb) Subsidiariamente, a improcedência total dos pedidos formulados pelo Autor;\n\nc) A condenação do Autor ao pagamento das custas processuais e honorários advocatícios;\n\nd) A produção de todos os meios de prova em direito admitidos, especialmente [especificar provas].\n\nTermos em que,\nPede e aguarda deferimento.\n\n[Local], [data].\n\n_______________________________\n[Nome do Advogado]\nOAB/[UF] nº [número]\n\n---\n\nEsta contestação segue a estrutura processual adequada. Para torná-la mais específica ao seu caso, seria importante analisar a petição inicial e os documentos do processo. Posso ajustar alguma parte?`
  },

  explainLaw: (query: string): string => {
    return `Vou explicar o dispositivo legal que você mencionou:\n\n📖 EXPLICAÇÃO DA LEI\n\nO artigo em questão estabelece normas fundamentais que regulam [tema específico]. Vou detalhar:\n\n🔍 TEXTO DA LEI:\n"[Transcrição do artigo legal relevante]"\n\n💡 INTERPRETAÇÃO:\nEste dispositivo significa que [explicação em linguagem simples]. Na prática, isso se aplica quando [exemplos práticos].\n\n⚖️ JURISPRUDÊNCIA:\nOs tribunais têm interpretado este artigo no sentido de [análise jurisprudencial].\n\n📌 APLICAÇÃO PRÁTICA:\n- Situação 1: [exemplo prático]\n- Situação 2: [exemplo prático]\n- Situação 3: [exemplo prático]\n\n⚠️ PONTOS DE ATENÇÃO:\n• [Ponto importante 1]\n• [Ponto importante 2]\n• [Ponto importante 3]\n\nTem alguma dúvida específica sobre a aplicação desta lei? Posso dar mais exemplos práticos se quiser!`
  },

  getGeneralResponse: (message: string, context: string[]): string => {
    const responses = [
      "Com base nas informações fornecidas e considerando o ordenamento jurídico brasileiro, sugiro que você analise com atenção os seguintes aspectos legais relevantes para sua situação.",
      "Analisando juridicamente sua questão, é importante considerar tanto os aspectos processuais quanto os direitos materiais envolvidos.",
      "Do ponto de vista legal, sua situação envolve questões importantes que merecem atenção cuid adosa. Vou te orientar sobre os principais pontos.",
    ]

    return (
      responses[Math.floor(Math.random() * responses.length)] +
      "\n\nSe precisar de documentos específicos como minutas, petições ou análise de jurisprudências, é só me pedir!"
    )
  },

  // Salvar conversa
  saveConversation: (userId: string, messages: ChatMessage[]) => {
    const conversation: Conversation = {
      id: "conv_" + Date.now(),
      userId,
      messages,
      context: messages.map((m) => m.content),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const conversations = juritonService.getConversations(userId)
    conversations.push(conversation)
    localStorage.setItem(`lexgo_juriton_conversations_${userId}`, JSON.stringify(conversations))
  },

  getConversations: (userId: string): Conversation[] => {
    if (typeof window === "undefined") return []
    const conversationsStr = localStorage.getItem(`lexgo_juriton_conversations_${userId}`)
    return conversationsStr ? JSON.parse(conversationsStr) : []
  },
}

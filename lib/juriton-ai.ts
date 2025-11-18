"use client"

import { getLLMResponse, type LLMBackendConfig } from "./llm-backends"
import { brazilianLegalKB, extractLegalTopics } from "./legal-knowledge-base"
import { juritonTools } from "./juriton-tools"
import { analyzePerformance, type ResponseMetrics } from "./juriton-analysis/performance-metrics"
import { executeToolCall } from "@/lib/juriton-agents/tool-executor"
import { LEGAL_TOOLS } from "@/lib/juriton-tools/legal-tools"
import { getProvider } from "@/lib/juriton-config/providers"
import { legalTokenizer } from "./juriton-tokenizer/legal-tokenizer"
import { legalEvaluator } from "./juriton-eval/legal-evaluator"
import { harmonyEncoder } from "./juriton-streaming/harmony-encoder"
import { legalAnswerExtractor } from "./juriton-eval/legal-answer-extractor"

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

// Juriton configuration with modular backend support
const juritonConfig: LLMBackendConfig = {
  name: "Juriton",
  type: "groq", // Can switch to vllm or ollama
  modelName: "gpt-oss-120b", // or local model
  maxTokens: 2048,
}

let performanceMetrics: ResponseMetrics[] = []

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
      "Do ponto de vista legal, sua situação envolve questões importantes que merecem atenção cuidadosa. Vou te orientar sobre os principais pontos.",
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

  async generateResponseWithTools(userMessage: string, conversationContext: string[], config?: any) {
    const startTime = Date.now()
    const topics = extractLegalTopics(userMessage)
    
    // Criar métrica de resposta
    const metric: ResponseMetrics = {
      queryId: Date.now().toString(),
      query: userMessage,
      responseQuality: 0,
      toolCalls: [],
      tokensUsed: 0,
      executionTime: 0,
      timestamp: new Date(),
      backend: config?.type || 'local',
    }

    try {
      const response = await this.generateResponse(userMessage, conversationContext)
      metric.responseQuality = 85
      metric.tokensUsed = response.split(" ").length * 1.3
      metric.executionTime = Date.now() - startTime
      
      performanceMetrics.push(metric)
      return response
    } catch (error) {
      metric.responseQuality = 0
      metric.executionTime = Date.now() - startTime
      performanceMetrics.push(metric)
      throw error
    }
  },

  getPerformanceAnalysis() {
    return analyzePerformance(performanceMetrics)
  },
}

export const enhancedJuritonService = {
  // Enhanced response generation with LLM integration
  async generateResponseWithLLM(
    userMessage: string,
    conversationContext: string[],
    useRealLLM: boolean = false
  ): Promise<string> {
    const lowerMessage = userMessage.toLowerCase()
    
    // Extract legal topics for context
    const topics = extractLegalTopics(userMessage)
    const relatedConcepts = topics
      .flatMap((topic) => brazilianLegalKB.getRelatedConcepts(topic))
      .slice(0, 3)

    // System prompt com especialização jurídica
    const systemPrompt = `Você é o Juriton, uma IA especializada em Direito Brasileiro.
Características:
- Conhecimento profundo de legislação brasileira (CC, CLT, CF, CPC, etc.)
- Especialista em geração de documentos jurídicos (minutas, petições, contestações)
- Capacidade de buscar e analisar jurisprudência
- Sempre cita artigos de lei e jurisprudências quando relevante
- Linguagem profissional mas acessível
- Oferece orientações práticas

Tópicos relevantes para esta conversa: ${relatedConcepts.map((c) => c.title).join(", ")}

Responda em português brasileiro.`

    if (useRealLLM) {
      try {
        // Use real LLM backend
        const response = await getLLMResponse(userMessage, juritonConfig)
        return response.content
      } catch (error) {
        console.error("[v0] LLM backend error, falling back to local processing:", error)
      }
    }

    // Fallback to local intelligent processing
    return juritonService.generateResponse(userMessage, conversationContext)
  },

  // Semantic search in jurisprudence
  async searchJurisprudenceSemantic(query: string): Promise<any[]> {
    const keywords = query.toLowerCase().split(" ").filter((w) => w.length > 3)
    return brazilianLegalKB.searchJurisprudence(keywords)
  },

  // Generate documents with context awareness
  async generateDocumentWithContext(
    type: "minuta" | "peticao" | "contestacao" | "replica",
    context: string
  ): Promise<string> {
    const documentTemplates = {
      minuta: () => juritonService.generateMinuta(context),
      peticao: () => juritonService.generatePetition(context),
      contestacao: () => juritonService.generateContestation(context),
      replica: () =>
        `TRÉPLICA\n\n${context}\n\n...documento gerado com contexto jurídico...`,
    }

    return documentTemplates[type]()
  },
}

export const juritonServiceWithAgents = {
  // Processar requisição com agentes e ferramentas
  async processWithAgents(
    userMessage: string,
    conversationContext: string[],
    providerName: string = "groq"
  ): Promise<{ response: string; toolsUsed: string[] }> {
    const provider = getProvider(providerName)
    if (!provider?.apiKey) {
      console.log(`[v0] Provider ${providerName} não configurado, usando processamento local`)
      const response = await juritonService.generateResponse(userMessage, conversationContext)
      return { response, toolsUsed: [] }
    }

    // Detectar qual ferramenta é mais apropriada
    const toolsToUse = detectRelevantTools(userMessage)
    const toolsUsed: string[] = []

    let response = ""

    // Executar ferramentas detectadas
    for (const toolName of toolsToUse) {
      try {
        const parameters = extractToolParameters(userMessage, toolName)
        const result = await executeToolCall(toolName, parameters)

        if (!result.error) {
          toolsUsed.push(toolName)
          response += formatToolResult(result)
        }
      } catch (error) {
        console.error(`[v0] Erro executando ${toolName}:`, error)
      }
    }

    // Se nenhuma ferramenta foi usada, gerar resposta padrão
    if (toolsUsed.length === 0) {
      response = await juritonService.generateResponse(userMessage, conversationContext)
    }

    return { response, toolsUsed }
  },

  // Processar com streaming (para futura integração com agentes)
  async processWithStreaming(
    userMessage: string,
    onChunk: (chunk: string) => void,
    providerName: string = "groq"
  ): Promise<void> {
    const provider = getProvider(providerName)
    
    if (!provider?.apiKey) {
      const response = await juritonService.generateResponse(userMessage, [])
      onChunk(response)
      return
    }

    // Implementação de streaming será feita quando APIs estiverem integradas
    const response = await juritonService.generateResponse(userMessage, [])
    onChunk(response)
  }
}

function detectRelevantTools(message: string): string[] {
  const lowerMessage = message.toLowerCase()
  const tools: string[] = []

  if (lowerMessage.includes("minuta") || lowerMessage.includes("contrato") || lowerMessage.includes("documento")) {
    tools.push("generate_legal_document")
  }

  if (lowerMessage.includes("jurisprudência") || lowerMessage.includes("jurisprudencia") || lowerMessage.includes("precedente")) {
    tools.push("search_jurisprudence")
  }

  if (lowerMessage.includes("analisar") || lowerMessage.includes("análise") || lowerMessage.includes("parecer")) {
    tools.push("analyze_legal_case")
  }

  if (lowerMessage.includes("converter") || lowerMessage.includes("pdf") || lowerMessage.includes("word")) {
    tools.push("convert_document_format")
  }

  if (lowerMessage.includes("extrair") || lowerMessage.includes("entidade") || lowerMessage.includes("lei")) {
    tools.push("extract_legal_entities")
  }

  return tools.length > 0 ? tools : []
}

function extractToolParameters(message: string, toolName: string): any {
  const params: any = {}

  switch (toolName) {
    case "generate_legal_document":
      params.document_type = message.includes("minuta") ? "minuta" : 
                            message.includes("petição") ? "peticao" :
                            message.includes("contestação") ? "contestacao" : "minuta"
      params.subject = message.substring(0, 100)
      params.context = message
      break

    case "search_jurisprudence":
      const keywords = message.split(/\s+/).filter(w => w.length > 3).slice(0, 5)
      params.keywords = keywords
      params.court = message.includes("stf") ? "STF" : 
                    message.includes("stj") ? "STJ" : "ALL"
      break

    case "analyze_legal_case":
      params.case_facts = message
      params.question = message.split("?")[0] || message
      break

    case "convert_document_format":
      params.content = message
      params.to_format = message.includes("pdf") ? "pdf" : 
                        message.includes("word") ? "word" : "markdown"
      break

    case "extract_legal_entities":
      params.text = message
      break
  }

  return params
}

function formatToolResult(result: any): string {
  if (result.error) {
    return `Erro na ferramenta: ${result.error}`
  }

  if (result.toolName === "generate_legal_document") {
    return `📄 Documento gerado:\n\n${result.result.content}`
  }

  if (result.toolName === "search_jurisprudence") {
    return `📚 Jurisprudências encontradas:\n\n${JSON.stringify(result.result.results, null, 2)}`
  }

  if (result.toolName === "analyze_legal_case") {
    return `⚖️ Análise jurídica:\n\n${result.result.analysis}\n\nConclusão: ${result.result.conclusion}`
  }

  if (result.toolName === "convert_document_format") {
    return `✅ Documento convertido para ${result.result.to_format}`
  }

  if (result.toolName === "extract_legal_entities") {
    return `🏷️ Entidades extraídas:\n\n${result.result.entities.map((e: any) => `${e.type}: ${e.value}`).join("\n")}`
  }

  return JSON.stringify(result.result)
}

export const advancedJuritonService = {
  // Processar com tokenização jurídica
  async generateResponseWithTokenization(
    userMessage: string,
    conversationContext: string[]
  ): Promise<{ response: string; tokenCount: number; legalTermsIdentified: string[] }> {
    const tokenized = legalTokenizer.tokenizeWithMetadata(userMessage)
    const legalTerms = tokenized
      .filter(t => t.type !== "text")
      .map(t => t.value)
      .filter((v, i, a) => a.indexOf(v) === i)

    const response = await juritonService.generateResponse(userMessage, conversationContext)
    const tokenCount = legalTokenizer.countTokens(response)

    return {
      response,
      tokenCount,
      legalTermsIdentified: legalTerms,
    }
  },

  // Avaliar resposta jurídica
  async evaluateLegalResponse(
    question: string,
    response: string,
    correctAnswer?: string
  ): Promise<any> {
    const extracted = legalAnswerExtractor.extractAnswer(response)
    
    const evaluation = {
      answersFound: [extracted],
      allPossibleAnswers: legalAnswerExtractor.extractMultipleAnswers(response),
      confidence: extracted?.confidence || 0,
      pattern: extracted?.pattern,
    }

    if (correctAnswer) {
      const detailed = legalEvaluator.evaluateResponse(
        question,
        response,
        correctAnswer
      )
      return { ...evaluation, detailed }
    }

    return evaluation
  },

  // Processar com estrutura Harmony
  async processWithHarmonyStructure(
    userMessage: string,
    conversationContext: string[]
  ): Promise<any> {
    const response = await juritonService.generateResponse(userMessage, conversationContext)
    
    const structure = harmonyEncoder.parseStructuredResponse(response)
    
    return structure
  },

  // Gerar relatório de avaliação
  async generateEvaluationReport(
    questions: Array<{ question: string; correctAnswer: string }>,
    responses: string[]
  ): Promise<string> {
    const evaluation = legalEvaluator.batchEvaluate(questions, responses)
    return legalEvaluator.generateReport(evaluation)
  },
}

export default advancedJuritonService

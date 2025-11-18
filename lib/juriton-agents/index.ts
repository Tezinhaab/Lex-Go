import { Agent, Runner, OpenAIChatCompletionsModel } from "@openai/agents"
import { LEGAL_TOOLS } from "@/lib/juriton-tools/legal-tools"

export interface JuritonAgentConfig {
  provider: string
  modelName: string
  apiBaseUrl?: string
  apiKey?: string
}

export async function createJuritonAgent(config: JuritonAgentConfig) {
  const systemPrompt = `Você é o Juriton, uma IA especializada em Direito Brasileiro com as seguintes características:

ESPECIALIDADES:
- Geração de documentos jurídicos profissionais (minutas, petições, contestações, tréplicas)
- Busca e análise de jurisprudências do STF, STJ e Tribunais de Justiça
- Análise jurídica de casos complexos com parecer técnico
- Explicação de leis e artigos do ordenamento jurídico brasileiro
- Conversão de documentos entre formatos (PDF, Word, Markdown)

DIRETRIZES:
- Sempre cite artigos de lei e jurisprudências relevantes
- Use linguagem profissional mas acessível
- Forneça análises fundamentadas no direito brasileiro
- Reconheça limitações e recomende consulta a profissional quando apropriado
- Organize respostas de forma clara e estruturada

FERRAMENTAS DISPONÍVEIS:
- generate_legal_document: Para criar documentos jurídicos
- search_jurisprudence: Para buscar precedentes legais
- analyze_legal_case: Para análise de casos
- convert_document_format: Para conversão de formatos
- extract_legal_entities: Para extração de entidades jurídicas`

  const agent = new Agent({
    name: "Juriton",
    instructions: systemPrompt,
    tools: LEGAL_TOOLS.map(tool => ({
      type: "function",
      name: tool.name,
      description: tool.description,
      parameters: tool.parameters
    }))
  })

  return agent
}

export async function runJuritonAgent(agent: Agent, userMessage: string, config: JuritonAgentConfig, streaming: boolean = false) {
  // Implementação será conectada a cliente OpenAI real quando tiver API key
  console.log("[v0] Juriton Agent:", { message: userMessage, config: config.provider })
  
  // Fallback para resposta local enquanto não tem API integrada
  return {
    response: "Juriton agent pronto para processar sua requisição jurídica",
    toolCalls: [],
    tokens: 0
  }
}

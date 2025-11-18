import { Tool } from "@openai/agents"

// Ferramentas jurídicas especializadas
export const LEGAL_TOOLS = [
  {
    type: "function",
    name: "generate_legal_document",
    description: "Gera documentos jurídicos profissionais (minuta, petição, contestação, tréplica)",
    parameters: {
      type: "object",
      properties: {
        document_type: {
          type: "string",
          enum: ["minuta", "peticao", "contestacao", "replica"],
          description: "Tipo de documento jurídico a gerar"
        },
        subject: {
          type: "string",
          description: "Assunto principal do documento"
        },
        context: {
          type: "string",
          description: "Contexto e detalhes específicos"
        },
        parties: {
          type: "array",
          items: { type: "string" },
          description: "Partes envolvidas"
        }
      },
      required: ["document_type", "subject", "context"],
      additionalProperties: false
    },
    output: '{"document": "...", "status": "generated", "type": "minuta"}'
  },
  {
    type: "function",
    name: "search_jurisprudence",
    description: "Busca jurisprudências relevantes em base de dados legal",
    parameters: {
      type: "object",
      properties: {
        keywords: {
          type: "array",
          items: { type: "string" },
          description: "Palavras-chave para busca"
        },
        court: {
          type: "string",
          enum: ["STF", "STJ", "TJ", "ALL"],
          description: "Tribunal para busca"
        },
        limit: {
          type: "integer",
          minimum: 1,
          maximum: 20,
          description: "Número máximo de resultados",
          default: 5
        }
      },
      required: ["keywords"],
      additionalProperties: false
    },
    output: '{"results": [{"court": "STJ", "year": 2023, "summary": "..."}], "total": 3}'
  },
  {
    type: "function",
    name: "analyze_legal_case",
    description: "Analisa um caso jurídico e fornece parecer técnico",
    parameters: {
      type: "object",
      properties: {
        case_facts: {
          type: "string",
          description: "Fatos do caso"
        },
        applicable_laws: {
          type: "array",
          items: { type: "string" },
          description: "Leis aplicáveis"
        },
        question: {
          type: "string",
          description: "Pergunta jurídica específica"
        }
      },
      required: ["case_facts", "question"],
      additionalProperties: false
    },
    output: '{"analysis": "...", "conclusion": "...", "confidence": 0.85}'
  },
  {
    type: "function",
    name: "convert_document_format",
    description: "Converte documentos entre formatos (PDF, Word, HTML, Markdown)",
    parameters: {
      type: "object",
      properties: {
        content: {
          type: "string",
          description: "Conteúdo do documento"
        },
        from_format: {
          type: "string",
          enum: ["pdf", "word", "html", "markdown", "text"],
          description: "Formato de origem"
        },
        to_format: {
          type: "string",
          enum: ["pdf", "word", "html", "markdown"],
          description: "Formato de destino"
        }
      },
      required: ["content", "to_format"],
      additionalProperties: false
    },
    output: '{"converted_content": "...", "format": "word", "status": "success"}'
  },
  {
    type: "function",
    name: "extract_legal_entities",
    description: "Extrai entidades jurídicas de um texto (leis, artigos, jurisprudências)",
    parameters: {
      type: "object",
      properties: {
        text: {
          type: "string",
          description: "Texto para análise"
        }
      },
      required: ["text"],
      additionalProperties: false
    },
    output: '{"entities": [{"type": "law", "value": "CC art. 187"}], "count": 5}'
  }
]

export function getLegalToolByName(name: string) {
  return LEGAL_TOOLS.find(tool => tool.name === name)
}

export function validateToolParameters(toolName: string, parameters: any): boolean {
  const tool = getLegalToolByName(toolName)
  if (!tool || tool.type !== "function") return false
  
  // Validation básica - pode ser expandida com ajv
  const requiredParams = (tool.parameters as any).required || []
  return requiredParams.every(param => param in parameters)
}

export interface LegalConcept {
  id: string
  title: string
  description: string
  articles: string[]
  relatedCases: string[]
  practicalExamples: string[]
  keywords: string[]
}

export interface JurisprudenceCase {
  id: string
  court: string
  title: string
  summary: string
  fullText: string
  year: number
  topics: string[]
}

export const brazilianLegalKB = {
  concepts: {
    "direito-civil": {
      id: "direito-civil",
      title: "Direito Civil",
      description: "Ramo do direito que regula as relações entre pessoas privadas",
      articles: ["CC 1", "CC 5", "CC 11", "CC 166-181", "CC 422"],
      relatedCases: ["STJ Resp 1.358.030", "STF RE 603.583"],
      practicalExamples: [
        "Contratos entre pessoas físicas",
        "Responsabilidade civil por danos",
        "Direitos de família e sucessões"
      ],
      keywords: ["contrato", "obrigações", "responsabilidade", "propriedade"]
    },
    "direito-trabalhista": {
      id: "direito-trabalhista",
      title: "Direito Trabalhista",
      description: "Direito que regula as relações de trabalho e emprego",
      articles: ["CLT 1", "CLT 4", "CLT 442", "CLT 477"],
      relatedCases: ["STF RE 596.386", "TST OJ 383"],
      practicalExamples: [
        "Contratos de trabalho",
        "Rescisão contratual",
        "Direitos do empregado"
      ],
      keywords: ["trabalho", "empregado", "rescisão", "direitos"]
    },
    "direito-constitucional": {
      id: "direito-constitucional",
      title: "Direito Constitucional",
      description: "Estuda a Constituição Federal e os direitos fundamentais",
      articles: ["CF 1", "CF 5", "CF 37", "CF 37-39"],
      relatedCases: ["STF ADI 2.682", "STF RE 595.037"],
      practicalExamples: [
        "Direitos fundamentais",
        "Separação de poderes",
        "Controle constitucional"
      ],
      keywords: ["constituição", "direitos", "princípios", "separação de poderes"]
    },
    "direito-administrativo": {
      id: "direito-administrativo",
      title: "Direito Administrativo",
      description: "Regula a atividade da administração pública",
      articles: ["CF 37", "Lei 8.666", "Lei 9.784"],
      relatedCases: ["STF MS 33.340", "STJ RMS 56.283"],
      practicalExamples: [
        "Processos administrativos",
        "Licitações públicas",
        "Serviço público"
      ],
      keywords: ["administração", "licitação", "servidor público", "processo administrativo"]
    },
    "direito-penal": {
      id: "direito-penal",
      title: "Direito Penal",
      description: "Regula crimes e penas no ordenamento jurídico",
      articles: ["CP 1", "CP 103", "CP 121-130"],
      relatedCases: ["STF HC 126.292", "STF AP 470"],
      practicalExamples: [
        "Crimes contra pessoa",
        "Crimes contra patrimônio",
        "Ações penais"
      ],
      keywords: ["crime", "pena", "culpabilidade", "tipicidade"]
    }
  },

  jurisprudenceDatabase: [
    {
      id: "stf-re-123456",
      court: "STF",
      title: "Recurso Extraordinário 123456",
      summary: "Sobre interpretação da dignidade da pessoa humana",
      fullText: "O princípio da dignidade da pessoa humana deve ser interpretado como fundamento de todo o ordenamento jurídico brasileiro, conforme estabelece a CF/88 em seu artigo 1º, inciso III.",
      year: 2023,
      topics: ["dignidade", "direitos fundamentais", "interpretação constitucional"]
    },
    {
      id: "stj-resp-654321",
      court: "STJ",
      title: "Recurso Especial 654321",
      summary: "Responsabilidade civil dos prestadores de serviço",
      fullText: "Configurada a responsabilidade civil quando presentes os três elementos: ato ilícito, dano e nexo causal, conforme jurisprudência consolidada desta Corte.",
      year: 2023,
      topics: ["responsabilidade civil", "prestadores", "dano"]
    },
    {
      id: "stf-adi-2682",
      court: "STF",
      title: "Ação Direta de Inconstitucionalidade 2.682",
      summary: "Sobre a constitucionalidade de benefícios previdenciários",
      fullText: "A Lei de Benefícios da Previdência Social é constitucional em seus aspectos questionados, respeitando os princípios do direito social.",
      year: 2022,
      topics: ["previdência", "constitucionalidade", "benefícios"]
    },
    {
      id: "stj-resp-1358030",
      court: "STJ",
      title: "Recurso Especial 1.358.030",
      summary: "Sobre obrigação de reparação de dano moral",
      fullText: "A reparação do dano moral deve ser proporcional à conduta do agente e ao sofrimento do lesado.",
      year: 2021,
      topics: ["dano moral", "reparação", "proporcionabilidade"]
    }
  ] as JurisprudenceCase[],

  searchJurisprudence: (keywords: string[]): JurisprudenceCase[] => {
    return this.jurisprudenceDatabase.filter((case_) =>
      keywords.some((keyword) => {
        const lowerKeyword = keyword.toLowerCase()
        return (
          case_.title.toLowerCase().includes(lowerKeyword) ||
          case_.summary.toLowerCase().includes(lowerKeyword) ||
          case_.topics.some((t) => t.toLowerCase().includes(lowerKeyword))
        )
      })
    )
  },

  getRelatedConcepts: (conceptId: string): LegalConcept[] => {
    const concept = this.concepts[conceptId as keyof typeof this.concepts]
    if (!concept) return []
    return Object.values(this.concepts).slice(0, 3) as LegalConcept[]
  },

  getLawExplanation: (reference: string): string => {
    // Explica artigos legais
    const explanations: Record<string, string> = {
      "cc-1": "O Código Civil é a lei que regula as relações privadas no Brasil.",
      "cf-5": "Todos são iguais perante a lei, sem distinção de qualquer natureza.",
      "cf-37": "A administração pública direta e indireta obedecerá aos princípios de legalidade.",
      "clt-442": "Contrato individual de trabalho é todo acordo, tácito ou expresso, correspondente à relação de emprego.",
    }
    return explanations[reference.toLowerCase()] || "Explicação não encontrada para este artigo."
  }
}

export function extractLegalTopics(text: string): string[] {
  const topics: string[] = []
  const lowerText = text.toLowerCase()

  if (lowerText.includes("contrato") || lowerText.includes("minuta") || lowerText.includes("obrigação")) {
    topics.push("direito-civil")
  }
  if (lowerText.includes("trabalho") || lowerText.includes("empregado") || lowerText.includes("rescisão")) {
    topics.push("direito-trabalhista")
  }
  if (lowerText.includes("constitucional") || lowerText.includes("direito") || lowerText.includes("constituição")) {
    topics.push("direito-constitucional")
  }
  if (lowerText.includes("administração") || lowerText.includes("licitação") || lowerText.includes("público")) {
    topics.push("direito-administrativo")
  }
  if (lowerText.includes("crime") || lowerText.includes("penal") || lowerText.includes("acusado")) {
    topics.push("direito-penal")
  }

  return topics.length > 0 ? topics : ["direito-civil"]
}

export const legalKnowledgeBase = {
  ...brazilianLegalKB,
  searchJurisprudence: (topic: string, court: string = "STF", limit: number = 5) => {
    return brazilianLegalKB.searchJurisprudence([topic]).slice(0, limit)
  },
  generateDocument: (type: string, data: Record<string, any>) => {
    return `# ${type.toUpperCase()}\n\n${JSON.stringify(data, null, 2)}`
  },
  explainLaw: (reference: string, simplify: boolean = false) => {
    return brazilianLegalKB.getLawExplanation(reference)
  },
  analyzeCase: (description: string, area: string) => {
    const topics = extractLegalTopics(description)
    return {
      area,
      relevantTopics: topics,
      relatedCases: brazilianLegalKB.searchJurisprudence([area]).slice(0, 3),
      recommendation: `Caso potencialmente relacionado a ${area}. Recomenda-se análise detalhada.`
    }
  }
}

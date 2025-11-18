import { z } from "zod";
import { JuritonToolExecutor } from "@/lib/juriton-streaming/tool-executor";
import { legalKnowledgeBase } from "@/lib/legal-knowledge-base";

const executor = new JuritonToolExecutor();

executor.register({
  name: "search_jurisprudence",
  description: "Busca jurisprudências do STF, STJ e outros tribunais baseado em temas jurídicos",
  parameters: z.object({
    topic: z.string().describe("Tema jurídico a ser pesquisado"),
    court: z.enum(["STF", "STJ", "OAB"]).optional().describe("Tribunal para busca"),
    limit: z.number().optional().describe("Número máximo de resultados"),
  }),
  execute: async ({ topic, court = "STF", limit = 5 }) => {
    const results = legalKnowledgeBase.searchJurisprudence(topic, court, limit);
    return JSON.stringify(results, null, 2);
  },
});

executor.register({
  name: "generate_document",
  description: "Gera documentos jurídicos como minutas, petições e contestações",
  parameters: z.object({
    documentType: z.enum(["minuta", "petição", "contestação", "tréplica"]).describe("Tipo de documento"),
    caseData: z.record(z.string()).optional().describe("Dados do caso em formato chave-valor"),
  }),
  execute: async ({ documentType, caseData = {} }) => {
    const document = legalKnowledgeBase.generateDocument(documentType, caseData);
    return document;
  },
});

executor.register({
  name: "explain_law",
  description: "Explica artigos de lei e conceitos jurídicos de forma clara e acessível",
  parameters: z.object({
    lawReference: z.string().describe("Referência da lei (ex: 'CC 1.234')"),
    simplify: z.boolean().optional().describe("Simplificar para linguagem comum"),
  }),
  execute: async ({ lawReference, simplify = false }) => {
    const explanation = legalKnowledgeBase.explainLaw(lawReference, simplify);
    return explanation;
  },
});

executor.register({
  name: "analyze_case",
  description: "Analisa casos e fornece parecer jurídico baseado em jurisprudências similares",
  parameters: z.object({
    caseDescription: z.string().describe("Descrição detalhada do caso"),
    legalArea: z.string().optional().describe("Área do direito (ex: Civil, Penal, Trabalhista)"),
  }),
  execute: async ({ caseDescription, legalArea = "direito-civil" }) => {
    const analysis = legalKnowledgeBase.analyzeCase(caseDescription, legalArea);
    return JSON.stringify(analysis, null, 2);
  },
});

export const legalToolsRegistry = {
  getExecutor: () => executor,
  getToolNames: () => Array.from(executor["tools"].keys()),
};

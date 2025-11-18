import { encode, decode } from "js-tiktoken"

export interface LegalToken {
  value: string
  type: "text" | "legal_term" | "article" | "jurisprudence" | "special"
  id: number
}

export const LEGAL_SPECIAL_TOKENS = {
  "<|legal_start|>": 200000,
  "<|legal_end|>": 200001,
  "<|article|>": 200002,
  "<|jurisprudence|>": 200003,
  "<|minuta|>": 200004,
  "<|peticao|>": 200005,
  "<|contestacao|>": 200006,
  "<|case_analysis|>": 200007,
  "<|reasoning_start|>": 200008,
  "<|reasoning_end|>": 200009,
}

export const legalTokenizer = {
  encode: (text: string): number[] => {
    const baseTokens = encode(text)
    return baseTokens
  },

  decode: (tokens: number[]): string => {
    return decode(tokens)
  },

  countTokens: (text: string): number => {
    return encode(text).length
  },

  tokenizeWithMetadata: (text: string): LegalToken[] => {
    const tokens = encode(text)
    const legalTerms = extractLegalTerms(text)
    
    return tokens.map((id, index) => {
      const value = decode([id])
      let type: LegalToken["type"] = "text"
      
      if (legalTerms.some(term => value.toLowerCase().includes(term.toLowerCase()))) {
        type = "legal_term"
      } else if (/art\.?\s?\d+/i.test(value)) {
        type = "article"
      } else if (/jurisprudência|jurisprudencia/i.test(value)) {
        type = "jurisprudence"
      }

      return { value, type, id }
    })
  },
}

function extractLegalTerms(text: string): string[] {
  const terms = [
    "artigo", "lei", "código", "decreto", "resolução", "portaria",
    "jurisprudência", "jurisprudencia", "precedente", "súmula",
    "petição", "peticao", "minuta", "contestação", "contestacao",
    "recurso", "apelação", "apelacao", "embargos", "execução", "execucao",
    "cível", "civil", "trabalhista", "penal", "tributário", "tributario"
  ]
  return text.split(/\s+/)
    .filter(word => terms.some(term => word.toLowerCase().includes(term)))
}

export default legalTokenizer

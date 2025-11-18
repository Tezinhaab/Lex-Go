// Busca semântica de jurisprudência

import { brazilianLegalKB } from "../legal-knowledge-base"

export interface JurisprudenceResult {
  court: string
  title: string
  summary: string
  relevance: number
}

export async function searchJurisprudence(query: string, court?: string): Promise<JurisprudenceResult[]> {
  const keywords = query
    .toLowerCase()
    .split(" ")
    .filter((w) => w.length > 3)

  let results = brazilianLegalKB.searchJurisprudence(keywords)

  if (court) {
    results = results.filter((r) => r.court.toLowerCase().includes(court.toLowerCase()))
  }

  return results.map((jurisprudence) => ({
    court: jurisprudence.court,
    title: jurisprudence.title,
    summary: jurisprudence.summary,
    relevance: 85,
  }))
}

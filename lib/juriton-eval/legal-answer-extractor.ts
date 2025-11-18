export interface ExtractedAnswer {
  value: string
  confidence: number
  pattern: string
  normalized: string
}

const ANSWER_PATTERNS = [
  {
    regex: /(?:\*{1,2}|_{1,2})\s*(?:Answer|Resposta)[s]?\s*[:\-–]?\s*(?:\*{1,2}|_{1,2})\s*([A-Z])\b/gi,
    name: "markdown_wrapped_answer",
  },
  {
    regex: /(?:Answer|Resposta)[s]?\b\s*[:\-–]?\s*$$\s*([A-Z])\s*$$/gi,
    name: "parenthesis_answer",
  },
  {
    regex: /(?:Answer|Resposta)[s]?\b\s*[:\-–]?\s*([A-Z])\b/gi,
    name: "plain_answer",
  },
  {
    regex: /(?:Option|Choice|Opção)\b\s*[:\-–]?\s*([A-Z])\b/gi,
    name: "option_choice",
  },
  {
    regex: /\\boxed\{[^}]*?([A-Z])[^}]*\}/gi,
    name: "latex_boxed",
  },
  {
    regex: /(?<![A-Za-z0-9])[$$\[]\s*([A-Z])\s*[$$\]](?![A-Za-z0-9])/g,
    name: "bare_singleton",
  },
]

export const legalAnswerExtractor = {
  extractAnswer: (text: string): ExtractedAnswer | null => {
    if (!text) return null

    for (const pattern of ANSWER_PATTERNS) {
      const matches = [...text.matchAll(pattern.regex)]
      if (matches.length > 0) {
        const lastMatch = matches[matches.length - 1]
        const answer = lastMatch[1].toUpperCase()

        if (/^[A-Z]$/.test(answer)) {
          return {
            value: answer,
            confidence: 0.95,
            pattern: pattern.name,
            normalized: answer,
          }
        }
      }
    }

    const linePattern = /^\s*([A-Z])\s*[\.\)\-–:]?\s*.*$/gm
    const lineMatches = [...text.matchAll(linePattern)]
    
    if (lineMatches.length > 0) {
      const answer = lineMatches[0][1].toUpperCase()
      if (/^[A-Z]$/.test(answer)) {
        return {
          value: answer,
          confidence: 0.7,
          pattern: "line_start",
          normalized: answer,
        }
      }
    }

    return null
  },

  extractMultipleAnswers: (text: string): ExtractedAnswer[] => {
    const answers: ExtractedAnswer[] = []
    const seenAnswers = new Set<string>()

    for (const pattern of ANSWER_PATTERNS) {
      const matches = [...text.matchAll(pattern.regex)]
      for (const match of matches) {
        const answer = match[1].toUpperCase()
        if (/^[A-Z]$/.test(answer) && !seenAnswers.has(answer)) {
          answers.push({
            value: answer,
            confidence: 0.9,
            pattern: pattern.name,
            normalized: answer,
          })
          seenAnswers.add(answer)
        }
      }
    }

    return answers
  },

  normalizeAnswer: (answer: string): string => {
    return answer.trim().toUpperCase().charAt(0)
  },
}

import { legalAnswerExtractor } from "./legal-answer-extractor"

export interface LegalEvalResult {
  questionId: string
  question: string
  correctAnswer: string
  extractedAnswer: string | null
  isCorrect: boolean
  score: number
  confidence: number
  responseText: string
  metadata: Record<string, any>
}

export interface LegalEvaluation {
  totalQuestions: number
  correctAnswers: number
  accuracy: number
  averageConfidence: number
  results: LegalEvalResult[]
}

export const legalEvaluator = {
  evaluateResponse: (
    question: string,
    responseText: string,
    correctAnswer: string,
    metadata?: Record<string, any>
  ): LegalEvalResult => {
    const extracted = legalAnswerExtractor.extractAnswer(responseText)
    const extractedAnswer = extracted?.value || null
    const isCorrect = extractedAnswer === correctAnswer.toUpperCase()
    
    return {
      questionId: `eval_${Date.now()}`,
      question,
      correctAnswer: correctAnswer.toUpperCase(),
      extractedAnswer,
      isCorrect,
      score: isCorrect ? 1.0 : 0.0,
      confidence: extracted?.confidence || 0,
      responseText,
      metadata: metadata || {},
    }
  },

  batchEvaluate: (
    questions: Array<{ question: string; correctAnswer: string }>,
    responses: string[]
  ): LegalEvaluation => {
    const results = questions.map((q, i) =>
      legalEvaluator.evaluateResponse(q.question, responses[i], q.correctAnswer)
    )

    const correctCount = results.filter(r => r.isCorrect).length
    const avgConfidence = results.reduce((sum, r) => sum + r.confidence, 0) / results.length

    return {
      totalQuestions: questions.length,
      correctAnswers: correctCount,
      accuracy: correctCount / questions.length,
      averageConfidence: avgConfidence,
      results,
    }
  },

  generateReport: (evaluation: LegalEvaluation): string => {
    const report = `
📋 RELATÓRIO DE AVALIAÇÃO JURÍDICA

Total de Questões: ${evaluation.totalQuestions}
Respostas Corretas: ${evaluation.correctAnswers}
Taxa de Acurácia: ${(evaluation.accuracy * 100).toFixed(2)}%
Confiança Média: ${(evaluation.averageConfidence * 100).toFixed(2)}%

DETALHES POR QUESTÃO:
${evaluation.results
  .map(
    (r, i) => `
${i + 1}. ${r.question}
   Resposta Correta: ${r.correctAnswer}
   Resposta Extraída: ${r.extractedAnswer || "Não identificada"}
   Status: ${r.isCorrect ? "✅ CORRETO" : "❌ INCORRETO"}
   Confiança: ${(r.confidence * 100).toFixed(2)}%
`
  )
  .join("")}
    `.trim()

    return report
  },
}

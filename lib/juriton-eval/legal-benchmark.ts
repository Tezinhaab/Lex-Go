import { SingleEvalResult, MessageList } from './types';

export interface LegalBenchmarkCase {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  domain: string; // Constitutional, Labor, Civil, Criminal, etc.
  difficulty: 'easy' | 'medium' | 'hard';
}

export class LegalBenchmark {
  private cases: LegalBenchmarkCase[] = [
    {
      question: 'Qual artigo da Constituição Federal trata de direitos fundamentais?',
      correct_answer: 'Artigo 5º',
      incorrect_answers: ['Artigo 1º', 'Artigo 10º', 'Artigo 20º'],
      domain: 'Constitutional',
      difficulty: 'easy'
    },
    {
      question: 'Em qual situação é permitido o direito de greve conforme a Constituição?',
      correct_answer: 'Quando regulamentada por lei',
      incorrect_answers: ['Nunca é permitido', 'Sempre é permitido sem restrições', 'Apenas no setor público'],
      domain: 'Constitutional',
      difficulty: 'medium'
    }
  ];

  evaluateResponse(response: string, correctAnswer: string): SingleEvalResult {
    const score = response.toLowerCase().includes(correctAnswer.toLowerCase()) ? 1.0 : 0.0;
    return {
      score,
      metrics: {
        accuracy: score,
        relevance: this.calculateRelevance(response, correctAnswer),
        completeness: this.calculateCompleteness(response)
      },
      example_level_metadata: {
        response_length: response.length,
        processing_time: 0
      }
    };
  }

  private calculateRelevance(response: string, correctAnswer: string): number {
    const words = response.toLowerCase().split(/\s+/);
    const correctWords = correctAnswer.toLowerCase().split(/\s+/);
    const matches = correctWords.filter(w => words.includes(w)).length;
    return matches / correctWords.length;
  }

  private calculateCompleteness(response: string): number {
    return Math.min(1.0, response.split(/\s+/).length / 50);
  }

  getCases(): LegalBenchmarkCase[] {
    return this.cases;
  }
}

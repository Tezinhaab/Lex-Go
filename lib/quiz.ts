"use client"

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  difficulty: "easy" | "medium" | "hard"
  xpReward: number
}

export interface Quiz {
  id: string
  lessonId: string
  title: string
  description: string
  questions: QuizQuestion[]
  passingScore: number
  timeLimit?: number
}

export interface QuizAttempt {
  id: string
  quizId: string
  userId: string
  answers: number[]
  score: number
  xpEarned: number
  completedAt: string
  isPassed: boolean
}

export const quizService = {
  getQuiz: (lessonId: string): Quiz | null => {
    const quizzes = quizService.getAllQuizzes()
    return quizzes.find((q) => q.lessonId === lessonId) || null
  },

  getAllQuizzes: (): Quiz[] => {
    return [
      {
        id: "quiz_civil_1",
        lessonId: "lesson_civil_1",
        title: "Quiz de Direito Civil - Básico",
        description: "Teste seus conhecimentos sobre os fundamentos do Direito Civil",
        passingScore: 70,
        questions: [
          {
            id: "q1",
            question: "O que é capacidade civil?",
            options: [
              "É a aptidão para exercer por si só os atos da vida civil",
              "É a possibilidade de contratar empréstimos",
              "É o direito de votar e ser votado",
              "É a capacidade de trabalhar",
            ],
            correctAnswer: 0,
            explanation:
              "Capacidade civil é a aptidão para exercer por si só os atos da vida civil, adquirida aos 18 anos.",
            difficulty: "easy",
            xpReward: 10,
          },
          {
            id: "q2",
            question: "Qual é a maioridade civil no Brasil?",
            options: ["16 anos", "18 anos", "21 anos", "25 anos"],
            correctAnswer: 1,
            explanation: "A maioridade civil no Brasil é atingida aos 18 anos completos, conforme o Código Civil.",
            difficulty: "easy",
            xpReward: 10,
          },
          {
            id: "q3",
            question: "O que são direitos da personalidade?",
            options: [
              "Direitos relacionados apenas ao trabalho",
              "Direitos inerentes à pessoa humana, como vida, honra e imagem",
              "Direitos de propriedade",
              "Direitos políticos",
            ],
            correctAnswer: 1,
            explanation:
              "Direitos da personalidade são aqueles inerentes à pessoa humana, protegendo atributos essenciais como vida, integridade física, honra, imagem e privacidade.",
            difficulty: "medium",
            xpReward: 15,
          },
          {
            id: "q4",
            question: "Qual o prazo prescricional geral previsto no Código Civil?",
            options: ["5 anos", "10 anos", "15 anos", "20 anos"],
            correctAnswer: 1,
            explanation:
              "O prazo prescricional geral é de 10 anos, conforme estabelecido no artigo 205 do Código Civil.",
            difficulty: "medium",
            xpReward: 15,
          },
          {
            id: "q5",
            question: "O que é ato jurídico perfeito?",
            options: [
              "Ato que foi realizado com perfeição técnica",
              "Ato já consumado segundo a lei vigente ao tempo que se efetuou",
              "Ato que não possui vícios",
              "Ato que foi registrado em cartório",
            ],
            correctAnswer: 1,
            explanation:
              "Ato jurídico perfeito é aquele já consumado segundo a lei vigente ao tempo em que se efetuou, sendo protegido constitucionalmente.",
            difficulty: "hard",
            xpReward: 20,
          },
        ],
      },
      {
        id: "quiz_penal_1",
        lessonId: "lesson_penal_1",
        title: "Quiz de Direito Penal - Introdução",
        description: "Avalie seu conhecimento sobre os princípios do Direito Penal",
        passingScore: 70,
        questions: [
          {
            id: "q1",
            question: "Qual é o princípio que determina que não há crime sem lei anterior que o defina?",
            options: [
              "Princípio da anterioridade",
              "Princípio da legalidade",
              "Princípio da culpabilidade",
              "Princípio da taxatividade",
            ],
            correctAnswer: 1,
            explanation:
              "O princípio da legalidade estabelece que não há crime sem lei anterior que o defina, nem pena sem prévia cominação legal.",
            difficulty: "easy",
            xpReward: 10,
          },
          {
            id: "q2",
            question: "O que é dolo?",
            options: [
              "É o descuido ou negligência",
              "É a vontade consciente de praticar a conduta criminosa",
              "É a punição aplicada ao crime",
              "É a circunstância atenuante",
            ],
            correctAnswer: 1,
            explanation: "Dolo é a vontade livre e consciente de praticar a conduta descrita no tipo penal.",
            difficulty: "medium",
            xpReward: 15,
          },
          {
            id: "q3",
            question: "Qual a diferença entre crime tentado e consumado?",
            options: [
              "No tentado o resultado não se consumou por circunstâncias alheias à vontade do agente",
              "No tentado não há dolo",
              "No tentado a pena é sempre igual ao consumado",
              "Não há diferença prática",
            ],
            correctAnswer: 0,
            explanation:
              "Crime tentado ocorre quando, iniciada a execução, não se consuma por circunstâncias alheias à vontade do agente.",
            difficulty: "medium",
            xpReward: 15,
          },
        ],
      },
    ]
  },

  submitQuiz: (quizId: string, userId: string, answers: number[]): QuizAttempt => {
    const quiz = quizService.getAllQuizzes().find((q) => q.id === quizId)
    if (!quiz) throw new Error("Quiz não encontrado")

    let correctAnswers = 0
    let xpEarned = 0

    answers.forEach((answer, index) => {
      if (quiz.questions[index] && answer === quiz.questions[index].correctAnswer) {
        correctAnswers++
        xpEarned += quiz.questions[index].xpReward
      }
    })

    const score = (correctAnswers / quiz.questions.length) * 100
    const isPassed = score >= quiz.passingScore

    const attempt: QuizAttempt = {
      id: "attempt_" + Date.now(),
      quizId,
      userId,
      answers,
      score,
      xpEarned: isPassed ? xpEarned : 0,
      completedAt: new Date().toISOString(),
      isPassed,
    }

    // Salvar tentativa
    const attempts = quizService.getUserAttempts(userId)
    attempts.push(attempt)
    localStorage.setItem(`lexgo_quiz_attempts_${userId}`, JSON.stringify(attempts))

    // Atualizar XP do usuário se passou
    if (isPassed) {
      const { authService } = require("./auth")
      const user = authService.getCurrentUser()
      if (user) {
        authService.updateUser({ xp: user.xp + xpEarned })
      }
    }

    return attempt
  },

  getUserAttempts: (userId: string): QuizAttempt[] => {
    if (typeof window === "undefined") return []
    const attemptsStr = localStorage.getItem(`lexgo_quiz_attempts_${userId}`)
    return attemptsStr ? JSON.parse(attemptsStr) : []
  },
}

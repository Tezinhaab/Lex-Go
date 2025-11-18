"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { quizService, type Quiz } from "@/lib/quiz"
import { authService } from "@/lib/auth"
import { Clock, Check, X, Award, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"

export default function QuizPage({ params }: { params: { quizId: string } }) {
  const router = useRouter()
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null)
  const [quizResult, setQuizResult] = useState<any>(null)

  useEffect(() => {
    const quizzes = quizService.getAllQuizzes()
    const foundQuiz = quizzes.find((q) => q.id === params.quizId)
    if (foundQuiz) {
      setQuiz(foundQuiz)
      setSelectedAnswers(new Array(foundQuiz.questions.length).fill(-1))
      if (foundQuiz.timeLimit) {
        setTimeRemaining(foundQuiz.timeLimit * 60)
      }
    }
  }, [params.quizId])

  useEffect(() => {
    if (timeRemaining !== null && timeRemaining > 0 && !showResults) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeRemaining === 0) {
      handleSubmit()
    }
  }, [timeRemaining, showResults])

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (quiz && currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    const user = authService.getCurrentUser()
    if (!quiz || !user) return

    const result = quizService.submitQuiz(quiz.id, user.id, selectedAnswers)
    setQuizResult(result)
    setShowResults(true)
  }

  if (!quiz) {
    return <div>Carregando...</div>
  }

  if (showResults && quizResult) {
    return (
      <div className="min-h-screen bg-black">
        <DashboardHeader />

        <main className="container mx-auto px-4 py-8">
          <Card className="max-w-4xl mx-auto p-8 bg-zinc-950 border-zinc-800">
            <div className="text-center mb-8">
              {quizResult.isPassed ? (
                <>
                  <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-3xl font-black text-white mb-2">Parabéns!</h2>
                  <p className="text-gray-400">Você foi aprovado no quiz</p>
                </>
              ) : (
                <>
                  <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <X className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-3xl font-black text-white mb-2">Continue Tentando!</h2>
                  <p className="text-gray-400">Você não atingiu a nota mínima</p>
                </>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <Card className="p-4 bg-zinc-900 border-zinc-800">
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8 text-yellow-500" />
                  <div>
                    <p className="text-sm text-gray-400">Pontuação</p>
                    <p className="text-2xl font-bold text-white">{quizResult.score.toFixed(0)}%</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-zinc-900 border-zinc-800">
                <div className="flex items-center gap-3">
                  <Check className="w-8 h-8 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-400">Acertos</p>
                    <p className="text-2xl font-bold text-white">
                      {selectedAnswers.filter((a, i) => a === quiz.questions[i].correctAnswer).length}/
                      {quiz.questions.length}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-zinc-900 border-zinc-800">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-8 h-8 text-yellow-500" />
                  <div>
                    <p className="text-sm text-gray-400">XP Ganho</p>
                    <p className="text-2xl font-bold text-yellow-500">+{quizResult.xpEarned}</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-4 mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Revisão das Questões</h3>
              {quiz.questions.map((question, index) => {
                const userAnswer = selectedAnswers[index]
                const isCorrect = userAnswer === question.correctAnswer

                return (
                  <Card
                    key={question.id}
                    className={`p-6 border-2 ${isCorrect ? "border-green-800 bg-green-950/10" : "border-red-800 bg-red-950/10"}`}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isCorrect ? "bg-green-600" : "bg-red-600"}`}
                      >
                        {isCorrect ? <Check className="w-5 h-5 text-white" /> : <X className="w-5 h-5 text-white" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-white mb-3">
                          {index + 1}. {question.question}
                        </p>
                        <div className="space-y-2">
                          {question.options.map((option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className={`p-3 rounded-lg border ${
                                optionIndex === question.correctAnswer
                                  ? "border-green-600 bg-green-950/20"
                                  : optionIndex === userAnswer
                                    ? "border-red-600 bg-red-950/20"
                                    : "border-zinc-800 bg-zinc-900"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                {optionIndex === question.correctAnswer && <Check className="w-4 h-4 text-green-500" />}
                                {optionIndex === userAnswer && optionIndex !== question.correctAnswer && (
                                  <X className="w-4 h-4 text-red-500" />
                                )}
                                <span className="text-sm text-white">{option}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 p-4 bg-blue-950/20 border border-blue-800 rounded-lg">
                          <p className="text-sm text-blue-300">
                            <strong>Explicação:</strong> {question.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => router.push("/dashboard/courses")}
                className="flex-1 bg-zinc-800 hover:bg-zinc-700"
              >
                Voltar para Cursos
              </Button>
              {!quizResult.isPassed && (
                <Button
                  onClick={() => {
                    setShowResults(false)
                    setCurrentQuestion(0)
                    setSelectedAnswers(new Array(quiz.questions.length).fill(-1))
                    setQuizResult(null)
                  }}
                  className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold"
                >
                  Tentar Novamente
                </Button>
              )}
            </div>
          </Card>
        </main>
      </div>
    )
  }

  const question = quiz.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100

  return (
    <div className="min-h-screen bg-black">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Image src="/mascot.png" alt="Juriton" width={60} height={60} className="animate-bounce" />
              <div>
                <h1 className="text-2xl font-black text-white">{quiz.title}</h1>
                <p className="text-gray-400">{quiz.description}</p>
              </div>
            </div>
            {timeRemaining !== null && (
              <Card className="p-4 bg-zinc-900 border-zinc-800">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-yellow-500" />
                  <span className="text-lg font-bold text-white">
                    {Math.floor(timeRemaining / 60)}:{String(timeRemaining % 60).padStart(2, "0")}
                  </span>
                </div>
              </Card>
            )}
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">
                Questão {currentQuestion + 1} de {quiz.questions.length}
              </span>
              <span className="text-sm text-gray-400">{progress.toFixed(0)}% concluído</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="p-8 bg-zinc-950 border-zinc-800 mb-6">
            <div className="flex items-start gap-4 mb-6">
              <Badge
                variant={
                  question.difficulty === "easy"
                    ? "default"
                    : question.difficulty === "medium"
                      ? "secondary"
                      : "destructive"
                }
              >
                {question.difficulty === "easy" && "Fácil"}
                {question.difficulty === "medium" && "Médio"}
                {question.difficulty === "hard" && "Difícil"}
              </Badge>
              <Badge variant="outline">+{question.xpReward} XP</Badge>
            </div>

            <h2 className="text-xl font-bold text-white mb-6">{question.question}</h2>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    selectedAnswers[currentQuestion] === index
                      ? "border-yellow-500 bg-yellow-950/20"
                      : "border-zinc-800 bg-zinc-900 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswers[currentQuestion] === index
                          ? "border-yellow-500 bg-yellow-500"
                          : "border-zinc-700"
                      }`}
                    >
                      {selectedAnswers[currentQuestion] === index && <Check className="w-4 h-4 text-black" />}
                    </div>
                    <span className="text-white">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          <div className="flex gap-4">
            <Button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              variant="outline"
              className="flex-1 bg-transparent"
            >
              Anterior
            </Button>
            {currentQuestion === quiz.questions.length - 1 ? (
              <Button
                onClick={handleSubmit}
                disabled={selectedAnswers.includes(-1)}
                className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold"
              >
                Finalizar Quiz
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold"
              >
                Próxima
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

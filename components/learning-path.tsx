"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock, CheckCircle2, Play, Star, BookOpen, FileText, Gavel, Users } from "lucide-react"
import Link from "next/link"

interface Subject {
  id: string
  title: string
  description: string
  progress: number
  isUnlocked: boolean
  isCompleted: boolean
  xpReward: number
  lessons: number
  icon: any
}

const subjects: Subject[] = [
  {
    id: "1",
    title: "Introdução ao Direito",
    description: "Conceitos fundamentais do direito brasileiro",
    progress: 100,
    isUnlocked: true,
    isCompleted: true,
    xpReward: 500,
    lessons: 12,
    icon: BookOpen,
  },
  {
    id: "2",
    title: "Direito Constitucional",
    description: "Princípios e normas da Constituição Federal",
    progress: 65,
    isUnlocked: true,
    isCompleted: false,
    xpReward: 800,
    lessons: 18,
    icon: FileText,
  },
  {
    id: "3",
    title: "Direito Civil",
    description: "Relações entre particulares e direitos civis",
    progress: 0,
    isUnlocked: true,
    isCompleted: false,
    xpReward: 1000,
    lessons: 24,
    icon: Users,
  },
  {
    id: "4",
    title: "Direito Penal",
    description: "Crimes, penas e processo penal",
    progress: 0,
    isUnlocked: false,
    isCompleted: false,
    xpReward: 1200,
    lessons: 20,
    icon: Gavel,
  },
  {
    id: "5",
    title: "Direito Trabalhista",
    description: "Relações de trabalho e direitos trabalhistas",
    progress: 0,
    isUnlocked: false,
    isCompleted: false,
    xpReward: 900,
    lessons: 16,
    icon: Users,
  },
]

export function LearningPath() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-black">Sua Trilha de Conhecimento</h1>
        <p className="text-gray-600 text-lg">Continue sua jornada e desbloqueie novas matérias</p>
        <div className="flex flex-wrap gap-4">
          <div className="bg-gray-100 px-4 py-2 rounded-lg border border-gray-200">
            <span className="text-gray-600 text-sm">Sequência: </span>
            <span className="text-blue-900 font-bold">7 dias</span>
          </div>
          <div className="bg-gray-100 px-4 py-2 rounded-lg border border-gray-200">
            <span className="text-gray-600 text-sm">Total XP: </span>
            <span className="text-blue-900 font-bold">1,650</span>
          </div>
        </div>
      </div>

      {/* Learning Path */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Star className="w-6 h-6 text-blue-900" />
          <h2 className="text-2xl font-bold text-black">Curso: Fundamentos do Direito</h2>
        </div>

        <div className="grid gap-6">
          {subjects.map((subject, index) => {
            const Icon = subject.icon
            return (
              <Card
                key={subject.id}
                className={`relative overflow-hidden transition-all duration-300 ${
                  !subject.isUnlocked ? "opacity-60 grayscale" : "hover:shadow-lg"
                } bg-white border-gray-200`}
              >
                {/* Progress bar */}
                {subject.isUnlocked && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200">
                    <div
                      className="h-full bg-black transition-all duration-500"
                      style={{ width: `${subject.progress}%` }}
                    />
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-start gap-6">
                    {/* Icon with status */}
                    <div className="relative flex-shrink-0">
                      <div
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                          subject.isCompleted
                            ? "bg-green-500 text-white"
                            : subject.isUnlocked
                              ? "bg-blue-900 text-white"
                              : "bg-gray-300 text-gray-500"
                        }`}
                      >
                        {subject.isCompleted ? (
                          <CheckCircle2 className="w-8 h-8" />
                        ) : subject.isUnlocked ? (
                          <Icon className="w-8 h-8" />
                        ) : (
                          <Lock className="w-8 h-8" />
                        )}
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-bold text-black">
                        {index + 1}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="text-xl font-bold text-black mb-1">{subject.title}</h3>
                        <p className="text-gray-600">{subject.description}</p>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center gap-1 text-gray-600">
                          <BookOpen className="w-4 h-4" />
                          <span>{subject.lessons} lições</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Star className="w-4 h-4" />
                          <span>{subject.xpReward} XP</span>
                        </div>
                        {subject.progress > 0 && subject.progress < 100 && (
                          <div className="flex items-center gap-1 text-blue-900 font-semibold">
                            <span>{subject.progress}% concluído</span>
                          </div>
                        )}
                      </div>

                      {/* Action button */}
                      {subject.isUnlocked && (
                        <div className="pt-2">
                          <Link href={`/dashboard/curso/${subject.id}`}>
                            <Button
                              className={
                                subject.isCompleted
                                  ? "bg-green-600 hover:bg-green-700 text-white"
                                  : "bg-black hover:bg-gray-900 text-white"
                              }
                            >
                              {subject.isCompleted ? (
                                <>
                                  <CheckCircle2 className="w-4 h-4 mr-2" />
                                  Revisar
                                </>
                              ) : subject.progress > 0 ? (
                                <>
                                  <Play className="w-4 h-4 mr-2" />
                                  Continuar
                                </>
                              ) : (
                                <>
                                  <Play className="w-4 h-4 mr-2" />
                                  Começar
                                </>
                              )}
                            </Button>
                          </Link>
                        </div>
                      )}

                      {!subject.isUnlocked && (
                        <div className="pt-2">
                          <p className="text-sm text-gray-600 flex items-center gap-2">
                            <Lock className="w-4 h-4" />
                            Complete a matéria anterior para desbloquear
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Empty state message */}
      <Card className="bg-gray-50 border-gray-200 p-8 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="text-4xl">🎯</div>
          <h3 className="text-xl font-bold text-black">Continue Aprendendo!</h3>
          <p className="text-gray-600">
            Complete as matérias acima para desbloquear novos cursos e ganhar mais XP. Cada matéria contém quiz
            interativos, termos jurídicos, jurisprudências e muito mais!
          </p>
        </div>
      </Card>
    </div>
  )
}

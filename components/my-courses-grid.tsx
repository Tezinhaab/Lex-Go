"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import Link from "next/link"
import { Clock, Target, TrendingUp, CheckCircle2, Play, Lock } from "lucide-react"

interface CourseStats {
  hoursStudied: number
  correctAnswers: number
  totalQuestions: number
  averageScore: number
  lastActivity: string
}

interface Course {
  id: string
  title: string
  description: string
  progress: number
  status: "in-progress" | "completed" | "locked"
  subjects: number
  completedSubjects: number
  stats: CourseStats
  color: string
  lastSubject?: string
}

const courses: Course[] = [
  {
    id: "1",
    title: "Direito Constitucional",
    description: "Fundamentos da Constituição Federal",
    progress: 65,
    status: "in-progress",
    subjects: 12,
    completedSubjects: 8,
    stats: {
      hoursStudied: 18.5,
      correctAnswers: 127,
      totalQuestions: 150,
      averageScore: 84.6,
      lastActivity: "Há 2 horas",
    },
    color: "from-blue-500 to-cyan-500",
    lastSubject: "Direitos Fundamentais - Lição 3",
  },
  {
    id: "2",
    title: "Direito Penal",
    description: "Teoria do Crime e Penas",
    progress: 35,
    status: "in-progress",
    subjects: 15,
    completedSubjects: 5,
    stats: {
      hoursStudied: 9.2,
      correctAnswers: 68,
      totalQuestions: 85,
      averageScore: 80.0,
      lastActivity: "Há 1 dia",
    },
    color: "from-red-500 to-orange-500",
    lastSubject: "Crimes contra a Pessoa - Quiz 2",
  },
  {
    id: "3",
    title: "Direito Civil",
    description: "Parte Geral e Obrigações",
    progress: 90,
    status: "in-progress",
    subjects: 18,
    completedSubjects: 16,
    stats: {
      hoursStudied: 32.4,
      correctAnswers: 245,
      totalQuestions: 270,
      averageScore: 90.7,
      lastActivity: "Há 5 horas",
    },
    color: "from-purple-500 to-pink-500",
    lastSubject: "Contratos - Prova Final",
  },
  {
    id: "4",
    title: "Direito Administrativo",
    description: "Princípios e Atos Administrativos",
    progress: 100,
    status: "completed",
    subjects: 10,
    completedSubjects: 10,
    stats: {
      hoursStudied: 25.8,
      correctAnswers: 198,
      totalQuestions: 210,
      averageScore: 94.3,
      lastActivity: "Há 3 dias",
    },
    color: "from-green-500 to-emerald-500",
    lastSubject: "Concluído",
  },
  {
    id: "5",
    title: "Direito Tributário",
    description: "Sistema Tributário Nacional",
    progress: 0,
    status: "locked",
    subjects: 14,
    completedSubjects: 0,
    stats: {
      hoursStudied: 0,
      correctAnswers: 0,
      totalQuestions: 0,
      averageScore: 0,
      lastActivity: "Não iniciado",
    },
    color: "from-gray-500 to-gray-600",
  },
]

export function MyCoursesGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <Card key={course.id} className="relative overflow-hidden border-2 hover:border-accent/50 transition-all group">
          {/* Header with gradient */}
          <div className={`h-32 bg-gradient-to-br ${course.color} relative flex items-center justify-center`}>
            <div className="absolute inset-0 bg-black/10" />
            <h3 className="text-2xl font-bold text-white z-10 text-center px-4 text-balance">{course.title}</h3>
            {course.status === "completed" && (
              <div className="absolute top-3 right-3 bg-green-500 text-white rounded-full p-2">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            )}
            {course.status === "locked" && (
              <div className="absolute top-3 right-3 bg-gray-800 text-white rounded-full p-2">
                <Lock className="w-6 h-6" />
              </div>
            )}
          </div>

          <div className="p-6 space-y-4">
            {/* Description */}
            <p className="text-sm text-muted-foreground">{course.description}</p>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Progresso do Curso</span>
                <span className="text-accent font-bold">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {course.completedSubjects} de {course.subjects} matérias concluídas
              </p>
            </div>

            {/* Last Activity */}
            {course.lastSubject && course.status !== "locked" && (
              <div className="bg-secondary/50 rounded-lg p-3 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Continue de onde parou:</p>
                <p className="text-sm font-medium">{course.lastSubject}</p>
              </div>
            )}

            {/* Juriton Stats Balloon */}
            {course.status !== "locked" && (
              <div className="relative bg-accent/10 rounded-2xl p-4 border-2 border-accent/20">
                {/* Mascot */}
                <div className="absolute -top-8 -right-4 w-20 h-20 rounded-full bg-accent/20 border-4 border-background flex items-center justify-center overflow-hidden">
                  <Image
                    src="/mascot.png"
                    alt="Juriton"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h4 className="text-xs font-bold text-accent mb-3 flex items-center gap-1">
                  <Target className="w-3 h-3" />
                  Seu Desempenho
                </h4>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span className="text-xs">Horas</span>
                    </div>
                    <p className="font-bold text-sm">{course.stats.hoursStudied}h</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <CheckCircle2 className="w-3 h-3" />
                      <span className="text-xs">Acertos</span>
                    </div>
                    <p className="font-bold text-sm">
                      {course.stats.correctAnswers}/{course.stats.totalQuestions}
                    </p>
                  </div>

                  <div className="space-y-1 col-span-2">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <TrendingUp className="w-3 h-3" />
                      <span className="text-xs">Média Geral</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={course.stats.averageScore} className="h-2 flex-1" />
                      <span className="font-bold text-sm text-accent">{course.stats.averageScore.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground mt-3 border-t border-border pt-2">
                  Última atividade: {course.stats.lastActivity}
                </p>
              </div>
            )}

            {/* Action Button */}
            <Link href={course.status === "locked" ? "#" : `/dashboard/curso/${course.id}`} className="block">
              <Button
                className="w-full gap-2 group-hover:scale-105 transition-transform"
                disabled={course.status === "locked"}
                variant={course.status === "completed" ? "outline" : "default"}
              >
                {course.status === "locked" && (
                  <>
                    <Lock className="w-4 h-4" />
                    Bloqueado
                  </>
                )}
                {course.status === "in-progress" && (
                  <>
                    <Play className="w-4 h-4" />
                    Continuar
                  </>
                )}
                {course.status === "completed" && (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Revisar Curso
                  </>
                )}
              </Button>
            </Link>
          </div>
        </Card>
      ))}
    </div>
  )
}

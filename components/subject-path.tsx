"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Brain, Scale, FileText, Mic, Trophy, Lock, CheckCircle2, Star, ArrowLeft, Play } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface LessonNode {
  id: string
  type: "lesson" | "quiz" | "terms" | "jurisprudence" | "hearing" | "exam"
  title: string
  isUnlocked: boolean
  isCompleted: boolean
  xp: number
}

interface Subject {
  id: string
  title: string
  description: string
  nodes: LessonNode[]
  totalXP: number
  requiredXP: number
  currentXP: number
}

const getNodeIcon = (type: string) => {
  switch (type) {
    case "lesson":
      return BookOpen
    case "quiz":
      return Brain
    case "terms":
      return FileText
    case "jurisprudence":
      return Scale
    case "hearing":
      return Mic
    case "exam":
      return Trophy
    default:
      return BookOpen
  }
}

const getNodeColor = (type: string, isCompleted: boolean, isUnlocked: boolean) => {
  if (!isUnlocked) return "bg-muted text-muted-foreground"
  if (isCompleted) return "bg-accent text-accent-foreground"

  switch (type) {
    case "lesson":
      return "bg-primary text-white"
    case "quiz":
      return "bg-purple-500 text-white"
    case "terms":
      return "bg-blue-500 text-white"
    case "jurisprudence":
      return "bg-orange text-white"
    case "hearing":
      return "bg-pink-500 text-white"
    case "exam":
      return "bg-accent text-accent-foreground"
    default:
      return "bg-primary text-white"
  }
}

const getNodeLabel = (type: string) => {
  switch (type) {
    case "lesson":
      return "Lição"
    case "quiz":
      return "Quiz"
    case "terms":
      return "Termos"
    case "jurisprudence":
      return "Jurisprudência"
    case "hearing":
      return "Audiência"
    case "exam":
      return "Prova Final"
    default:
      return type
  }
}

// Mock data - seria substituído por dados reais
const subjectData: Subject = {
  id: "2",
  title: "Direito Constitucional",
  description: "Princípios e normas da Constituição Federal",
  totalXP: 800,
  requiredXP: 520,
  currentXP: 320,
  nodes: [
    { id: "1", type: "lesson", title: "Introdução à Constituição", isUnlocked: true, isCompleted: true, xp: 50 },
    { id: "2", type: "terms", title: "Termos Constitucionais Básicos", isUnlocked: true, isCompleted: true, xp: 30 },
    { id: "3", type: "lesson", title: "Direitos Fundamentais", isUnlocked: true, isCompleted: true, xp: 50 },
    { id: "4", type: "quiz", title: "Quiz: Direitos e Garantias", isUnlocked: true, isCompleted: true, xp: 40 },
    {
      id: "5",
      type: "jurisprudence",
      title: "Jurisprudência: Direitos Fundamentais",
      isUnlocked: true,
      isCompleted: true,
      xp: 60,
    },
    { id: "6", type: "lesson", title: "Organização do Estado", isUnlocked: true, isCompleted: true, xp: 50 },
    {
      id: "7",
      type: "hearing",
      title: "Audiência: Controle de Constitucionalidade",
      isUnlocked: true,
      isCompleted: false,
      xp: 70,
    },
    { id: "8", type: "quiz", title: "Quiz: Organização Estatal", isUnlocked: true, isCompleted: false, xp: 40 },
    { id: "9", type: "lesson", title: "Poder Executivo", isUnlocked: false, isCompleted: false, xp: 50 },
    { id: "10", type: "terms", title: "Termos Avançados", isUnlocked: false, isCompleted: false, xp: 30 },
    { id: "11", type: "lesson", title: "Poder Legislativo", isUnlocked: false, isCompleted: false, xp: 50 },
    {
      id: "12",
      type: "jurisprudence",
      title: "Jurisprudência: Separação de Poderes",
      isUnlocked: false,
      isCompleted: false,
      xp: 60,
    },
    { id: "13", type: "quiz", title: "Quiz: Poderes da República", isUnlocked: false, isCompleted: false, xp: 40 },
    { id: "14", type: "lesson", title: "Poder Judiciário", isUnlocked: false, isCompleted: false, xp: 50 },
    { id: "15", type: "hearing", title: "Audiência: STF em Ação", isUnlocked: false, isCompleted: false, xp: 70 },
    {
      id: "16",
      type: "exam",
      title: "Prova Final: Direito Constitucional",
      isUnlocked: false,
      isCompleted: false,
      xp: 150,
    },
  ],
}

export function SubjectPath({ courseId }: { courseId: string }) {
  const router = useRouter()
  const progressPercentage = (subjectData.currentXP / subjectData.totalXP) * 100

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{subjectData.title}</h1>
          <p className="text-muted-foreground">{subjectData.description}</p>
        </div>
      </div>

      {/* Progress Card with Mascot */}
      <Card className="bg-gradient-to-br from-primary to-primary/80 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange/20 rounded-full blur-3xl" />

        <div className="p-6 md:p-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="space-y-2">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <Star className="w-5 h-5 text-accent" />
                  <span className="text-sm font-semibold">Progresso da Matéria</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/80">
                      {subjectData.currentXP} / {subjectData.totalXP} XP
                    </span>
                    <span className="font-bold">{Math.round(progressPercentage)}%</span>
                  </div>
                  <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent to-orange transition-all duration-500"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <Badge className="bg-white/10 hover:bg-white/20 border-white/20">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  6/16 completo
                </Badge>
                <Badge className="bg-white/10 hover:bg-white/20 border-white/20">
                  <Trophy className="w-3 h-3 mr-1" />
                  {subjectData.requiredXP} XP para passar
                </Badge>
              </div>
            </div>

            <div className="animate-float-2">
              <Image
                src="/mascot.png"
                alt="LEX GO! Mascote"
                width={120}
                height={120}
                className="w-28 h-28 object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Learning Path */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-primary" />
          Trilha de Conhecimento
        </h2>

        <div className="relative">
          {/* Connecting line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-accent via-primary to-muted"
            style={{ marginTop: "2rem", marginBottom: "2rem" }}
          />

          <div className="space-y-4">
            {subjectData.nodes.map((node, index) => {
              const Icon = getNodeIcon(node.type)
              const colorClass = getNodeColor(node.type, node.isCompleted, node.isUnlocked)
              const isExam = node.type === "exam"

              return (
                <div key={node.id} className="relative pl-16">
                  {/* Node icon */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClass} shadow-lg relative z-10 border-4 border-background transition-transform duration-300 hover:scale-110`}
                    >
                      {node.isCompleted ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : node.isUnlocked ? (
                        <Icon className="w-6 h-6" />
                      ) : (
                        <Lock className="w-6 h-6" />
                      )}
                    </div>
                  </div>

                  {/* Node card */}
                  <Card
                    className={`p-4 transition-all duration-300 ${isExam ? "border-2 border-accent bg-accent/5" : ""} ${
                      node.isUnlocked ? "hover:shadow-lg hover:scale-[1.02] cursor-pointer" : "opacity-60"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge
                            variant={node.isCompleted ? "default" : "outline"}
                            className={node.isCompleted ? "bg-accent" : ""}
                          >
                            {getNodeLabel(node.type)}
                          </Badge>
                          <h3 className="font-semibold">{node.title}</h3>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-accent" />
                            <span>{node.xp} XP</span>
                          </div>
                          {node.isCompleted && (
                            <div className="flex items-center gap-1 text-accent">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Concluído</span>
                            </div>
                          )}
                          {!node.isUnlocked && (
                            <div className="flex items-center gap-1">
                              <Lock className="w-4 h-4" />
                              <span>Bloqueado</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {node.isUnlocked && (
                        <Button
                          size="sm"
                          className={
                            node.isCompleted ? "bg-accent hover:bg-accent/90" : "bg-primary hover:bg-primary/90"
                          }
                        >
                          {node.isCompleted ? (
                            "Revisar"
                          ) : (
                            <>
                              <Play className="w-4 h-4 mr-1" />
                              {isExam ? "Fazer Prova" : "Iniciar"}
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Completion Message */}
      {subjectData.currentXP >= subjectData.requiredXP && (
        <Card className="bg-gradient-to-br from-accent/20 to-orange/20 border-accent/30 p-6 text-center">
          <div className="space-y-4">
            <div className="text-5xl">🎉</div>
            <h3 className="text-2xl font-bold">Parabéns!</h3>
            <p className="text-muted-foreground">
              Você atingiu {subjectData.requiredXP} XP e pode avançar para a próxima matéria!
            </p>
            <Button size="lg" className="bg-accent hover:bg-accent/90">
              <Trophy className="w-5 h-5 mr-2" />
              Avançar para Próxima Matéria
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}

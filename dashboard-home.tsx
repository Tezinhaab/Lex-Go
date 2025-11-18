"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, Users, Award, MessageSquare, Clock, Target, Flame } from "lucide-react"
import Link from "next/link"

export function DashboardHome() {
  return (
    <div className="pt-20 bg-white">
      {/* Hero Section */}
      <section className="min-h-[70vh] flex items-center justify-center py-20">
        <div className="max-w-[1600px] mx-auto px-6 w-full">
          <div className="space-y-8 text-center">
            <div className="space-y-3">
              <p className="text-sm font-semibold text-gray-600">🔥 7 DIAS DE SEQUÊNCIA ATIVA</p>
              <h1 className="text-6xl lg:text-7xl font-bold text-black">Bem-vindo de volta!</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Continue sua jornada de aprendizado jurídico. Desbloqueie novas matérias e ganhe mais XP.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/dashboard/courses">
                <Button className="bg-black hover:bg-gray-900 text-white h-14 px-8 text-lg">
                  Continuar Estudando
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/dashboard/juriton">
                <Button variant="outline" className="h-14 px-8 text-lg border-gray-300 hover:bg-gray-50 bg-transparent">
                  Falar com Juriton
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-t border-gray-200">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Target, label: "Progresso Geral", value: "65%", color: "bg-blue-900" },
              { icon: Clock, label: "Horas Estudadas", value: "24h", color: "bg-blue-800" },
              { icon: Award, label: "Conquistas", value: "12/120", color: "bg-gray-800" },
              { icon: Flame, label: "Sequência", value: "7 dias", color: "bg-orange-500" },
            ].map((stat, i) => (
              <Card key={i} className="bg-gray-50 border-gray-200 hover:bg-white transition-all">
                <div className="p-6 space-y-3">
                  <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                    <p className="text-3xl font-bold text-black">{stat.value}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Continue Learning Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1600px] mx-auto px-6 space-y-12">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-bold text-black mb-2">Continue de onde parou</h2>
              <p className="text-gray-600 text-lg">Seus cursos em andamento</p>
            </div>
            <Link href="/dashboard/courses">
              <Button variant="ghost" className="text-black hover:bg-gray-200">
                Ver todos
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Direito Constitucional", progress: 65, lessons: 18, nextLesson: "Princípios Fundamentais" },
              { title: "Direito Civil", progress: 30, lessons: 24, nextLesson: "Pessoas e Capacidade" },
              { title: "Direito Penal", progress: 0, lessons: 20, nextLesson: "Introdução ao Direito Penal" },
            ].map((course, i) => (
              <Card key={i} className="bg-white border-gray-200 hover:shadow-lg transition-all group">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 rounded-t-lg overflow-hidden">
                  <div
                    className="h-full bg-black transition-all duration-500"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-black">{course.title}</h3>
                    <p className="text-gray-600 text-sm">{course.lessons} lições</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Progresso</span>
                      <span className="text-black font-semibold">{course.progress}%</span>
                    </div>
                    <p className="text-gray-700 text-sm">Próximo: {course.nextLesson}</p>
                  </div>
                  <Button className="w-full bg-black hover:bg-gray-900 text-white font-semibold">Continuar</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* New Features Section */}
      <section className="py-20 border-t border-gray-200">
        <div className="max-w-[1600px] mx-auto px-6 space-y-12">
          <div className="text-center space-y-4">
            <p className="text-sm font-semibold text-gray-600">NOVIDADES</p>
            <h2 className="text-4xl font-bold text-black">O que há de novo</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: MessageSquare,
                title: "Juriton IA Melhorado",
                description: "Nosso assistente agora pode criar minutas e analisar documentos com mais precisão",
              },
              {
                icon: Users,
                title: "Consultoria Online",
                description: "Conecte-se com advogados especializados por videochamada a qualquer momento",
              },
              {
                icon: TrendingUp,
                title: "Sistema de Conquistas",
                description: "Mais de 120 conquistas para desbloquear e ganhar pontos para trocar na lojinha",
              },
            ].map((feature, i) => (
              <Card key={i} className="bg-gray-50 border-gray-200 hover:shadow-lg transition-all">
                <div className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-black mb-2">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Trending Section */}
      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-[1600px] mx-auto px-6 space-y-12">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-bold text-black mb-2">Em alta na comunidade</h2>
              <p className="text-gray-600 text-lg">Assuntos mais discutidos nas últimas 24h</p>
            </div>
            <Link href="/dashboard/comunidade">
              <Button variant="ghost" className="text-black hover:bg-gray-200">
                Ver comunidade
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { topic: "Reforma Trabalhista", mentions: 1547, trend: "+24%" },
              { topic: "STF Decisões", mentions: 1203, trend: "+18%" },
              { topic: "Direito Digital", mentions: 891, trend: "+45%" },
              { topic: "Lei de Licitações", mentions: 634, trend: "+12%" },
            ].map((item, i) => (
              <Card key={i} className="bg-white border-gray-200 hover:shadow-lg transition-all">
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-black">#{i + 1}</span>
                    <span className="text-sm font-semibold text-green-600">{item.trend}</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-black mb-1">{item.topic}</h4>
                    <p className="text-gray-600 text-sm">{item.mentions.toLocaleString()} menções</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

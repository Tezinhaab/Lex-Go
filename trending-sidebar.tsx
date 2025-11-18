"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, BookOpen, Hash } from "lucide-react"
import { useState } from "react"

interface TrendingTopic {
  word: string
  count: number
  hours: number
}

export function TrendingSidebar() {
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([
    { word: "Constitucional", count: 342, hours: 24 },
    { word: "STF", count: 289, hours: 24 },
    { word: "Jurisprudência", count: 256, hours: 24 },
    { word: "DadosPessoais", count: 198, hours: 24 },
    { word: "CódigoCivil", count: 167, hours: 24 },
    { word: "DireitoTrabalhista", count: 134, hours: 24 },
    { word: "OAB", count: 89, hours: 24 },
  ])

  const activeUsers = [
    { name: "Dra. Maria Costa", specialty: "Direito Civil", avatar: "/lawyer-in-courtroom.png" },
    { name: "Dr. João Santos", specialty: "Direito Penal", avatar: "/lawyer-in-courtroom.png" },
    { name: "Dra. Paula Souza", specialty: "Direito Trabalhista", avatar: "/lawyer-in-courtroom.png" },
  ]

  return (
    <div className="space-y-4 sticky top-20">
      <Card className="p-4 border-2 border-border">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-accent" />
          <h3 className="font-bold text-lg">Assuntos em Alta</h3>
        </div>
        <p className="text-xs text-muted-foreground mb-4">Palavras mais comentadas nas últimas 24h</p>

        <div className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <div key={topic.word} className="p-3 hover:bg-accent/5 rounded-lg cursor-pointer transition-colors group">
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-muted-foreground/50">#{index + 1}</span>
                  <div>
                    <div className="flex items-center gap-1">
                      <Hash className="w-4 h-4 text-primary" />
                      <span className="font-semibold text-primary group-hover:text-accent transition-colors">
                        {topic.word}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {topic.count} menções · últimas {topic.hours}h
                    </span>
                  </div>
                </div>
                {index === 0 && (
                  <Badge variant="destructive" className="text-xs">
                    🔥
                  </Badge>
                )}
                {index === 1 && <Badge className="bg-accent text-white text-xs">⚡</Badge>}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Usuários Ativos */}
      <Card className="p-4 border-2 border-border">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-accent" />
          <h3 className="font-bold text-lg">Especialistas Ativos</h3>
        </div>

        <div className="space-y-3">
          {activeUsers.map((user) => (
            <div
              key={user.name}
              className="flex items-center gap-3 p-2 hover:bg-accent/5 rounded-lg cursor-pointer transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold border-2 border-accent/20">
                {user.name[4]}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Sugestões de Estudo */}
      <Card className="p-4 border-2 border-border bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-5 h-5 text-accent" />
          <h3 className="font-bold text-base">Continue Aprendendo</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          Complete mais 2 lições de Direito Constitucional para desbloquear o próximo nível!
        </p>
        <div className="w-full bg-border rounded-full h-2">
          <div className="bg-accent h-2 rounded-full" style={{ width: "65%" }}></div>
        </div>
        <p className="text-xs text-accent font-semibold mt-2">65% completo</p>
      </Card>
    </div>
  )
}

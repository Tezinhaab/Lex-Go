"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { gamificationService, type RankingUser, type DailyChallenge } from "@/lib/gamification"
import { authService } from "@/lib/auth"
import { Trophy, Flame, Star, Crown, Medal, Award, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"

export default function RankingPage() {
  const [leaderboard, setLeaderboard] = useState<RankingUser[]>([])
  const [dailyChallenges, setDailyChallenges] = useState<DailyChallenge[]>([])
  const [user, setUser] = useState(authService.getCurrentUser())

  useEffect(() => {
    if (user) {
      gamificationService.updateStreak(user.id)
      setLeaderboard(gamificationService.getLeaderboard())
      setDailyChallenges(gamificationService.getDailyChallenges(user.id))
      setUser(authService.getCurrentUser())
    }
  }, [])

  const currentUserRank = leaderboard.find((u) => u.id === user?.id)

  return (
    <div className="min-h-screen bg-black">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-white mb-2">Ranking e Desafios</h1>
          <p className="text-gray-400">Compete com outros estudantes e complete desafios diários</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-yellow-900/20 to-yellow-950/20 border-yellow-800">
            <div className="flex items-center gap-4 mb-4">
              <Trophy className="w-10 h-10 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-400">Sua Posição</p>
                <p className="text-3xl font-black text-white">#{currentUserRank?.rank || "-"}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-orange-900/20 to-orange-950/20 border-orange-800">
            <div className="flex items-center gap-4 mb-4">
              <Flame className="w-10 h-10 text-orange-500" />
              <div>
                <p className="text-sm text-gray-400">Sequência</p>
                <p className="text-3xl font-black text-white">{user?.streak || 0} dias</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-900/20 to-blue-950/20 border-blue-800">
            <div className="flex items-center gap-4 mb-4">
              <Star className="w-10 h-10 text-blue-500" />
              <div>
                <p className="text-sm text-gray-400">Total XP</p>
                <p className="text-3xl font-black text-white">{user?.xp || 0}</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-black text-white mb-4 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              Ranking Global
            </h2>

            <div className="space-y-3">
              {leaderboard.slice(0, 10).map((rankUser) => {
                const isCurrentUser = rankUser.id === user?.id

                return (
                  <Card
                    key={rankUser.id}
                    className={`p-4 border-2 transition-all ${
                      isCurrentUser ? "border-yellow-800 bg-yellow-950/20" : "border-zinc-800 bg-zinc-950"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        {rankUser.rank <= 3 && (
                          <div className="absolute -top-2 -right-2 z-10">
                            {rankUser.rank === 1 && <Crown className="w-6 h-6 text-yellow-500" />}
                            {rankUser.rank === 2 && <Medal className="w-6 h-6 text-gray-400" />}
                            {rankUser.rank === 3 && <Medal className="w-6 h-6 text-orange-600" />}
                          </div>
                        )}
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg ${
                            rankUser.rank === 1
                              ? "bg-gradient-to-br from-yellow-500 to-yellow-600"
                              : rankUser.rank === 2
                                ? "bg-gradient-to-br from-gray-400 to-gray-500"
                                : rankUser.rank === 3
                                  ? "bg-gradient-to-br from-orange-600 to-orange-700"
                                  : "bg-zinc-800"
                          }`}
                        >
                          {rankUser.rank}
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-bold text-white">{rankUser.name}</p>
                          {isCurrentUser && <Badge className="bg-yellow-600">Você</Badge>}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span>Level {rankUser.level}</span>
                          <span className="flex items-center gap-1">
                            <Flame className="w-4 h-4 text-orange-500" />
                            {rankUser.streak} dias
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-xl font-black text-yellow-500">{rankUser.xp.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">XP</p>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black text-white mb-4 flex items-center gap-2">
              <Award className="w-6 h-6 text-blue-500" />
              Desafios Diários
            </h2>

            <div className="space-y-3">
              {dailyChallenges.map((challenge) => (
                <Card
                  key={challenge.id}
                  className={`p-4 border-2 ${
                    challenge.isCompleted ? "border-green-800 bg-green-950/20" : "border-zinc-800 bg-zinc-950"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        challenge.isCompleted ? "bg-green-600" : "bg-zinc-800"
                      }`}
                    >
                      {challenge.isCompleted ? (
                        <Check className="w-5 h-5 text-white" />
                      ) : (
                        <Star className="w-5 h-5 text-gray-500" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-white">{challenge.title}</h3>
                        <Badge variant={challenge.isCompleted ? "default" : "secondary"}>
                          +{challenge.xpReward} XP
                        </Badge>
                      </div>

                      <p className="text-sm text-gray-400 mb-3">{challenge.description}</p>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Progresso</span>
                          <span>
                            {challenge.progress}/{challenge.maxProgress}
                          </span>
                        </div>
                        <Progress value={(challenge.progress / challenge.maxProgress) * 100} className="h-2" />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="mt-6 p-6 bg-gradient-to-br from-blue-900/20 to-blue-950/20 border-blue-800">
              <div className="flex items-start gap-4">
                <Image src="/mascot.png" alt="Juriton" width={60} height={60} />
                <div>
                  <h3 className="font-bold text-white mb-2">Dica do Juriton</h3>
                  <p className="text-sm text-gray-300">
                    Complete seus desafios diários para manter sua sequência ativa e subir no ranking! Estudantes
                    consistentes aprendem mais rápido.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

"use client"

export interface RankingUser {
  id: string
  name: string
  avatar?: string
  xp: number
  level: number
  streak: number
  rank: number
}

export interface DailyChallenge {
  id: string
  title: string
  description: string
  xpReward: number
  isCompleted: boolean
  progress: number
  maxProgress: number
}

export const gamificationService = {
  // Calcular nível baseado no XP
  calculateLevel: (xp: number): number => {
    return Math.floor(xp / 1000) + 1
  },

  // XP necessário para próximo nível
  xpForNextLevel: (currentXP: number): number => {
    const currentLevel = gamificationService.calculateLevel(currentXP)
    return currentLevel * 1000 - currentXP
  },

  // Obter ranking global
  getLeaderboard: (): RankingUser[] => {
    if (typeof window === "undefined") return []

    // Simula dados de outros usuários
    const mockUsers: RankingUser[] = [
      { id: "1", name: "Ana Silva", xp: 15420, level: 16, streak: 45, rank: 1 },
      { id: "2", name: "Carlos Mendes", xp: 13890, level: 14, streak: 32, rank: 2 },
      { id: "3", name: "Beatriz Costa", xp: 12350, level: 13, streak: 28, rank: 3 },
      { id: "4", name: "Diego Santos", xp: 10980, level: 11, streak: 21, rank: 4 },
      { id: "5", name: "Fernanda Lima", xp: 9560, level: 10, streak: 15, rank: 5 },
      { id: "6", name: "Gabriel Rocha", xp: 8740, level: 9, streak: 19, rank: 6 },
      { id: "7", name: "Helena Oliveira", xp: 7920, level: 8, streak: 12, rank: 7 },
      { id: "8", name: "Igor Pereira", xp: 6890, level: 7, streak: 9, rank: 8 },
      { id: "9", name: "Julia Fernandes", xp: 5670, level: 6, streak: 7, rank: 9 },
      { id: "10", name: "Lucas Almeida", xp: 4520, level: 5, streak: 5, rank: 10 },
    ]

    // Adicionar usuário atual
    const { authService } = require("./auth")
    const currentUser = authService.getCurrentUser()

    if (currentUser) {
      mockUsers.push({
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar,
        xp: currentUser.xp,
        level: gamificationService.calculateLevel(currentUser.xp),
        streak: currentUser.streak,
        rank: 11,
      })
    }

    // Ordenar por XP
    return mockUsers
      .sort((a, b) => b.xp - a.xp)
      .map((user, index) => ({
        ...user,
        rank: index + 1,
      }))
  },

  // Obter desafios diários
  getDailyChallenges: (userId: string): DailyChallenge[] => {
    if (typeof window === "undefined") return []

    const challengesStr = localStorage.getItem(`lexgo_daily_challenges_${userId}`)
    if (challengesStr) {
      const challenges = JSON.parse(challengesStr)
      // Verificar se é do dia atual
      const today = new Date().toDateString()
      if (challenges.date === today) {
        return challenges.data
      }
    }

    // Gerar novos desafios para o dia
    const newChallenges: DailyChallenge[] = [
      {
        id: "daily_1",
        title: "Completar 3 Lições",
        description: "Conclua 3 lições em qualquer curso",
        xpReward: 100,
        isCompleted: false,
        progress: 0,
        maxProgress: 3,
      },
      {
        id: "daily_2",
        title: "Acertar 10 Questões",
        description: "Responda corretamente 10 questões em quiz",
        xpReward: 150,
        isCompleted: false,
        progress: 0,
        maxProgress: 10,
      },
      {
        id: "daily_3",
        title: "Publicar na Comunidade",
        description: "Faça uma publicação ou comentário na comunidade",
        xpReward: 50,
        isCompleted: false,
        progress: 0,
        maxProgress: 1,
      },
      {
        id: "daily_4",
        title: "Estudar 30 Minutos",
        description: "Passe pelo menos 30 minutos estudando",
        xpReward: 80,
        isCompleted: false,
        progress: 0,
        maxProgress: 30,
      },
    ]

    localStorage.setItem(
      `lexgo_daily_challenges_${userId}`,
      JSON.stringify({
        date: new Date().toDateString(),
        data: newChallenges,
      }),
    )

    return newChallenges
  },

  // Atualizar progresso do desafio
  updateChallengeProgress: (userId: string, challengeId: string, progress: number) => {
    const challenges = gamificationService.getDailyChallenges(userId)
    const challenge = challenges.find((c) => c.id === challengeId)

    if (challenge) {
      challenge.progress = Math.min(progress, challenge.maxProgress)
      challenge.isCompleted = challenge.progress >= challenge.maxProgress

      // Se completou, dar XP
      if (challenge.isCompleted && progress === challenge.maxProgress) {
        const { authService } = require("./auth")
        const user = authService.getCurrentUser()
        if (user) {
          authService.updateUser({ xp: user.xp + challenge.xpReward })
        }
      }

      localStorage.setItem(
        `lexgo_daily_challenges_${userId}`,
        JSON.stringify({
          date: new Date().toDateString(),
          data: challenges,
        }),
      )
    }
  },

  // Atualizar streak
  updateStreak: (userId: string) => {
    const lastVisit = localStorage.getItem(`lexgo_last_visit_${userId}`)
    const today = new Date().toDateString()

    const { authService } = require("./auth")
    const user = authService.getCurrentUser()
    if (!user) return

    if (lastVisit !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString()

      if (lastVisit === yesterday) {
        // Continua o streak
        authService.updateUser({ streak: user.streak + 1 })
      } else {
        // Perdeu o streak
        authService.updateUser({ streak: 1 })
      }

      localStorage.setItem(`lexgo_last_visit_${userId}`, today)
    }
  },
}

"use client"

import { useState } from "react"
import {
  Trophy,
  Lock,
  BookOpen,
  Users,
  Flame,
  Star,
  Award,
  Target,
  Zap,
  Heart,
  MessageCircle,
  Share2,
  Clock,
  CheckCircle,
  GraduationCap,
  Calendar,
  TrendingUp,
  Gift,
  Crown,
  Sparkles,
  User,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type Achievement = {
  id: string
  name: string
  description: string
  points: number
  icon: any
  unlocked: boolean
  progress?: number
  maxProgress?: number
  category: "study" | "community" | "engagement" | "special"
  rarity: "common" | "rare" | "epic" | "legendary"
}

const achievements: Achievement[] = [
  // Study Achievements (30)
  {
    id: "first-lesson",
    name: "Primeira Lição",
    description: "Complete sua primeira lição",
    points: 10,
    icon: BookOpen,
    unlocked: true,
    category: "study",
    rarity: "common",
  },
  {
    id: "lesson-master",
    name: "Mestre das Lições",
    description: "Complete 10 lições",
    points: 50,
    icon: BookOpen,
    unlocked: true,
    progress: 10,
    maxProgress: 10,
    category: "study",
    rarity: "common",
  },
  {
    id: "lesson-expert",
    name: "Expert em Lições",
    description: "Complete 50 lições",
    points: 200,
    icon: GraduationCap,
    unlocked: false,
    progress: 24,
    maxProgress: 50,
    category: "study",
    rarity: "rare",
  },
  {
    id: "lesson-legend",
    name: "Lenda das Lições",
    description: "Complete 100 lições",
    points: 500,
    icon: Crown,
    unlocked: false,
    progress: 24,
    maxProgress: 100,
    category: "study",
    rarity: "epic",
  },
  {
    id: "first-quiz",
    name: "Primeiro Quiz",
    description: "Complete seu primeiro quiz",
    points: 15,
    icon: Target,
    unlocked: true,
    category: "study",
    rarity: "common",
  },
  {
    id: "quiz-master",
    name: "Mestre dos Quiz",
    description: "Complete 25 quiz com 100% de acerto",
    points: 250,
    icon: Star,
    unlocked: false,
    progress: 8,
    maxProgress: 25,
    category: "study",
    rarity: "rare",
  },
  {
    id: "perfect-score",
    name: "Nota Perfeita",
    description: "Tire 10 em uma prova",
    points: 100,
    icon: Award,
    unlocked: true,
    category: "study",
    rarity: "rare",
  },
  {
    id: "first-course",
    name: "Primeiro Curso",
    description: "Complete seu primeiro curso",
    points: 100,
    icon: GraduationCap,
    unlocked: false,
    progress: 60,
    maxProgress: 100,
    category: "study",
    rarity: "common",
  },
  {
    id: "course-collector",
    name: "Colecionador de Cursos",
    description: "Complete 5 cursos",
    points: 500,
    icon: Trophy,
    unlocked: false,
    progress: 0,
    maxProgress: 5,
    category: "study",
    rarity: "epic",
  },
  {
    id: "law-scholar",
    name: "Estudioso do Direito",
    description: "Complete 10 cursos",
    points: 1000,
    icon: Crown,
    unlocked: false,
    progress: 0,
    maxProgress: 10,
    category: "study",
    rarity: "legendary",
  },
  {
    id: "terms-beginner",
    name: "Aprendiz de Termos",
    description: "Aprenda 50 termos jurídicos",
    points: 50,
    icon: BookOpen,
    unlocked: true,
    progress: 50,
    maxProgress: 50,
    category: "study",
    rarity: "common",
  },
  {
    id: "terms-master",
    name: "Mestre dos Termos",
    description: "Aprenda 200 termos jurídicos",
    points: 200,
    icon: Star,
    unlocked: false,
    progress: 50,
    maxProgress: 200,
    category: "study",
    rarity: "rare",
  },
  {
    id: "jurisprudence-reader",
    name: "Leitor de Jurisprudência",
    description: "Leia 10 jurisprudências",
    points: 80,
    icon: BookOpen,
    unlocked: true,
    progress: 10,
    maxProgress: 10,
    category: "study",
    rarity: "common",
  },
  {
    id: "jurisprudence-expert",
    name: "Expert em Jurisprudência",
    description: "Leia 50 jurisprudências",
    points: 300,
    icon: Award,
    unlocked: false,
    progress: 10,
    maxProgress: 50,
    category: "study",
    rarity: "epic",
  },
  {
    id: "hearing-observer",
    name: "Observador de Audiências",
    description: "Assista 5 audiências",
    points: 100,
    icon: Users,
    unlocked: false,
    progress: 2,
    maxProgress: 5,
    category: "study",
    rarity: "common",
  },
  {
    id: "fast-learner",
    name: "Aprendizado Rápido",
    description: "Complete uma lição em menos de 5 minutos",
    points: 50,
    icon: Zap,
    unlocked: true,
    category: "study",
    rarity: "rare",
  },
  {
    id: "night-owl",
    name: "Coruja Noturna",
    description: "Estude após 22h",
    points: 30,
    icon: Clock,
    unlocked: true,
    category: "study",
    rarity: "common",
  },
  {
    id: "early-bird",
    name: "Madrugador",
    description: "Estude antes das 6h",
    points: 30,
    icon: Clock,
    unlocked: false,
    category: "study",
    rarity: "common",
  },
  {
    id: "weekend-warrior",
    name: "Guerreiro de Fim de Semana",
    description: "Estude no fim de semana",
    points: 40,
    icon: Calendar,
    unlocked: true,
    category: "study",
    rarity: "common",
  },
  {
    id: "subject-complete-civil",
    name: "Direito Civil Completo",
    description: "Complete todas as matérias de Direito Civil",
    points: 300,
    icon: CheckCircle,
    unlocked: false,
    progress: 3,
    maxProgress: 8,
    category: "study",
    rarity: "epic",
  },
  {
    id: "subject-complete-penal",
    name: "Direito Penal Completo",
    description: "Complete todas as matérias de Direito Penal",
    points: 300,
    icon: CheckCircle,
    unlocked: false,
    progress: 0,
    maxProgress: 6,
    category: "study",
    rarity: "epic",
  },
  {
    id: "subject-complete-work",
    name: "Direito do Trabalho Completo",
    description: "Complete todas as matérias de Direito do Trabalho",
    points: 300,
    icon: CheckCircle,
    unlocked: false,
    progress: 0,
    maxProgress: 7,
    category: "study",
    rarity: "epic",
  },
  {
    id: "practice-makes-perfect",
    name: "A Prática Leva à Perfeição",
    description: "Refaça uma lição 3 vezes",
    points: 60,
    icon: Target,
    unlocked: false,
    progress: 1,
    maxProgress: 3,
    category: "study",
    rarity: "common",
  },
  {
    id: "error-learner",
    name: "Aprendendo com Erros",
    description: "Revise 10 questões erradas",
    points: 70,
    icon: BookOpen,
    unlocked: false,
    progress: 4,
    maxProgress: 10,
    category: "study",
    rarity: "common",
  },
  {
    id: "speed-reader",
    name: "Leitor Veloz",
    description: "Leia 50 artigos jurídicos",
    points: 150,
    icon: Zap,
    unlocked: false,
    progress: 12,
    maxProgress: 50,
    category: "study",
    rarity: "rare",
  },
  {
    id: "constitution-master",
    name: "Mestre da Constituição",
    description: "Complete o curso de Direito Constitucional com 100%",
    points: 400,
    icon: Crown,
    unlocked: false,
    category: "study",
    rarity: "epic",
  },
  {
    id: "study-marathon",
    name: "Maratona de Estudos",
    description: "Estude por 4 horas seguidas",
    points: 200,
    icon: Flame,
    unlocked: false,
    category: "study",
    rarity: "rare",
  },
  {
    id: "focused-student",
    name: "Estudante Focado",
    description: "Complete 10 lições sem pausar",
    points: 120,
    icon: Target,
    unlocked: false,
    progress: 3,
    maxProgress: 10,
    category: "study",
    rarity: "rare",
  },
  {
    id: "diverse-learner",
    name: "Aprendiz Diverso",
    description: "Estude em 5 áreas diferentes do direito",
    points: 180,
    icon: Star,
    unlocked: true,
    progress: 5,
    maxProgress: 5,
    category: "study",
    rarity: "rare",
  },
  {
    id: "comeback-king",
    name: "Rei do Retorno",
    description: "Volte a estudar após 30 dias de ausência",
    points: 100,
    icon: TrendingUp,
    unlocked: false,
    category: "study",
    rarity: "rare",
  },

  // Community Achievements (30)
  {
    id: "first-post",
    name: "Primeira Publicação",
    description: "Faça sua primeira publicação na comunidade",
    points: 15,
    icon: MessageCircle,
    unlocked: true,
    category: "community",
    rarity: "common",
  },
  {
    id: "community-voice",
    name: "Voz da Comunidade",
    description: "Faça 50 publicações",
    points: 150,
    icon: MessageCircle,
    unlocked: false,
    progress: 12,
    maxProgress: 50,
    category: "community",
    rarity: "rare",
  },
  {
    id: "community-leader",
    name: "Líder Comunitário",
    description: "Faça 100 publicações",
    points: 400,
    icon: Crown,
    unlocked: false,
    progress: 12,
    maxProgress: 100,
    category: "community",
    rarity: "epic",
  },
  {
    id: "first-comment",
    name: "Primeiro Comentário",
    description: "Comente em uma publicação",
    points: 10,
    icon: MessageCircle,
    unlocked: true,
    category: "community",
    rarity: "common",
  },
  {
    id: "comment-master",
    name: "Mestre dos Comentários",
    description: "Faça 100 comentários",
    points: 120,
    icon: Users,
    unlocked: false,
    progress: 35,
    maxProgress: 100,
    category: "community",
    rarity: "rare",
  },
  {
    id: "helpful-member",
    name: "Membro Prestativo",
    description: "Receba 50 curtidas em seus comentários",
    points: 100,
    icon: Heart,
    unlocked: false,
    progress: 18,
    maxProgress: 50,
    category: "community",
    rarity: "rare",
  },
  {
    id: "first-like",
    name: "Primeira Curtida",
    description: "Curta uma publicação",
    points: 5,
    icon: Heart,
    unlocked: true,
    category: "community",
    rarity: "common",
  },
  {
    id: "supporter",
    name: "Apoiador",
    description: "Curta 100 publicações",
    points: 80,
    icon: Heart,
    unlocked: false,
    progress: 56,
    maxProgress: 100,
    category: "community",
    rarity: "common",
  },
  {
    id: "viral-post",
    name: "Post Viral",
    description: "Receba 100 curtidas em uma publicação",
    points: 250,
    icon: TrendingUp,
    unlocked: false,
    category: "community",
    rarity: "epic",
  },
  {
    id: "influencer",
    name: "Influenciador",
    description: "Receba 500 curtidas no total",
    points: 400,
    icon: Star,
    unlocked: false,
    progress: 142,
    maxProgress: 500,
    category: "community",
    rarity: "epic",
  },
  {
    id: "first-share",
    name: "Primeiro Compartilhamento",
    description: "Compartilhe uma publicação",
    points: 10,
    icon: Share2,
    unlocked: true,
    category: "community",
    rarity: "common",
  },
  {
    id: "sharer",
    name: "Compartilhador",
    description: "Compartilhe 50 publicações",
    points: 100,
    icon: Share2,
    unlocked: false,
    progress: 8,
    maxProgress: 50,
    category: "community",
    rarity: "common",
  },
  {
    id: "news-debater",
    name: "Debatedor de Notícias",
    description: "Comente em 10 notícias do Varal Juriton",
    points: 80,
    icon: MessageCircle,
    unlocked: false,
    progress: 3,
    maxProgress: 10,
    category: "community",
    rarity: "common",
  },
  {
    id: "news-expert",
    name: "Expert em Notícias",
    description: "Comente em 50 notícias do Varal Juriton",
    points: 200,
    icon: Award,
    unlocked: false,
    progress: 3,
    maxProgress: 50,
    category: "community",
    rarity: "rare",
  },
  {
    id: "trending-creator",
    name: "Criador de Tendências",
    description: "Crie um post com hashtag que vire trending",
    points: 300,
    icon: TrendingUp,
    unlocked: false,
    category: "community",
    rarity: "epic",
  },
  {
    id: "discussion-starter",
    name: "Iniciador de Discussões",
    description: "Inicie 20 discussões com mais de 10 comentários",
    points: 250,
    icon: Users,
    unlocked: false,
    progress: 2,
    maxProgress: 20,
    category: "community",
    rarity: "epic",
  },
  {
    id: "helpful-answer",
    name: "Resposta Útil",
    description: "Tenha um comentário marcado como útil",
    points: 50,
    icon: CheckCircle,
    unlocked: false,
    category: "community",
    rarity: "common",
  },
  {
    id: "expert-advisor",
    name: "Conselheiro Expert",
    description: "Tenha 25 comentários marcados como úteis",
    points: 300,
    icon: Star,
    unlocked: false,
    progress: 0,
    maxProgress: 25,
    category: "community",
    rarity: "epic",
  },
  {
    id: "community-welcomer",
    name: "Anfitrião da Comunidade",
    description: "Seja o primeiro a comentar em 10 posts de novos usuários",
    points: 120,
    icon: Heart,
    unlocked: false,
    progress: 1,
    maxProgress: 10,
    category: "community",
    rarity: "rare",
  },
  {
    id: "night-chatter",
    name: "Conversador Noturno",
    description: "Faça 20 publicações após 22h",
    points: 60,
    icon: Clock,
    unlocked: false,
    progress: 7,
    maxProgress: 20,
    category: "community",
    rarity: "common",
  },
  {
    id: "weekend-social",
    name: "Social de Fim de Semana",
    description: "Participe da comunidade por 10 fins de semana",
    points: 100,
    icon: Calendar,
    unlocked: false,
    progress: 3,
    maxProgress: 10,
    category: "community",
    rarity: "rare",
  },
  {
    id: "follower-magnet",
    name: "Ímã de Seguidores",
    description: "Tenha 50 seguidores",
    points: 200,
    icon: Users,
    unlocked: false,
    progress: 12,
    maxProgress: 50,
    category: "community",
    rarity: "rare",
  },
  {
    id: "celebrity",
    name: "Celebridade",
    description: "Tenha 200 seguidores",
    points: 500,
    icon: Crown,
    unlocked: false,
    progress: 12,
    maxProgress: 200,
    category: "community",
    rarity: "legendary",
  },
  {
    id: "conversation-master",
    name: "Mestre das Conversas",
    description: "Participe de 50 threads diferentes",
    points: 150,
    icon: MessageCircle,
    unlocked: false,
    progress: 18,
    maxProgress: 50,
    category: "community",
    rarity: "rare",
  },
  {
    id: "emoji-lover",
    name: "Amante de Emojis",
    description: "Use emojis em 30 publicações",
    points: 40,
    icon: Heart,
    unlocked: false,
    progress: 15,
    maxProgress: 30,
    category: "community",
    rarity: "common",
  },
  {
    id: "long-form-writer",
    name: "Escritor de Longo Formato",
    description: "Escreva 10 posts com mais de 500 caracteres",
    points: 100,
    icon: MessageCircle,
    unlocked: false,
    progress: 2,
    maxProgress: 10,
    category: "community",
    rarity: "rare",
  },
  {
    id: "daily-greeter",
    name: "Cumprimentador Diário",
    description: "Seja ativo na comunidade por 7 dias seguidos",
    points: 150,
    icon: Calendar,
    unlocked: false,
    progress: 3,
    maxProgress: 7,
    category: "community",
    rarity: "rare",
  },
  {
    id: "poll-creator",
    name: "Criador de Enquetes",
    description: "Crie 5 enquetes na comunidade",
    points: 80,
    icon: Target,
    unlocked: false,
    progress: 0,
    maxProgress: 5,
    category: "community",
    rarity: "common",
  },
  {
    id: "debate-champion",
    name: "Campeão de Debates",
    description: "Participe de 20 debates com mais de 50 respostas",
    points: 250,
    icon: Trophy,
    unlocked: false,
    progress: 1,
    maxProgress: 20,
    category: "community",
    rarity: "epic",
  },
  {
    id: "mentor",
    name: "Mentor",
    description: "Ajude 10 novos usuários com dúvidas",
    points: 300,
    icon: Star,
    unlocked: false,
    progress: 2,
    maxProgress: 10,
    category: "community",
    rarity: "epic",
  },

  // Engagement Achievements (30)
  {
    id: "first-day",
    name: "Primeiro Dia",
    description: "Complete seu primeiro dia no LEX GO",
    points: 5,
    icon: Calendar,
    unlocked: true,
    category: "engagement",
    rarity: "common",
  },
  {
    id: "week-warrior",
    name: "Guerreiro Semanal",
    description: "Acesse 7 dias seguidos",
    points: 70,
    icon: Flame,
    unlocked: true,
    progress: 7,
    maxProgress: 7,
    category: "engagement",
    rarity: "common",
  },
  {
    id: "month-master",
    name: "Mestre Mensal",
    description: "Acesse 30 dias seguidos",
    points: 300,
    icon: Flame,
    unlocked: false,
    progress: 7,
    maxProgress: 30,
    category: "engagement",
    rarity: "epic",
  },
  {
    id: "year-legend",
    name: "Lenda Anual",
    description: "Acesse 365 dias seguidos",
    points: 2000,
    icon: Crown,
    unlocked: false,
    progress: 7,
    maxProgress: 365,
    category: "engagement",
    rarity: "legendary",
  },
  {
    id: "hour-1",
    name: "1 Hora de Estudo",
    description: "Estude por 1 hora",
    points: 20,
    icon: Clock,
    unlocked: true,
    category: "engagement",
    rarity: "common",
  },
  {
    id: "hour-10",
    name: "10 Horas de Estudo",
    description: "Estude por 10 horas no total",
    points: 100,
    icon: Clock,
    unlocked: true,
    progress: 10,
    maxProgress: 10,
    category: "engagement",
    rarity: "common",
  },
  {
    id: "hour-50",
    name: "50 Horas de Estudo",
    description: "Estude por 50 horas no total",
    points: 400,
    icon: Star,
    unlocked: false,
    progress: 10,
    maxProgress: 50,
    category: "engagement",
    rarity: "rare",
  },
  {
    id: "hour-100",
    name: "100 Horas de Estudo",
    description: "Estude por 100 horas no total",
    points: 800,
    icon: Trophy,
    unlocked: false,
    progress: 10,
    maxProgress: 100,
    category: "engagement",
    rarity: "epic",
  },
  {
    id: "hour-500",
    name: "500 Horas de Estudo",
    description: "Estude por 500 horas no total",
    points: 2500,
    icon: Crown,
    unlocked: false,
    progress: 10,
    maxProgress: 500,
    category: "engagement",
    rarity: "legendary",
  },
  {
    id: "xp-100",
    name: "100 XP",
    description: "Alcance 100 XP",
    points: 10,
    icon: Sparkles,
    unlocked: true,
    category: "engagement",
    rarity: "common",
  },
  {
    id: "xp-1000",
    name: "1000 XP",
    description: "Alcance 1000 XP",
    points: 100,
    icon: Sparkles,
    unlocked: false,
    progress: 150,
    maxProgress: 1000,
    category: "engagement",
    rarity: "rare",
  },
  {
    id: "xp-5000",
    name: "5000 XP",
    description: "Alcance 5000 XP",
    points: 500,
    icon: Star,
    unlocked: false,
    progress: 150,
    maxProgress: 5000,
    category: "engagement",
    rarity: "epic",
  },
  {
    id: "xp-10000",
    name: "10000 XP",
    description: "Alcance 10000 XP",
    points: 1000,
    icon: Crown,
    unlocked: false,
    progress: 150,
    maxProgress: 10000,
    category: "engagement",
    rarity: "legendary",
  },
  {
    id: "profile-complete",
    name: "Perfil Completo",
    description: "Complete 100% do seu perfil",
    points: 50,
    icon: User,
    unlocked: false,
    progress: 60,
    maxProgress: 100,
    category: "engagement",
    rarity: "common",
  },
  {
    id: "photo-upload",
    name: "Foto de Perfil",
    description: "Adicione uma foto de perfil",
    points: 20,
    icon: User,
    unlocked: false,
    category: "engagement",
    rarity: "common",
  },
  {
    id: "bio-writer",
    name: "Escritor de Bio",
    description: "Escreva uma bio com mais de 100 caracteres",
    points: 30,
    icon: MessageCircle,
    unlocked: false,
    category: "engagement",
    rarity: "common",
  },
  {
    id: "early-adopter",
    name: "Adotante Inicial",
    description: "Seja um dos primeiros 1000 usuários",
    points: 500,
    icon: Star,
    unlocked: true,
    category: "engagement",
    rarity: "legendary",
  },
  {
    id: "referral-friend",
    name: "Amigo Indicador",
    description: "Indique 1 amigo",
    points: 50,
    icon: Users,
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    category: "engagement",
    rarity: "common",
  },
  {
    id: "referral-master",
    name: "Mestre das Indicações",
    description: "Indique 10 amigos",
    points: 500,
    icon: Users,
    unlocked: false,
    progress: 0,
    maxProgress: 10,
    category: "engagement",
    rarity: "epic",
  },
  {
    id: "feature-explorer",
    name: "Explorador de Recursos",
    description: "Use todas as funcionalidades do app",
    points: 200,
    icon: Sparkles,
    unlocked: false,
    progress: 3,
    maxProgress: 5,
    category: "engagement",
    rarity: "rare",
  },
  {
    id: "feedback-giver",
    name: "Fornecedor de Feedback",
    description: "Envie 5 feedbacks ou sugestões",
    points: 150,
    icon: MessageCircle,
    unlocked: false,
    progress: 0,
    maxProgress: 5,
    category: "engagement",
    rarity: "rare",
  },
  {
    id: "bug-hunter",
    name: "Caçador de Bugs",
    description: "Reporte 3 bugs",
    points: 200,
    icon: Target,
    unlocked: false,
    progress: 0,
    maxProgress: 3,
    category: "engagement",
    rarity: "rare",
  },
  {
    id: "app-reviewer",
    name: "Avaliador do App",
    description: "Avalie o app na loja",
    points: 100,
    icon: Star,
    unlocked: false,
    category: "engagement",
    rarity: "rare",
  },
  {
    id: "settings-tweaker",
    name: "Ajustador de Configurações",
    description: "Personalize suas configurações",
    points: 30,
    icon: Settings,
    unlocked: false,
    progress: 8,
    maxProgress: 20,
    category: "engagement",
    rarity: "common",
  },
  {
    id: "notification-lover",
    name: "Amante de Notificações",
    description: "Ative todas as notificações",
    points: 20,
    icon: Sparkles,
    unlocked: false,
    category: "engagement",
    rarity: "common",
  },
  {
    id: "theme-changer",
    name: "Mudador de Tema",
    description: "Alterne entre tema claro e escuro 5 vezes",
    points: 30,
    icon: Sparkles,
    unlocked: false,
    progress: 1,
    maxProgress: 5,
    category: "engagement",
    rarity: "common",
  },
  {
    id: "comeback-warrior",
    name: "Guerreiro do Retorno",
    description: "Volte após 7 dias de ausência",
    points: 80,
    icon: TrendingUp,
    unlocked: false,
    category: "engagement",
    rarity: "common",
  },
  {
    id: "mobile-user",
    name: "Usuário Mobile",
    description: "Acesse pelo celular 20 vezes",
    points: 60,
    icon: Sparkles,
    unlocked: false,
    progress: 8,
    maxProgress: 20,
    category: "engagement",
    rarity: "common",
  },
  {
    id: "desktop-user",
    name: "Usuário Desktop",
    description: "Acesse pelo computador 20 vezes",
    points: 60,
    icon: Sparkles,
    unlocked: false,
    progress: 12,
    maxProgress: 20,
    category: "engagement",
    rarity: "common",
  },
  {
    id: "omnichannel",
    name: "Omnichannel",
    description: "Acesse por celular, tablet e computador",
    points: 150,
    icon: Trophy,
    unlocked: false,
    progress: 2,
    maxProgress: 3,
    category: "engagement",
    rarity: "rare",
  },

  // Special Achievements (30)
  {
    id: "welcome",
    name: "Bem-vindo ao LEX GO!",
    description: "Cadastre-se no LEX GO",
    points: 50,
    icon: Gift,
    unlocked: true,
    category: "special",
    rarity: "common",
  },
  {
    id: "bronze-member",
    name: "Membro Bronze",
    description: "Alcance nível 5",
    points: 100,
    icon: Award,
    unlocked: true,
    category: "special",
    rarity: "common",
  },
  {
    id: "silver-member",
    name: "Membro Prata",
    description: "Alcance nível 10",
    points: 200,
    icon: Award,
    unlocked: false,
    progress: 5,
    maxProgress: 10,
    category: "special",
    rarity: "rare",
  },
  {
    id: "gold-member",
    name: "Membro Ouro",
    description: "Alcance nível 20",
    points: 500,
    icon: Trophy,
    unlocked: false,
    progress: 5,
    maxProgress: 20,
    category: "special",
    rarity: "epic",
  },
  {
    id: "platinum-member",
    name: "Membro Platina",
    description: "Alcance nível 50",
    points: 1500,
    icon: Crown,
    unlocked: false,
    progress: 5,
    maxProgress: 50,
    category: "special",
    rarity: "legendary",
  },
  {
    id: "birthday",
    name: "Aniversariante",
    description: "Acesse no seu aniversário",
    points: 100,
    icon: Gift,
    unlocked: false,
    category: "special",
    rarity: "rare",
  },
  {
    id: "new-year",
    name: "Ano Novo",
    description: "Acesse no dia 1º de Janeiro",
    points: 150,
    icon: Sparkles,
    unlocked: false,
    category: "special",
    rarity: "rare",
  },
  {
    id: "constitution-day",
    name: "Dia da Constituição",
    description: "Acesse no dia 5 de Outubro",
    points: 100,
    icon: Star,
    unlocked: false,
    category: "special",
    rarity: "rare",
  },
  {
    id: "law-day",
    name: "Dia do Advogado",
    description: "Acesse no dia 11 de Agosto",
    points: 100,
    icon: Trophy,
    unlocked: false,
    category: "special",
    rarity: "rare",
  },
  {
    id: "midnight-scholar",
    name: "Estudioso da Meia-Noite",
    description: "Estude exatamente à meia-noite",
    points: 80,
    icon: Clock,
    unlocked: false,
    category: "special",
    rarity: "rare",
  },
  {
    id: "perfect-week",
    name: "Semana Perfeita",
    description: "Complete todas as tarefas diárias por 7 dias",
    points: 250,
    icon: CheckCircle,
    unlocked: false,
    progress: 0,
    maxProgress: 7,
    category: "special",
    rarity: "epic",
  },
  {
    id: "overachiever",
    name: "Super Realizador",
    description: "Complete 150% das metas semanais",
    points: 200,
    icon: TrendingUp,
    unlocked: false,
    category: "special",
    rarity: "rare",
  },
  {
    id: "social-butterfly",
    name: "Borboleta Social",
    description: "Interaja com 50 usuários diferentes",
    points: 180,
    icon: Users,
    unlocked: false,
    progress: 15,
    maxProgress: 50,
    category: "special",
    rarity: "rare",
  },
  {
    id: "knowledge-seeker",
    name: "Buscador de Conhecimento",
    description: "Use a busca 100 vezes",
    points: 120,
    icon: Target,
    unlocked: false,
    progress: 23,
    maxProgress: 100,
    category: "special",
    rarity: "rare",
  },
  {
    id: "bookworm",
    name: "Rato de Biblioteca",
    description: "Leia conteúdos por mais de 10 horas",
    points: 300,
    icon: BookOpen,
    unlocked: false,
    progress: 2,
    maxProgress: 10,
    category: "special",
    rarity: "epic",
  },
  {
    id: "speed-demon",
    name: "Demônio da Velocidade",
    description: "Complete 5 lições em menos de 30 minutos",
    points: 150,
    icon: Zap,
    unlocked: false,
    progress: 1,
    maxProgress: 5,
    category: "special",
    rarity: "rare",
  },
  {
    id: "perfectionist",
    name: "Perfeccionista",
    description: "Mantenha 100% de acerto por 10 lições seguidas",
    points: 400,
    icon: Star,
    unlocked: false,
    progress: 3,
    maxProgress: 10,
    category: "special",
    rarity: "epic",
  },
  {
    id: "comeback-specialist",
    name: "Especialista em Recuperação",
    description: "Melhore sua nota em 50% ao refazer uma prova",
    points: 200,
    icon: TrendingUp,
    unlocked: false,
    category: "special",
    rarity: "rare",
  },
  {
    id: "multi-tasker",
    name: "Multitarefa",
    description: "Complete lições de 3 cursos diferentes no mesmo dia",
    points: 120,
    icon: Zap,
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    category: "special",
    rarity: "rare",
  },
  {
    id: "motivator",
    name: "Motivador",
    description: "Receba 100 reações positivas em seus posts",
    points: 250,
    icon: Heart,
    unlocked: false,
    progress: 42,
    maxProgress: 100,
    category: "special",
    rarity: "epic",
  },
  {
    id: "creative-mind",
    name: "Mente Criativa",
    description: "Faça um post que seja compartilhado 50 vezes",
    points: 400,
    icon: Sparkles,
    unlocked: false,
    progress: 0,
    maxProgress: 50,
    category: "special",
    rarity: "epic",
  },
  {
    id: "law-evangelist",
    name: "Evangelista do Direito",
    description: "Convença 5 amigos a se cadastrarem",
    points: 300,
    icon: Users,
    unlocked: false,
    progress: 0,
    maxProgress: 5,
    category: "special",
    rarity: "epic",
  },
  {
    id: "platinum-streak",
    name: "Sequência Platina",
    description: "Mantenha uma sequência de 100 dias",
    points: 1000,
    icon: Flame,
    unlocked: false,
    progress: 7,
    maxProgress: 100,
    category: "special",
    rarity: "legendary",
  },
  {
    id: "master-of-all",
    name: "Mestre de Tudo",
    description: "Alcance nível máximo em 5 áreas do direito",
    points: 2000,
    icon: Crown,
    unlocked: false,
    progress: 0,
    maxProgress: 5,
    category: "special",
    rarity: "legendary",
  },
  {
    id: "legendary-lawyer",
    name: "Advogado Lendário",
    description: "Complete todos os cursos disponíveis",
    points: 5000,
    icon: Crown,
    unlocked: false,
    progress: 0,
    maxProgress: 15,
    category: "special",
    rarity: "legendary",
  },
  {
    id: "community-pillar",
    name: "Pilar da Comunidade",
    description: "Seja ativo por 365 dias e ajude 100 pessoas",
    points: 3000,
    icon: Trophy,
    unlocked: false,
    progress: 2,
    maxProgress: 100,
    category: "special",
    rarity: "legendary",
  },
  {
    id: "knowledge-champion",
    name: "Campeão do Conhecimento",
    description: "Alcance 50.000 XP",
    points: 5000,
    icon: Crown,
    unlocked: false,
    progress: 150,
    maxProgress: 50000,
    category: "special",
    rarity: "legendary",
  },
  {
    id: "hall-of-fame",
    name: "Hall da Fama",
    description: "Entre no top 10 usuários do LEX GO",
    points: 10000,
    icon: Crown,
    unlocked: false,
    category: "special",
    rarity: "legendary",
  },
  {
    id: "lex-go-legend",
    name: "Lenda do LEX GO",
    description: "Desbloqueie todas as outras conquistas",
    points: 15000,
    icon: Crown,
    unlocked: false,
    progress: 24,
    maxProgress: 119,
    category: "special",
    rarity: "legendary",
  },
  {
    id: "juriton-friend",
    name: "Amigo do Juriton",
    description: "Interaja com o Juriton 50 vezes",
    points: 250,
    icon: Heart,
    unlocked: false,
    progress: 8,
    maxProgress: 50,
    category: "special",
    rarity: "epic",
  },
]

export function AchievementsGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null)

  const categories = [
    { id: "all", label: "Todas", icon: Trophy },
    { id: "study", label: "Estudo", icon: BookOpen },
    { id: "community", label: "Comunidade", icon: Users },
    { id: "engagement", label: "Engajamento", icon: Flame },
    { id: "special", label: "Especiais", icon: Star },
  ]

  const filteredAchievements =
    selectedCategory === "all" ? achievements : achievements.filter((a) => a.category === selectedCategory)

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-muted text-muted-foreground"
      case "rare":
        return "bg-blue-500/20 text-blue-400 border-blue-500/50"
      case "epic":
        return "bg-purple-500/20 text-purple-400 border-purple-500/50"
      case "legendary":
        return "bg-amber-500/20 text-amber-400 border-amber-500/50"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getRarityLabel = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "Comum"
      case "rare":
        return "Rara"
      case "epic":
        return "Épica"
      case "legendary":
        return "Lendária"
      default:
        return "Comum"
    }
  }

  return (
    <div>
      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant={selectedCategory === cat.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(cat.id)}
            className="gap-2"
          >
            <cat.icon className="w-4 h-4" />
            {cat.label}
          </Button>
        ))}
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredAchievements.map((achievement) => {
          const Icon = achievement.icon
          const progress = achievement.progress || 0
          const maxProgress = achievement.maxProgress || 1
          const progressPercent = (progress / maxProgress) * 100

          return (
            <button
              key={achievement.id}
              onClick={() => setSelectedAchievement(achievement)}
              className={`
                relative p-6 rounded-2xl border-2 text-left transition-all
                ${
                  achievement.unlocked
                    ? "bg-gradient-to-br from-accent/20 to-accent/5 border-accent/30 hover:border-accent/50"
                    : "bg-muted/20 border-muted/30 hover:border-muted/50 opacity-60"
                }
                hover:scale-105 hover:shadow-lg
              `}
            >
              {/* Rarity Badge */}
              <Badge
                className={`absolute top-3 right-3 ${getRarityColor(achievement.rarity)} text-xs px-2 py-0.5`}
                variant="outline"
              >
                {getRarityLabel(achievement.rarity)}
              </Badge>

              {/* Icon */}
              <div
                className={`
                w-16 h-16 rounded-full flex items-center justify-center mb-4
                ${achievement.unlocked ? "bg-accent/20" : "bg-muted/30"}
              `}
              >
                {achievement.unlocked ? (
                  <Icon className="w-8 h-8 text-accent" />
                ) : (
                  <Lock className="w-8 h-8 text-muted-foreground" />
                )}
              </div>

              {/* Content */}
              <h3 className="font-bold text-foreground mb-1 pr-16">{achievement.name}</h3>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{achievement.description}</p>

              {/* Progress Bar (if applicable) */}
              {achievement.maxProgress && achievement.maxProgress > 1 && (
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>
                      {progress}/{maxProgress}
                    </span>
                    <span>{Math.round(progressPercent)}%</span>
                  </div>
                  <div className="bg-muted rounded-full h-2">
                    <div
                      className={`${achievement.unlocked ? "bg-accent" : "bg-muted-foreground"} rounded-full h-2 transition-all duration-500`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Points */}
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="font-bold text-accent">{achievement.points} pts</span>
              </div>

              {/* Unlocked Badge */}
              {achievement.unlocked && (
                <div className="absolute top-3 left-3">
                  <CheckCircle className="w-6 h-6 text-accent" />
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Achievement Detail Dialog */}
      <Dialog open={!!selectedAchievement} onOpenChange={() => setSelectedAchievement(null)}>
        <DialogContent className="max-w-md">
          {selectedAchievement && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`
                    w-20 h-20 rounded-full flex items-center justify-center
                    ${selectedAchievement.unlocked ? "bg-accent/20" : "bg-muted/30"}
                  `}
                  >
                    {selectedAchievement.unlocked ? (
                      <selectedAchievement.icon className="w-10 h-10 text-accent" />
                    ) : (
                      <Lock className="w-10 h-10 text-muted-foreground" />
                    )}
                  </div>
                  <Badge className={`${getRarityColor(selectedAchievement.rarity)} px-3 py-1`} variant="outline">
                    {getRarityLabel(selectedAchievement.rarity)}
                  </Badge>
                </div>
                <DialogTitle className="text-2xl">{selectedAchievement.name}</DialogTitle>
                <DialogDescription className="text-base">{selectedAchievement.description}</DialogDescription>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                {/* Progress */}
                {selectedAchievement.maxProgress && selectedAchievement.maxProgress > 1 && (
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Progresso</span>
                      <span className="font-semibold">
                        {selectedAchievement.progress}/{selectedAchievement.maxProgress}
                      </span>
                    </div>
                    <div className="bg-muted rounded-full h-3">
                      <div
                        className={`${selectedAchievement.unlocked ? "bg-accent" : "bg-muted-foreground"} rounded-full h-3 transition-all duration-500`}
                        style={{
                          width: `${((selectedAchievement.progress || 0) / selectedAchievement.maxProgress) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Points */}
                <div className="flex items-center justify-between p-4 bg-accent/10 rounded-lg border border-accent/20">
                  <span className="text-muted-foreground">Recompensa</span>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-accent" />
                    <span className="font-bold text-accent text-xl">{selectedAchievement.points} pontos</span>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center justify-center p-4 bg-muted/20 rounded-lg">
                  {selectedAchievement.unlocked ? (
                    <div className="flex items-center gap-2 text-accent">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-semibold">Conquista Desbloqueada!</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Lock className="w-5 h-5" />
                      <span className="font-semibold">Conquista Bloqueada</span>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

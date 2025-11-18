import { BookOpen, Zap, Trophy, Users, Sparkles, Target } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: BookOpen,
      title: "Conteúdo Completo",
      description: "Todas as áreas do direito em um só lugar, do básico ao avançado.",
    },
    {
      icon: Zap,
      title: "Aprendizado Rápido",
      description: "Lições curtas e objetivas que cabem na sua rotina diária.",
    },
    {
      icon: Trophy,
      title: "Sistema de Conquistas",
      description: "Ganhe troféus, badges e suba no ranking enquanto aprende.",
    },
    {
      icon: Users,
      title: "Comunidade Ativa",
      description: "Conecte-se com outros estudantes e profissionais do direito.",
    },
    {
      icon: Sparkles,
      title: "Gamificação",
      description: "Aprenda brincando com quizzes, desafios e missões diárias.",
    },
    {
      icon: Target,
      title: "Metas Personalizadas",
      description: "Defina seus objetivos e acompanhe seu progresso em tempo real.",
    },
  ]

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground">Por que escolher LEX GO?</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
            Uma plataforma completa que torna o aprendizado jurídico acessível, moderno e eficaz
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="bg-card rounded-xl p-8 border border-border hover:border-primary/30 hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div className="bg-black/5 w-14 h-14 rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-primary" />
                </div>

                <h3 className="text-xl font-bold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed font-medium">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

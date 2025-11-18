"use client"

import { BookOpen, Brain, Scale, Users } from "lucide-react"
import Image from "next/image"

export function FullscreenShowcase() {
  const showcaseItems = [
    {
      icon: BookOpen,
      title: "Aprenda no Seu Ritmo",
      description: "Lições curtas e objetivas que se adaptam à sua rotina. Estude quando e onde quiser.",
      image: "/person-studying-law-on-tablet-modern-minimalist.jpg",
    },
    {
      icon: Brain,
      title: "IA Jurídica Inteligente",
      description: "Assistente especializado que cria minutas, petições e responde suas dúvidas sobre direito.",
      image: "/ai-assistant-helping-lawyer-holographic-interface.jpg",
    },
    {
      icon: Scale,
      title: "Direito Completo",
      description:
        "Todas as áreas do direito em um só lugar. Do básico ao avançado, com jurisprudências e casos reais.",
      image: "/justice-scales-modern-law-books-organized-minimali.jpg",
    },
    {
      icon: Users,
      title: "Comunidade Ativa",
      description: "Conecte-se com estudantes e profissionais. Compartilhe conhecimento e cresça junto.",
      image: "/diverse-people-discussing-law-study-group-modern.jpg",
    },
  ]

  return (
    <>
      {showcaseItems.map((item, index) => {
        const Icon = item.icon
        const isEven = index % 2 === 0

        return (
          <section key={index} className="min-h-screen flex items-center justify-center py-16 md:py-24 bg-white">
            <div className="container px-4">
              <div
                className={`grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto ${isEven ? "" : "lg:grid-flow-dense"}`}
              >
                <div className={`space-y-6 ${isEven ? "" : "lg:col-start-2"}`}>
                  <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-black/5">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>

                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-tight">
                    {item.title}
                  </h2>

                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
                    {item.description}
                  </p>

                  <div className="w-12 h-1 bg-primary rounded-full" />
                </div>

                <div className={`relative ${isEven ? "" : "lg:col-start-1 lg:row-start-1"}`}>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-border">
                    <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}

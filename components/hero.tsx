"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white pt-20 pb-16">
      <div className="container max-w-2xl px-4 mx-auto text-center space-y-8 animate-fade-in">
        <div className="space-y-6">
          <h1 className="text-7xl md:text-8xl font-black text-foreground leading-none tracking-tight">LEX GO</h1>

          <p className="text-xl md:text-2xl text-muted-foreground font-medium">Todo o direito em um único lugar</p>

          <p className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Estude, aprenda, se desenvolva e conecte-se com a comunidade jurídica. Tudo isso em uma plataforma moderna e
            intuitiva.
          </p>
        </div>

        <div className="pt-6">
          <Button
            size="lg"
            className="bg-foreground hover:bg-primary text-background text-lg font-bold px-10 py-7 rounded-lg hover:scale-105 transition-all"
            onClick={() => {
              document.getElementById("cta-section")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            Começar Agora
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-sm text-muted-foreground pt-4">
          <div>✓ 100% Grátis</div>
          <div className="hidden sm:block">•</div>
          <div>✓ Sem Cartão</div>
          <div className="hidden sm:block">•</div>
          <div>✓ Acesso Imediato</div>
        </div>
      </div>
    </section>
  )
}

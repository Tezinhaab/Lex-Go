"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Mail } from "lucide-react"
import { useState } from "react"

export function CTA() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      console.log("Email submitted:", email)
      setIsSubmitted(true)
      setTimeout(() => {
        window.location.href = "/dashboard"
      }, 1500)
    }
  }

  return (
    <section id="cta-section" className="py-20 md:py-28 bg-white">
      <div className="container px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-12 border border-border">
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-tight">
                  Comece sua Jornada Jurídica
                </h2>

                <p className="text-lg md:text-xl text-muted-foreground font-medium">
                  Cadastre seu email e tenha acesso imediato. 100% grátis!
                </p>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full h-14 pl-12 pr-6 text-base md:text-lg bg-background border-2 border-border rounded-lg font-medium focus:border-primary"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-foreground hover:bg-primary text-background font-black text-lg h-14 rounded-lg transition-all hover:scale-105"
                  >
                    Começar Agora
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              ) : (
                <div className="bg-muted/50 border border-primary rounded-lg p-6 text-center animate-fade-in">
                  <p className="text-foreground font-black text-lg">✓ Bem-vindo ao LEX GO!</p>
                  <p className="text-muted-foreground mt-2 font-medium">Redirecionando para o dashboard...</p>
                </div>
              )}

              <p className="text-sm text-muted-foreground text-center font-medium">
                Ao se cadastrar, você concorda com nossos{" "}
                <button className="text-primary hover:underline font-bold">Termos de Uso</button>
                {" e "}
                <button className="text-primary hover:underline font-bold">Política de Privacidade</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home, Compass, Bell, Mail, User, Settings, HelpCircle, Newspaper, Video } from "lucide-react"
import Image from "next/image"

interface CommunitySidebarProps {
  activeTab?: "feed" | "noticias" | "consultoria"
}

export function CommunitySidebar({ activeTab = "feed" }: CommunitySidebarProps) {
  const navItems = [
    { icon: Home, label: "Início", active: activeTab === "feed" },
    { icon: Newspaper, label: "Notícias", active: activeTab === "noticias" },
    { icon: Video, label: "Consultoria", active: activeTab === "consultoria" },
    { icon: Compass, label: "Explorar", active: false },
    { icon: Bell, label: "Notificações", badge: 5 },
    { icon: Mail, label: "Mensagens", badge: 2 },
    { icon: User, label: "Perfil", active: false },
    { icon: Settings, label: "Configurações", active: false },
    { icon: HelpCircle, label: "Ajuda", active: false },
  ]

  return (
    <Card className="p-4 sticky top-20 border-2 border-border">
      <div className="space-y-2">
        {navItems.map((item) => (
          <Button
            key={item.label}
            variant={item.active ? "default" : "ghost"}
            className={`w-full justify-start gap-3 h-12 relative ${
              item.active ? "bg-primary text-white" : "text-foreground"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
            {item.badge && (
              <span className="absolute right-3 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {item.badge}
              </span>
            )}
          </Button>
        ))}

        <div className="pt-4">
          <Button className="w-full bg-accent hover:bg-accent/90 text-white font-bold h-12 text-base">
            Nova Postagem
          </Button>
        </div>

        <div className="pt-6 border-t border-border mt-4">
          <div className="flex items-center gap-3 p-3 hover:bg-accent/5 rounded-lg cursor-pointer">
            <Image
              src="/mascot.png"
              alt="Mascote LEX GO"
              width={48}
              height={48}
              className="w-12 h-12 rounded-full border-2 border-accent"
            />
            <div className="flex-1">
              <p className="font-semibold text-sm">Seu Progresso</p>
              <p className="text-xs text-muted-foreground">Nível 5 - 150 XP</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

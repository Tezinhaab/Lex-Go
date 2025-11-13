"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Home, BookOpen, Trophy, User, Settings, Sparkles, Users, Bot, Scale } from "lucide-react"
import Link from "next/link"
import { NotificationsBell } from "./notifications-bell"

export function DashboardHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { icon: Home, label: "Início", href: "/dashboard" },
    { icon: BookOpen, label: "Meus Cursos", href: "/dashboard/courses" },
    { icon: Bot, label: "Juriton IA", href: "/dashboard/juriton" },
    { icon: Users, label: "Comunidade", href: "/dashboard/comunidade" },
    { icon: Scale, label: "Vade Mecum", href: "/dashboard/vade-mecum" },
    { icon: Trophy, label: "Conquistas", href: "/dashboard/achievements" },
    { icon: User, label: "Perfil", href: "/dashboard/profile" },
    { icon: Settings, label: "Configurações", href: "/dashboard/settings" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-[1800px] mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="text-3xl font-black">
              <span className="text-black">LEX</span>
              <span className="text-blue-900">GO!</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => (
              <Link key={item.label} href={item.href}>
                <Button
                  variant="ghost"
                  className="gap-2 text-gray-600 hover:text-black hover:bg-gray-100 transition-all"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          {/* User Info */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-100 px-5 py-2.5 rounded-full border border-gray-200">
              <Sparkles className="w-4 h-4 text-blue-900" />
              <span className="font-bold text-gray-900">150 XP</span>
            </div>
            <NotificationsBell />
            <div className="w-11 h-11 rounded-full bg-gray-300 flex items-center justify-center text-black font-bold">
              U
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-black hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Popup */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 right-0 bg-white border-b border-gray-200 shadow-lg animate-in slide-in-from-top-2 duration-300">
          <nav className="max-w-[1800px] mx-auto px-6 py-8 space-y-2">
            {menuItems.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setIsMenuOpen(false)}>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 h-14 text-base text-gray-600 hover:text-black hover:bg-gray-100"
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Button>
              </Link>
            ))}
            <div className="pt-6 border-t border-gray-200 mt-4">
              <div className="flex items-center justify-between p-4 bg-gray-100 rounded-xl border border-gray-200">
                <span className="font-semibold text-gray-900">Seus Pontos</span>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-900" />
                  <span className="font-bold text-blue-900 text-lg">150 XP</span>
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

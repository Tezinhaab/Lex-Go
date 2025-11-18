"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Input } from "@/components/ui/input"
import { Search, ChevronRight, FileText, Scale, Gavel, Building } from "lucide-react"
import Link from "next/link"

const legislacoes = [
  {
    id: "constituicao",
    title: "Constituição Federal",
    subtitle: "de 1988",
    icon: Scale,
    description: "Carta Magna da República Federativa do Brasil",
  },
  {
    id: "sumula-stf",
    title: "Súmula do STF",
    subtitle: "Supremo Tribunal Federal",
    icon: Gavel,
    description: "Súmulas vinculantes e persuasivas do STF",
  },
  {
    id: "codigo-civil",
    title: "Código Civil",
    subtitle: "Lei 10.406/2002",
    icon: FileText,
    description: "Regula as relações jurídicas de ordem privada",
  },
  {
    id: "codigo-penal",
    title: "Código Penal",
    subtitle: "Decreto-Lei 2.848/1940",
    icon: Gavel,
    description: "Define os crimes e suas respectivas penas",
  },
]

export default function VadeMercumPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredLegislacoes = legislacoes.filter(
    (leg) =>
      leg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leg.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leg.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader />

      <main className="pt-20 pb-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-black mb-4 text-black">
              VADE <span className="text-[#1E3A8A]">MECUM</span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              Acesse todos os códigos e normas brasileiras em um só lugar
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar legislação..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-14 pl-12 pr-6 border-2 border-gray-200 rounded-xl focus:border-[#1E3A8A] focus:ring-0"
              />
            </div>
          </div>

          {/* Parcerias Section */}
          <div className="mt-16 mb-12">
            <div className="bg-gray-50 rounded-2xl p-10 border border-gray-200">
              <h2 className="text-3xl font-black text-center mb-2 text-black">PARCERIAS INSTITUCIONAIS</h2>
              <p className="text-center text-gray-600 mb-10">
                Estamos trabalhando em parcerias oficiais com as principais instituições jurídicas do Brasil
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { name: "OAB Brasil", icon: Scale },
                  { name: "Tribunais de Justiça", icon: Building },
                  { name: "STF", icon: Gavel },
                ].map((partner) => (
                  <div key={partner.name} className="text-center">
                    <div className="w-20 h-20 rounded-xl bg-gray-200 mx-auto mb-4 flex items-center justify-center">
                      <partner.icon className="w-10 h-10 text-[#1E3A8A]" />
                    </div>
                    <h3 className="text-lg font-bold text-black">{partner.name}</h3>
                    <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold">
                      Em desenvolvimento
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Legislações Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLegislacoes.map((leg) => (
              <Link key={leg.id} href={`/dashboard/vade-mecum/${leg.id}`}>
                <div className="group bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#1E3A8A] hover:shadow-md transition-all cursor-pointer">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 p-2 mb-4 group-hover:bg-[#1E3A8A] transition-colors">
                    <leg.icon className="w-full h-full text-gray-700 group-hover:text-white transition-colors" />
                  </div>

                  <h3 className="text-xl font-bold mb-1 text-black">{leg.title}</h3>
                  <p className="text-sm text-gray-500 mb-3 font-mono">{leg.subtitle}</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{leg.description}</p>

                  <div className="flex items-center gap-2 text-[#1E3A8A] font-semibold text-sm">
                    <span>Acessar</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredLegislacoes.length === 0 && (
            <div className="text-center py-20">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-600">Nenhuma legislação encontrada</h3>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Search, TrendingUp, X } from "lucide-react"
import { Card } from "@/components/ui/card"

export function CommunitySearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)

  const trendingTopics = [
    { term: "Reforma Tributária", posts: 1247 },
    { term: "STF Julgamentos", posts: 892 },
    { term: "Direito Digital", posts: 734 },
    { term: "Processo Trabalhista", posts: 621 },
    { term: "Lei de Licitações", posts: 518 },
    { term: "Novo CPC", posts: 445 },
  ]

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar assuntos, hashtags, usuários..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          className="w-full h-14 pl-12 pr-12 rounded-full border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors text-base"
        />
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery("")
              setShowSuggestions(false)
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 hover:bg-accent/10 p-1 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        )}
      </div>

      {showSuggestions && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setShowSuggestions(false)} />
          <Card className="absolute top-full mt-2 w-full z-50 p-4 border-2 border-border">
            <div className="space-y-1">
              <div className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-muted-foreground">
                <TrendingUp className="w-4 h-4" />
                Assuntos do Momento
              </div>
              {trendingTopics.map((topic) => (
                <button
                  key={topic.term}
                  onClick={() => {
                    setSearchQuery(topic.term)
                    setShowSuggestions(false)
                  }}
                  className="w-full flex items-center justify-between px-3 py-3 hover:bg-accent/10 rounded-lg transition-colors group"
                >
                  <div className="text-left">
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      #{topic.term}
                    </p>
                    <p className="text-xs text-muted-foreground">{topic.posts} publicações</p>
                  </div>
                  <Search className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  )
}

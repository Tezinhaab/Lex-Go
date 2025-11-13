"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { CommunityFeed } from "@/components/community-feed"
import { CommunitySidebar } from "@/components/community-sidebar"
import { TrendingSidebar } from "@/components/trending-sidebar"
import { CommunitySearch } from "@/components/community-search"
import { NewsVaral } from "@/components/news-varal"
import { ConsultoriaSection } from "@/components/consultoria-section"
import { useState } from "react"

export default function ComunidadePage() {
  const [activeTab, setActiveTab] = useState<"feed" | "noticias" | "consultoria">("feed")

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <CommunitySearch />
        </div>

        <div className="flex gap-2 mb-6 border-b border-border">
          <button
            onClick={() => setActiveTab("feed")}
            className={`px-6 py-3 font-semibold transition-colors relative ${
              activeTab === "feed" ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Feed da Comunidade
            {activeTab === "feed" && <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full" />}
          </button>
          <button
            onClick={() => setActiveTab("noticias")}
            className={`px-6 py-3 font-semibold transition-colors relative ${
              activeTab === "noticias" ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Varal de Notícias Juriton
            {activeTab === "noticias" && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("consultoria")}
            className={`px-6 py-3 font-semibold transition-colors relative ${
              activeTab === "consultoria" ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Consultoria Jurídica
            {activeTab === "consultoria" && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full" />
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="hidden lg:block lg:col-span-3">
            <CommunitySidebar activeTab={activeTab} />
          </div>

          <div className="lg:col-span-6">
            {activeTab === "feed" ? (
              <CommunityFeed />
            ) : activeTab === "noticias" ? (
              <NewsVaral />
            ) : (
              <ConsultoriaSection />
            )}
          </div>

          <div className="hidden lg:block lg:col-span-3">
            <TrendingSidebar />
          </div>
        </div>
      </div>
    </div>
  )
}

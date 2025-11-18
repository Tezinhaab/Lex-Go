"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Share2, Bookmark, ExternalLink, TrendingUp } from "lucide-react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface NewsArticle {
  id: string
  title: string
  source: string
  date: string
  summary: string
  image: string
  category: string
  comments: number
  shares: number
  url: string
}

export function NewsVaral() {
  const [selectedNews, setSelectedNews] = useState<NewsArticle | null>(null)
  const [comments, setComments] = useState<Array<{ id: string; author: string; text: string; time: string }>>([])
  const [newComment, setNewComment] = useState("")

  const newsArticles: NewsArticle[] = [
    {
      id: "1",
      title: "STF Define Novos Parâmetros para Prisão em Segunda Instância",
      source: "Conjur",
      date: "Há 2 horas",
      summary:
        "Supremo Tribunal Federal estabelece diretrizes claras sobre execução provisória da pena após decisão em segunda instância...",
      image: "/lawyer-scales-justice.png",
      category: "Constitucional",
      comments: 127,
      shares: 43,
      url: "#",
    },
    {
      id: "2",
      title: "Reforma Tributária: Entenda as Mudanças no ICMS",
      source: "Valor Econômico",
      date: "Há 4 horas",
      summary:
        "Aprovação da reforma tributária traz novas regras para o Imposto sobre Circulação de Mercadorias e Serviços...",
      image: "/diverse-students-studying.png",
      category: "Tributário",
      comments: 89,
      shares: 61,
      url: "#",
    },
    {
      id: "3",
      title: "TST Uniformiza Jurisprudência sobre Trabalho Remoto",
      source: "Migalhas",
      date: "Há 6 horas",
      summary: "Tribunal Superior do Trabalho publica nova súmula sobre direitos e deveres no trabalho home office...",
      image: "/diverse-professor-lecturing.png",
      category: "Trabalhista",
      comments: 156,
      shares: 92,
      url: "#",
    },
    {
      id: "4",
      title: "Nova Lei de Proteção de Dados Pessoais Entra em Vigor",
      source: "TechLaw",
      date: "Há 8 horas",
      summary: "LGPD ganha novas atualizações focadas em inteligência artificial e tratamento de dados biométricos...",
      image: "/abstract-geometric-shapes.png",
      category: "Digital",
      comments: 203,
      shares: 134,
      url: "#",
    },
    {
      id: "5",
      title: "CNJ Lança Plataforma Digital para Processos Eletrônicos",
      source: "Jota",
      date: "Há 10 horas",
      summary: "Conselho Nacional de Justiça apresenta novo sistema unificado de peticionamento eletrônico...",
      image: "/lawyer-in-courtroom.png",
      category: "Processual",
      comments: 67,
      shares: 38,
      url: "#",
    },
  ]

  const handleOpenComments = (news: NewsArticle) => {
    setSelectedNews(news)
    // Mock comments
    setComments([
      {
        id: "1",
        author: "Dr. Carlos Silva",
        text: "Análise muito pertinente. Essa mudança impacta diretamente a defesa criminal.",
        time: "Há 1 hora",
      },
      {
        id: "2",
        author: "Dra. Marina Costa",
        text: "Importante para uniformizar o entendimento dos tribunais.",
        time: "Há 30 min",
      },
    ])
  }

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          id: Date.now().toString(),
          author: "Você",
          text: newComment,
          time: "Agora",
        },
      ])
      setNewComment("")
    }
  }

  return (
    <div className="space-y-6">
      {/* Header do Varal */}
      <Card className="p-6 border-2 border-border bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Varal de Notícias Juriton</h2>
            <p className="text-sm text-muted-foreground">As principais notícias do mundo jurídico</p>
          </div>
        </div>
      </Card>

      {/* Grid de Notícias - Layout tipo Google News */}
      <div className="grid grid-cols-1 gap-4">
        {newsArticles.map((news, index) => (
          <Card
            key={news.id}
            className={`border-2 border-border hover:border-primary transition-all cursor-pointer overflow-hidden ${
              index === 0 ? "md:grid md:grid-cols-2" : ""
            }`}
          >
            <div className={index === 0 ? "relative h-64 md:h-auto" : "relative h-48"}>
              <Image src={news.image || "/placeholder.svg"} alt={news.title} fill className="object-cover" />
              <div className="absolute top-3 left-3">
                <span className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">{news.category}</span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                <span className="font-semibold">{news.source}</span>
                <span>•</span>
                <span>{news.date}</span>
              </div>

              <h3
                className={`font-bold text-foreground mb-3 hover:text-primary transition-colors ${
                  index === 0 ? "text-2xl" : "text-lg"
                }`}
              >
                {news.title}
              </h3>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{news.summary}</p>

              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 hover:text-primary"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleOpenComments(news)
                  }}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm font-semibold">{news.comments}</span>
                </Button>

                <Button variant="ghost" size="sm" className="gap-2 hover:text-accent">
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm font-semibold">{news.shares}</span>
                </Button>

                <Button variant="ghost" size="sm" className="gap-2 hover:text-accent">
                  <Bookmark className="w-4 h-4" />
                </Button>

                <Button variant="ghost" size="sm" className="gap-2 ml-auto hover:text-primary">
                  Ler Mais
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Dialog de Comentários */}
      <Dialog open={selectedNews !== null} onOpenChange={() => setSelectedNews(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Debate sobre: {selectedNews?.title}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Campo para novo comentário */}
            <div className="border-b border-border pb-4">
              <textarea
                placeholder="Compartilhe sua opinião sobre essa notícia..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full p-3 border-2 border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none resize-none"
                rows={3}
              />
              <div className="flex justify-end mt-2">
                <Button
                  onClick={handleAddComment}
                  className="bg-accent hover:bg-accent/90 text-white font-semibold"
                  disabled={!newComment.trim()}
                >
                  Comentar
                </Button>
              </div>
            </div>

            {/* Lista de comentários */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">{comments.length} Comentários</h3>
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold shrink-0">
                    {comment.author[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm">{comment.author}</span>
                      <span className="text-xs text-muted-foreground">{comment.time}</span>
                    </div>
                    <p className="text-sm text-foreground">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

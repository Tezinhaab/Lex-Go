"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ArrowLeft, BookOpen, Download, Share2, Bookmark, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function LegislacaoPage() {
  const params = useParams()
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedArticles, setExpandedArticles] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(false)

  const toggleArticle = (id: string) => {
    const newSet = new Set(expandedArticles)
    if (newSet.has(id)) {
      newSet.delete(id)
    } else {
      newSet.add(id)
    }
    setExpandedArticles(newSet)
  }

  const legislacaoInfo: Record<string, any> = {
    constituicao: {
      title: "Constituição Federal",
      subtitle: "de 1988",
      accentColor: "from-blue-900 to-blue-800",
      content: {
        preambulo: `Nós, representantes do povo brasileiro, reunidos em Assembleia Nacional Constituinte para instituir um Estado Democrático, destinado a assegurar o exercício dos direitos sociais e individuais, a liberdade, a segurança, o bem-estar, o desenvolvimento, a igualdade e a justiça como valores supremos de uma sociedade fraterna, pluralista e sem preconceitos, fundada na harmonia social e comprometida, na ordem interna e internacional, com a solução pacífica das controvérsias, promulgamos, sob a proteção de Deus, a seguinte CONSTITUIÇÃO DA REPÚBLICA FEDERATIVA DO BRASIL.`,
        titulos: [
          {
            id: "titulo-1",
            nome: "TÍTULO I - Dos Princípios Fundamentais",
            artigos: [
              {
                id: "art1",
                numero: "Art. 1º",
                texto:
                  "A República Federativa do Brasil, formada pela união indissolúvel dos Estados e Municípios e do Distrito Federal, constitui-se em Estado Democrático de Direito e tem como fundamentos:",
                incisos: [
                  "I - a soberania;",
                  "II - a cidadania;",
                  "III - a dignidade da pessoa humana;",
                  "IV - os valores sociais do trabalho e da livre iniciativa;",
                  "V - o pluralismo político.",
                ],
                paragrafo:
                  "Parágrafo único. Todo o poder emana do povo, que o exerce por meio de representantes eleitos ou diretamente, nos termos desta Constituição.",
              },
              {
                id: "art2",
                numero: "Art. 2º",
                texto:
                  "São Poderes da União, independentes e harmônicos entre si, o Legislativo, o Executivo e o Judiciário.",
              },
              {
                id: "art3",
                numero: "Art. 3º",
                texto: "Constituem objetivos fundamentais da República Federativa do Brasil:",
                incisos: [
                  "I - construir uma sociedade livre, justa e solidária;",
                  "II - garantir o desenvolvimento nacional;",
                  "III - erradicar a pobreza e a marginalização e reduzir as desigualdades sociais e regionais;",
                  "IV - promover o bem de todos, sem preconceitos de origem, raça, sexo, cor, idade e quaisquer outras formas de discriminação.",
                ],
              },
              {
                id: "art4",
                numero: "Art. 4º",
                texto:
                  "A República Federativa do Brasil rege-se nas suas relações internacionais pelos seguintes princípios:",
                incisos: [
                  "I - independência nacional;",
                  "II - prevalência dos direitos humanos;",
                  "III - autodeterminação dos povos;",
                  "IV - não-intervenção;",
                  "V - igualdade entre os Estados;",
                  "VI - defesa da paz;",
                  "VII - solução pacífica dos conflitos;",
                  "VIII - repúdio ao terrorismo e ao racismo;",
                  "IX - cooperação entre os povos para o progresso da humanidade;",
                  "X - concessão de asilo político.",
                ],
              },
            ],
          },
          {
            id: "titulo-2",
            nome: "TÍTULO II - Dos Direitos e Garantias Fundamentais",
            capitulos: [
              {
                nome: "CAPÍTULO I - DOS DIREITOS E DEVERES INDIVIDUAIS E COLETIVOS",
                artigos: [
                  {
                    id: "art5",
                    numero: "Art. 5º",
                    texto:
                      "Todos são iguais perante a lei, sem distinção de qualquer natureza, garantindo-se aos brasileiros e aos estrangeiros residentes no País a inviolabilidade do direito à vida, à liberdade, à igualdade, à segurança e à propriedade, nos termos seguintes:",
                    incisos: [
                      "I - homens e mulheres são iguais em direitos e obrigações, nos termos desta Constituição;",
                      "II - ninguém será obrigado a fazer ou deixar de fazer alguma coisa senão em virtude de lei;",
                      "III - ninguém será submetido a tortura nem a tratamento desumano ou degradante;",
                      "IV - é livre a manifestação do pensamento, sendo vedado o anonimato;",
                      "V - é assegurado o direito de resposta, proporcional ao agravo, além da indenização por dano material, moral ou à imagem;",
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    "sumula-stf": {
      title: "Súmula do STF",
      subtitle: "Supremo Tribunal Federal",
      accentColor: "from-blue-900 to-blue-800",
      content: {
        sumulas: [
          {
            id: "sumula-vinculante-1",
            numero: "Súmula Vinculante 1",
            texto:
              "Ofende a garantia constitucional do ato jurídico perfeito a decisão que, sem ponderar as circunstâncias do caso concreto, desconsidera a validez e a eficácia de acordo constante de termo de adesão instituído pela Lei Complementar nº 110/2001.",
            tipo: "Vinculante",
          },
          {
            id: "sumula-vinculante-2",
            numero: "Súmula Vinculante 2",
            texto:
              "É inconstitucional a lei ou ato normativo estadual ou distrital que disponha sobre sistemas de consórcios e sorteios, inclusive bingos e loterias.",
            tipo: "Vinculante",
          },
          {
            id: "sumula-vinculante-3",
            numero: "Súmula Vinculante 3",
            texto:
              "Nos processos perante o Tribunal de Contas da União asseguram-se o contraditório e a ampla defesa quando da decisão puder resultar anulação ou revogação de ato administrativo que beneficie o interessado, excetuada a apreciação da legalidade do ato de concessão inicial de aposentadoria, reforma e pensão.",
            tipo: "Vinculante",
          },
          {
            id: "sumula-vinculante-4",
            numero: "Súmula Vinculante 4",
            texto:
              "Salvo nos casos previstos na Constituição, o salário mínimo não pode ser usado como indexador de base de cálculo de vantagem de servidor público ou de empregado, nem ser substituído por decisão judicial.",
            tipo: "Vinculante",
          },
          {
            id: "sumula-vinculante-5",
            numero: "Súmula Vinculante 5",
            texto:
              "A falta de defesa técnica por advogado no processo administrativo disciplinar não ofende a Constituição.",
            tipo: "Vinculante",
          },
        ],
      },
    },
    "codigo-civil": {
      title: "Código Civil",
      subtitle: "Lei 10.406/2002",
      accentColor: "from-blue-900 to-blue-800",
    },
  }

  const currentLeg = legislacaoInfo[params.id as string] || legislacaoInfo.constituicao

  const renderContent = () => {
    if (params.id === "sumula-stf" && currentLeg.content?.sumulas) {
      return (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-black mb-6">Súmulas do STF</h2>
          {currentLeg.content.sumulas.map((sumula: any) => (
            <div
              key={sumula.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-blue-900/30 transition-colors"
            >
              <button
                onClick={() => toggleArticle(sumula.id)}
                className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-black mb-1">{sumula.numero}</h3>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      sumula.tipo === "Vinculante" ? "bg-blue-900/10 text-blue-900" : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {sumula.tipo}
                  </span>
                </div>
                {expandedArticles.has(sumula.id) ? (
                  <ChevronUp className="w-5 h-5 text-blue-900" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {expandedArticles.has(sumula.id) && (
                <div className="px-6 pb-6 border-t border-gray-100">
                  <p className="text-gray-700 leading-relaxed text-base">{sumula.texto}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )
    }

    if (params.id === "constituicao" && currentLeg.content) {
      return (
        <div className="space-y-8">
          {/* Preâmbulo */}
          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">PREÂMBULO</h2>
            <p className="text-gray-700 leading-relaxed text-base italic">{currentLeg.content.preambulo}</p>
          </div>

          {/* Artigos */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-black mb-6">Artigos da Constituição Federal</h2>

            {currentLeg.content.titulos.map((titulo: any) => (
              <div key={titulo.id} className="space-y-4">
                <h3 className="text-xl font-bold text-blue-900 mt-8 mb-4">{titulo.nome}</h3>

                {titulo.artigos?.map((artigo: any) => (
                  <div
                    key={artigo.id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-blue-900/30 transition-colors"
                  >
                    <button
                      onClick={() => toggleArticle(artigo.id)}
                      className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
                    >
                      <h4 className="text-lg font-semibold text-black">{artigo.numero}</h4>
                      {expandedArticles.has(artigo.id) ? (
                        <ChevronUp className="w-5 h-5 text-blue-900" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>

                    {expandedArticles.has(artigo.id) && (
                      <div className="px-6 pb-6 space-y-4 border-t border-gray-100">
                        <p className="text-gray-700 leading-relaxed text-base">{artigo.texto}</p>
                        {artigo.incisos && (
                          <div className="pl-4 space-y-2 border-l-2 border-blue-900/20">
                            {artigo.incisos.map((inciso: string, idx: number) => (
                              <p key={idx} className="text-gray-600 text-sm">
                                {inciso}
                              </p>
                            ))}
                          </div>
                        )}
                        {artigo.paragrafo && <p className="text-gray-600 text-sm italic mt-4">{artigo.paragrafo}</p>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-4">
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <p className="text-gray-700 text-base leading-relaxed mb-6">
            O conteúdo completo desta legislação está sendo integrado ao LEX GO. Em breve você terá acesso direto a
            todos os artigos.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader />

      <main className="pt-24 pb-20">
        {/* Sticky Header */}
        <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-6 py-6">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center justify-between gap-6 mb-4">
              <Link href="/dashboard/vade-mecum">
                <Button variant="ghost" className="gap-2 text-gray-600 hover:text-black hover:bg-gray-100">
                  <ArrowLeft className="w-4 h-4" />
                  Voltar
                </Button>
              </Link>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-gray-600 hover:text-black hover:bg-gray-100">
                  <Bookmark className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-600 hover:text-black hover:bg-gray-100">
                  <Share2 className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-600 hover:text-black hover:bg-gray-100">
                  <Download className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-black mb-2 text-black">
                  <span className={`bg-gradient-to-r ${currentLeg.accentColor} bg-clip-text text-transparent`}>
                    {currentLeg.title}
                  </span>
                </h1>
                <p className="text-gray-600 font-mono text-sm">{currentLeg.subtitle}</p>
              </div>

              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Buscar artigo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 bg-gray-50 border border-gray-200 focus:border-blue-900 rounded-lg text-black placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-[1400px] mx-auto px-6 mt-12">
          <div className="grid lg:grid-cols-[280px_1fr] gap-8">
            {/* Sidebar - Table of Contents */}
            <aside className="hidden lg:block">
              <div className="sticky top-40 bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4 text-black flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-900" />
                  Índice
                </h3>
                <nav className="space-y-2">
                  <a
                    href="#preambulo"
                    className="block text-sm text-gray-600 hover:text-blue-900 transition-colors py-2 px-3 rounded hover:bg-gray-100"
                  >
                    Preâmbulo
                  </a>
                  <a
                    href="#titulo-1"
                    className="block text-sm text-gray-600 hover:text-blue-900 transition-colors py-2 px-3 rounded hover:bg-gray-100"
                  >
                    Título I - Dos Princípios Fundamentais
                  </a>
                  <a
                    href="#titulo-2"
                    className="block text-sm text-gray-600 hover:text-blue-900 transition-colors py-2 px-3 rounded hover:bg-gray-100"
                  >
                    Título II - Dos Direitos e Garantias Fundamentais
                  </a>
                  <a
                    href="#titulo-3"
                    className="block text-sm text-gray-600 hover:text-blue-900 transition-colors py-2 px-3 rounded hover:bg-gray-100"
                  >
                    Título III - Da Organização do Estado
                  </a>
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <div className="space-y-8">
              {renderContent()}

              {/* Call to Action */}
              <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                <h3 className="text-2xl font-bold text-black mb-4">Precisa de ajuda para interpretar?</h3>
                <p className="text-gray-600 mb-6">
                  Converse com o Juriton, nossa IA especializada em Direito, para esclarecer dúvidas sobre qualquer
                  artigo.
                </p>
                <Link href="/dashboard/juriton">
                  <Button className="bg-blue-900 text-white font-semibold hover:bg-blue-800">Falar com Juriton</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

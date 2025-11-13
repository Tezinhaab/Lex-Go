"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Video, Clock, Star, MapPin, Upload, CreditCard, QrCode, Check, Phone, Mail } from "lucide-react"
import Image from "next/image"
import { paymentService, scheduleService } from "@/lib/payments"
import { authService } from "@/lib/auth"

interface Advogado {
  id: string
  nome: string
  foto: string
  especialidade: string
  rating: number
  consultas: number
  disponivel: boolean
  preco: number
  localizacao?: string
}

export function ConsultoriaSection() {
  const [step, setStep] = useState<"form" | "payment" | "success">("form")
  const [assunto, setAssunto] = useState("")
  const [descricao, setDescricao] = useState("")
  const [advogadoSelecionado, setAdvogadoSelecionado] = useState<Advogado | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "cartao">("pix")

  const advogadosDisponiveis: Advogado[] = [
    {
      id: "1",
      nome: "Dra. Ana Carolina Silva",
      foto: "/professional-lawyer-woman.jpg",
      especialidade: "Direito do Trabalho",
      rating: 4.9,
      consultas: 342,
      disponivel: true,
      preco: 300,
      localizacao: "São Paulo, SP",
    },
    {
      id: "2",
      nome: "Dr. Roberto Mendes",
      foto: "/professional-lawyer-man.jpg",
      especialidade: "Direito Civil",
      rating: 4.8,
      consultas: 289,
      disponivel: true,
      preco: 300,
      localizacao: "Rio de Janeiro, RJ",
    },
    {
      id: "3",
      nome: "Dra. Juliana Santos",
      foto: "/professional-lawyer-woman-2.jpg",
      especialidade: "Direito Penal",
      rating: 5.0,
      consultas: 521,
      disponivel: true,
      preco: 300,
      localizacao: "Brasília, DF",
    },
    {
      id: "4",
      nome: "Dr. Felipe Oliveira",
      foto: "/professional-lawyer-man-2.jpg",
      especialidade: "Direito de Família",
      rating: 4.7,
      consultas: 198,
      disponivel: false,
      preco: 300,
      localizacao: "Belo Horizonte, MG",
    },
  ]

  const handleSolicitarConsulta = () => {
    if (assunto && descricao) {
      setStep("payment")
    }
  }

  const handlePagamento = async () => {
    const user = authService.getCurrentUser()
    if (!user) return

    try {
      const consultation = await paymentService.processPayment(
        {
          userId: user.id,
          lawyerId: advogadoSelecionado?.id || advogadosDisponiveis[0].id,
          lawyerName: advogadoSelecionado?.nome || advogadosDisponiveis[0].nome,
          subject: assunto,
          description: descricao,
          amount: 300,
          paymentMethod,
        },
        paymentMethod,
      )

      // Criar agendamento
      const schedule = scheduleService.createSchedule(
        consultation,
        new Date(Date.now() + 3600000).toISOString(), // 1 hora a partir de agora
      )

      setStep("success")
    } catch (error) {
      console.error("[v0] Erro ao processar pagamento:", error)
    }
  }

  return (
    <div className="space-y-6">
      {step === "form" && (
        <>
          <Card className="p-6 border-2 border-border bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                <Video className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Consultoria Jurídica Online</h2>
                <p className="text-muted-foreground mb-4">
                  Conecte-se com advogados especializados por videochamada. Tire suas dúvidas e receba orientação
                  profissional no conforto da sua casa.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-accent" />
                    <span>Atendimento imediato</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Video className="w-4 h-4 text-accent" />
                    <span>Por videochamada</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-accent">
                    <span className="text-2xl">R$ 300</span>
                    <span>por consulta</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-2 border-border">
            <h3 className="text-xl font-bold mb-4">Solicitar Consultoria</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="assunto">Assunto da Consultoria</Label>
                <Input
                  id="assunto"
                  placeholder="Ex: Rescisão de contrato, Pensão alimentícia, etc."
                  value={assunto}
                  onChange={(e) => setAssunto(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="descricao">Descrição Detalhada</Label>
                <Textarea
                  id="descricao"
                  placeholder="Descreva sua situação com o máximo de detalhes possível..."
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  className="mt-1 min-h-32"
                />
              </div>

              <div>
                <Label>Documentos (Opcional)</Label>
                <div className="mt-1 border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-accent transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Clique para anexar documentos
                    <br />
                    <span className="text-xs">PDF, JPG, PNG até 10MB</span>
                  </p>
                </div>
              </div>

              <Button
                onClick={handleSolicitarConsulta}
                disabled={!assunto || !descricao}
                className="w-full bg-accent hover:bg-accent/90 text-white font-bold h-12"
              >
                Continuar para Pagamento
              </Button>
            </div>
          </Card>

          <div>
            <h3 className="text-xl font-bold mb-4">Advogados Disponíveis</h3>
            <div className="grid gap-4">
              {advogadosDisponiveis.map((advogado) => (
                <Card key={advogado.id} className="p-4 border-2 border-border hover:border-accent transition-colors">
                  <div className="flex items-start gap-4">
                    <Image
                      src={advogado.foto || "/placeholder.svg"}
                      alt={advogado.nome}
                      width={80}
                      height={80}
                      className="rounded-full border-2 border-border"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-bold text-lg">{advogado.nome}</h4>
                          <p className="text-sm text-muted-foreground">{advogado.especialidade}</p>
                        </div>
                        {advogado.disponivel ? (
                          <Badge className="bg-green-500">Disponível</Badge>
                        ) : (
                          <Badge variant="secondary">Ocupado</Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-sm mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-accent text-accent" />
                          <span className="font-semibold">{advogado.rating}</span>
                        </div>
                        <div className="text-muted-foreground">{advogado.consultas} consultas</div>
                        {advogado.localizacao && (
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            <span>{advogado.localizacao}</span>
                          </div>
                        )}
                      </div>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="border-primary text-primary bg-transparent">
                            Ver Perfil Completo
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <PerfilAdvogado advogado={advogado} />
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}

      {step === "payment" && (
        <Card className="p-6 border-2 border-border max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-6">Pagamento da Consultoria</h3>

          <div className="bg-accent/10 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-lg">Consultoria Jurídica</span>
              <span className="text-2xl font-bold text-accent">R$ 300,00</span>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <Label>Método de Pagamento</Label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setPaymentMethod("pix")}
                className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-all ${
                  paymentMethod === "pix" ? "border-accent bg-accent/5" : "border-border"
                }`}
              >
                <QrCode className="w-8 h-8" />
                <span className="font-semibold">PIX</span>
              </button>
              <button
                onClick={() => setPaymentMethod("cartao")}
                className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-all ${
                  paymentMethod === "cartao" ? "border-accent bg-accent/5" : "border-border"
                }`}
              >
                <CreditCard className="w-8 h-8" />
                <span className="font-semibold">Cartão</span>
              </button>
            </div>
          </div>

          {paymentMethod === "pix" && (
            <div className="border-2 border-border rounded-lg p-6 text-center mb-6">
              <div className="w-48 h-48 bg-white mx-auto mb-4 flex items-center justify-center border-2 border-border rounded-lg">
                <QrCode className="w-32 h-32 text-foreground" />
              </div>
              <p className="text-sm text-muted-foreground mb-2">Escaneie o QR Code com seu app de pagamento</p>
              <p className="text-xs text-muted-foreground">Ou copie o código PIX abaixo:</p>
              <code className="block mt-2 p-2 bg-muted rounded text-xs break-all">
                00020126580014br.gov.bcb.pix0136a7f5-4a89-4864-9a0f-f1c3b8764d3e5204000053039865802BR5925LEX GO
                CONSULTORIA LTDA6009SAO PAULO62070503***63041D3D
              </code>
            </div>
          )}

          {paymentMethod === "cartao" && (
            <div className="space-y-4 mb-6">
              <div>
                <Label htmlFor="cardNumber">Número do Cartão</Label>
                <Input id="cardNumber" placeholder="0000 0000 0000 0000" className="mt-1" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="cardExpiry">Validade</Label>
                  <Input id="cardExpiry" placeholder="MM/AA" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="cardCvv">CVV</Label>
                  <Input id="cardCvv" placeholder="123" className="mt-1" />
                </div>
              </div>
              <div>
                <Label htmlFor="cardName">Nome no Cartão</Label>
                <Input id="cardName" placeholder="Nome como está no cartão" className="mt-1" />
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep("form")} className="flex-1">
              Voltar
            </Button>
            <Button onClick={handlePagamento} className="flex-1 bg-accent hover:bg-accent/90 text-white font-bold">
              Confirmar Pagamento
            </Button>
          </div>
        </Card>
      )}

      {step === "success" && (
        <Card className="p-8 border-2 border-border max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Pagamento Confirmado!</h3>
          <p className="text-muted-foreground mb-6">
            Estamos buscando um advogado disponível para sua consulta. Você receberá uma notificação em breve com os
            detalhes do atendimento.
          </p>

          <div className="bg-accent/10 rounded-lg p-4 mb-6 text-left">
            <h4 className="font-semibold mb-3">Resumo da Solicitação</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Assunto:</span>
                <span className="font-medium">{assunto}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Valor:</span>
                <span className="font-medium text-accent">R$ 300,00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Badge className="bg-green-500">Aguardando Advogado</Badge>
              </div>
            </div>
          </div>

          <Button onClick={() => setStep("form")} className="w-full bg-primary hover:bg-primary/90">
            Voltar para Comunidade
          </Button>
        </Card>
      )}
    </div>
  )
}

function PerfilAdvogado({ advogado }: { advogado: Advogado }) {
  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle className="text-2xl">Perfil do Advogado</DialogTitle>
      </DialogHeader>

      <div className="flex items-start gap-6">
        <Image
          src={advogado.foto || "/placeholder.svg"}
          alt={advogado.nome}
          width={120}
          height={120}
          className="rounded-full border-4 border-accent"
        />
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-1">{advogado.nome}</h3>
          <p className="text-accent font-semibold mb-3">{advogado.especialidade}</p>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-accent text-accent" />
              <span className="font-bold text-lg">{advogado.rating}</span>
            </div>
            <div className="text-muted-foreground">{advogado.consultas} consultas realizadas</div>
          </div>

          {advogado.disponivel ? (
            <Badge className="bg-green-500 text-white">Disponível Agora</Badge>
          ) : (
            <Badge variant="secondary">Ocupado</Badge>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-bold text-lg mb-2">Sobre</h4>
          <p className="text-muted-foreground">
            Advogado(a) com mais de 10 anos de experiência em {advogado.especialidade}, especializado em atender casos
            complexos e garantir os melhores resultados para seus clientes. Formado pela Universidade de São Paulo
            (USP), com pós-graduação em Direito Processual Civil.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-2">Conquistas e Feitos Importantes</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Vencedor do prêmio "Melhor Advogado Trabalhista" em 2023</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Mais de 500 casos ganhos com índice de sucesso de 92%</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Palestrante em congressos nacionais de Direito</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Autor de artigos publicados em revistas jurídicas renomadas</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-3">Informações de Contato</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-accent" />
              <span>(11) 98765-4321</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-accent" />
              <span>{advogado.nome.toLowerCase().replace(/\s+/g, ".")}@lexgo.com.br</span>
            </div>
            {advogado.localizacao && (
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-accent" />
                <span>
                  Escritório em {advogado.localizacao}
                  <br />
                  <span className="text-muted-foreground text-xs">Av. Paulista, 1000 - Sala 501</span>
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between bg-accent/10 rounded-lg p-4">
            <div>
              <p className="text-sm text-muted-foreground">Valor da Consultoria</p>
              <p className="text-2xl font-bold text-accent">R$ {advogado.preco},00</p>
            </div>
            <Button className="bg-accent hover:bg-accent/90 text-white font-bold">Solicitar Consulta</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

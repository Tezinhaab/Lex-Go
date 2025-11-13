"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DashboardHeader } from "@/components/dashboard-header"
import { paymentService, type LawyerWallet } from "@/lib/payments"
import { authService } from "@/lib/auth"
import { Wallet, TrendingUp, ArrowDownToLine, ArrowUpFromLine, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function WalletPage() {
  const [wallet, setWallet] = useState<LawyerWallet | null>(null)
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const user = authService.getCurrentUser()
    if (user) {
      const walletData = paymentService.getWallet(user.id)
      setWallet(walletData)
    }
  }, [])

  const handleWithdraw = () => {
    const user = authService.getCurrentUser()
    if (!user || !wallet) return

    const amount = Number.parseFloat(withdrawAmount)
    if (isNaN(amount) || amount <= 0) {
      alert("Valor inválido")
      return
    }

    if (amount > wallet.balance) {
      alert("Saldo insuficiente")
      return
    }

    setLoading(true)
    setTimeout(() => {
      const success = paymentService.withdraw(user.id, amount)
      if (success) {
        const updatedWallet = paymentService.getWallet(user.id)
        setWallet(updatedWallet)
        setWithdrawAmount("")
        alert("Saque realizado com sucesso!")
      }
      setLoading(false)
    }, 1500)
  }

  if (!wallet) return <div>Carregando...</div>

  return (
    <div className="min-h-screen bg-black">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-white mb-2">Carteira</h1>
          <p className="text-gray-400">Gerencie seus ganhos e realize saques</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-green-900/20 to-green-950/20 border-green-800">
            <div className="flex items-center justify-between mb-4">
              <Wallet className="w-8 h-8 text-green-500" />
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-sm text-gray-400 mb-1">Saldo Disponível</p>
            <p className="text-3xl font-black text-white">R$ {wallet.balance.toFixed(2)}</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-yellow-900/20 to-yellow-950/20 border-yellow-800">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
            <p className="text-sm text-gray-400 mb-1">Saldo Pendente</p>
            <p className="text-3xl font-black text-white">R$ {wallet.pendingBalance.toFixed(2)}</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-900/20 to-blue-950/20 border-blue-800">
            <div className="flex items-center justify-between mb-4">
              <ArrowUpFromLine className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-sm text-gray-400 mb-1">Total Recebido</p>
            <p className="text-3xl font-black text-white">
              R${" "}
              {(
                wallet.balance +
                wallet.transactions.reduce((sum, t) => (t.type === "withdrawal" ? sum + t.amount : sum), 0)
              ).toFixed(2)}
            </p>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 border-zinc-800">
            <h3 className="text-xl font-bold text-white mb-4">Realizar Saque</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Valor do Saque</label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="bg-zinc-900 border-zinc-800"
                />
              </div>
              <Button
                onClick={handleWithdraw}
                disabled={loading}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold"
              >
                {loading ? "Processando..." : "Solicitar Saque"}
              </Button>
              <p className="text-xs text-gray-500">
                O valor será depositado em sua conta bancária cadastrada em até 2 dias úteis
              </p>
            </div>
          </Card>

          <Card className="p-6 border-zinc-800">
            <h3 className="text-xl font-bold text-white mb-4">Histórico de Transações</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {wallet.transactions.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Nenhuma transação ainda</p>
              ) : (
                wallet.transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                    <div className="flex items-center gap-3">
                      {transaction.type === "deposit" ? (
                        <ArrowDownToLine className="w-5 h-5 text-green-500" />
                      ) : (
                        <ArrowUpFromLine className="w-5 h-5 text-red-500" />
                      )}
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {transaction.type === "deposit" ? "Recebimento" : "Saque"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(transaction.createdAt).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${transaction.type === "deposit" ? "text-green-500" : "text-red-500"}`}>
                        {transaction.type === "deposit" ? "+" : "-"} R$ {transaction.amount.toFixed(2)}
                      </p>
                      <Badge variant={transaction.status === "completed" ? "default" : "secondary"} className="text-xs">
                        {transaction.status === "completed" ? "Concluído" : "Pendente"}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}

"use client"

export interface Consultation {
  id: string
  userId: string
  lawyerId: string
  lawyerName: string
  subject: string
  description: string
  amount: number
  status: "pending" | "scheduled" | "completed" | "cancelled"
  scheduledAt?: string
  createdAt: string
  paymentMethod: "pix" | "card"
  documents?: string[]
}

export interface LawyerWallet {
  lawyerId: string
  balance: number
  pendingBalance: number
  transactions: WalletTransaction[]
}

export interface WalletTransaction {
  id: string
  consultationId: string
  amount: number
  type: "deposit" | "withdrawal"
  status: "pending" | "completed"
  createdAt: string
}

export const paymentService = {
  // Processar pagamento de consultoria
  processPayment: async (
    consultation: Omit<Consultation, "id" | "createdAt" | "status">,
    paymentMethod: "pix" | "card",
  ): Promise<Consultation> => {
    // Simula processamento de pagamento
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const newConsultation: Consultation = {
      ...consultation,
      id: "consult_" + Date.now(),
      status: "pending",
      createdAt: new Date().toISOString(),
      paymentMethod,
    }

    // Salva consulta
    const consultations = paymentService.getConsultations()
    consultations.push(newConsultation)
    localStorage.setItem("lexgo_consultations", JSON.stringify(consultations))

    // Adiciona valor pendente na carteira do advogado
    paymentService.addPendingToWallet(consultation.lawyerId, consultation.amount * 0.8) // 80% para o advogado

    return newConsultation
  },

  // Buscar consultas do usuário
  getConsultations: (): Consultation[] => {
    if (typeof window === "undefined") return []
    const consultationsStr = localStorage.getItem("lexgo_consultations")
    return consultationsStr ? JSON.parse(consultationsStr) : []
  },

  // Completar consulta
  completeConsultation: (consultationId: string) => {
    const consultations = paymentService.getConsultations()
    const consultation = consultations.find((c) => c.id === consultationId)

    if (consultation) {
      consultation.status = "completed"
      localStorage.setItem("lexgo_consultations", JSON.stringify(consultations))

      // Transfere valor pendente para disponível na carteira
      paymentService.confirmWalletBalance(consultation.lawyerId, consultation.amount * 0.8)
    }
  },

  // Gerenciar carteira do advogado
  getWallet: (lawyerId: string): LawyerWallet => {
    if (typeof window === "undefined") return { lawyerId, balance: 0, pendingBalance: 0, transactions: [] }
    const walletsStr = localStorage.getItem("lexgo_wallets")
    const wallets: LawyerWallet[] = walletsStr ? JSON.parse(walletsStr) : []

    const wallet = wallets.find((w) => w.lawyerId === lawyerId)
    if (wallet) return wallet

    return { lawyerId, balance: 0, pendingBalance: 0, transactions: [] }
  },

  addPendingToWallet: (lawyerId: string, amount: number) => {
    const walletsStr = localStorage.getItem("lexgo_wallets")
    const wallets: LawyerWallet[] = walletsStr ? JSON.parse(walletsStr) : []

    let wallet = wallets.find((w) => w.lawyerId === lawyerId)
    if (!wallet) {
      wallet = { lawyerId, balance: 0, pendingBalance: 0, transactions: [] }
      wallets.push(wallet)
    }

    wallet.pendingBalance += amount
    localStorage.setItem("lexgo_wallets", JSON.stringify(wallets))
  },

  confirmWalletBalance: (lawyerId: string, amount: number) => {
    const walletsStr = localStorage.getItem("lexgo_wallets")
    const wallets: LawyerWallet[] = walletsStr ? JSON.parse(walletsStr) : []

    const wallet = wallets.find((w) => w.lawyerId === lawyerId)
    if (wallet) {
      wallet.pendingBalance -= amount
      wallet.balance += amount

      wallet.transactions.push({
        id: "trans_" + Date.now(),
        consultationId: "consult_" + Date.now(),
        amount,
        type: "deposit",
        status: "completed",
        createdAt: new Date().toISOString(),
      })

      localStorage.setItem("lexgo_wallets", JSON.stringify(wallets))
    }
  },

  // Retirar saldo
  withdraw: (lawyerId: string, amount: number): boolean => {
    const walletsStr = localStorage.getItem("lexgo_wallets")
    const wallets: LawyerWallet[] = walletsStr ? JSON.parse(walletsStr) : []

    const wallet = wallets.find((w) => w.lawyerId === lawyerId)
    if (!wallet || wallet.balance < amount) return false

    wallet.balance -= amount
    wallet.transactions.push({
      id: "trans_" + Date.now(),
      consultationId: "",
      amount,
      type: "withdrawal",
      status: "completed",
      createdAt: new Date().toISOString(),
    })

    localStorage.setItem("lexgo_wallets", JSON.stringify(wallets))
    return true
  },
}

// Sistema de agendamento
export interface Schedule {
  id: string
  lawyerId: string
  userId: string
  consultationId: string
  dateTime: string
  duration: number // em minutos
  meetingLink: string
  status: "scheduled" | "ongoing" | "completed" | "cancelled"
}

export const scheduleService = {
  createSchedule: (consultation: Consultation, dateTime: string): Schedule => {
    const schedule: Schedule = {
      id: "sched_" + Date.now(),
      lawyerId: consultation.lawyerId,
      userId: consultation.userId,
      consultationId: consultation.id,
      dateTime,
      duration: 60,
      meetingLink: `https://meet.lexgo.com/${Date.now()}`,
      status: "scheduled",
    }

    const schedules = scheduleService.getSchedules()
    schedules.push(schedule)
    localStorage.setItem("lexgo_schedules", JSON.stringify(schedules))

    return schedule
  },

  getSchedules: (): Schedule[] => {
    if (typeof window === "undefined") return []
    const schedulesStr = localStorage.getItem("lexgo_schedules")
    return schedulesStr ? JSON.parse(schedulesStr) : []
  },

  getUserSchedules: (userId: string): Schedule[] => {
    return scheduleService.getSchedules().filter((s) => s.userId === userId)
  },
}

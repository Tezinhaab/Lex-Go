"use client"

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: "student" | "lawyer" | "admin"
  bio?: string
  phone?: string
  location?: string
  officeAddress?: string
  areaOfInterest: string[]
  lookingForJob: boolean
  xp: number
  level: number
  streak: number
  joinedAt: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

// Simula autenticação com localStorage
export const authService = {
  getCurrentUser: (): User | null => {
    if (typeof window === "undefined") return null
    const userStr = localStorage.getItem("lexgo_user")
    return userStr ? JSON.parse(userStr) : null
  },

  login: async (email: string, password: string): Promise<User> => {
    // Simula chamada de API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user: User = {
      id: "user_" + Date.now(),
      email,
      name: email.split("@")[0],
      role: "student",
      areaOfInterest: [],
      lookingForJob: false,
      xp: 0,
      level: 1,
      streak: 0,
      joinedAt: new Date().toISOString(),
    }

    localStorage.setItem("lexgo_user", JSON.stringify(user))
    return user
  },

  signup: async (email: string, password: string, name: string): Promise<User> => {
    // Simula chamada de API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user: User = {
      id: "user_" + Date.now(),
      email,
      name,
      role: "student",
      areaOfInterest: [],
      lookingForJob: false,
      xp: 0,
      level: 1,
      streak: 0,
      joinedAt: new Date().toISOString(),
    }

    localStorage.setItem("lexgo_user", JSON.stringify(user))
    return user
  },

  updateUser: (updates: Partial<User>): User | null => {
    const user = authService.getCurrentUser()
    if (!user) return null

    const updatedUser = { ...user, ...updates }
    localStorage.setItem("lexgo_user", JSON.stringify(updatedUser))
    return updatedUser
  },

  logout: () => {
    localStorage.removeItem("lexgo_user")
  },
}

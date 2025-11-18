"use client"

interface ShopItem {
  id: string
  name: string
  description: string
  price: number
  type: "avatar" | "theme" | "badge" | "discount"
  image: string
  isPurchased?: boolean
}

export const shopService = {
  getItems: (): ShopItem[] => {
    if (typeof window === "undefined") return []
    const itemsStr = localStorage.getItem("lexgo_shop_items")
    return itemsStr ? JSON.parse(itemsStr) : getDefaultShopItems()
  },

  purchaseItem: (itemId: string, userPoints: number): { success: boolean; message: string } => {
    const items = shopService.getItems()
    const item = items.find((i) => i.id === itemId)

    if (!item) {
      return { success: false, message: "Item não encontrado" }
    }

    if (item.isPurchased) {
      return { success: false, message: "Você já possui este item" }
    }

    if (userPoints < item.price) {
      return { success: false, message: "Pontos insuficientes" }
    }

    item.isPurchased = true
    localStorage.setItem("lexgo_shop_items", JSON.stringify(items))

    return { success: true, message: "Item adquirido com sucesso!" }
  },

  getUserPurchases: (): ShopItem[] => {
    return shopService.getItems().filter((item) => item.isPurchased)
  },
}

function getDefaultShopItems(): ShopItem[] {
  return [
    {
      id: "avatar_judge",
      name: "Avatar Juiz",
      description: "Avatar exclusivo de juiz com toga para seu perfil",
      price: 500,
      type: "avatar",
      image: "/judge-avatar-icon.jpg",
    },
    {
      id: "avatar_lawyer",
      name: "Avatar Advogado",
      description: "Avatar profissional de advogado com terno",
      price: 500,
      type: "avatar",
      image: "/placeholder.svg?height=200&width=200&text=Advogado",
    },
    {
      id: "avatar_prosecutor",
      name: "Avatar Promotor",
      description: "Avatar de promotor de justiça",
      price: 750,
      type: "avatar",
      image: "/placeholder.svg?height=200&width=200&text=Promotor",
    },
    {
      id: "theme_gold",
      name: "Tema Ouro Escuro",
      description: "Tema premium com detalhes dourados e animações exclusivas",
      price: 1000,
      type: "theme",
      image: "/gold-dark-theme.jpg",
    },
    {
      id: "theme_blue",
      name: "Tema Azul Justiça",
      description: "Tema azul elegante inspirado nos tribunais",
      price: 800,
      type: "theme",
      image: "/placeholder.svg?height=200&width=200&text=Tema+Azul",
    },
    {
      id: "theme_red",
      name: "Tema Vermelho Imperial",
      description: "Tema vermelho sofisticado com bordas douradas",
      price: 800,
      type: "theme",
      image: "/placeholder.svg?height=200&width=200&text=Tema+Vermelho",
    },
    {
      id: "badge_expert",
      name: "Badge Especialista",
      description: "Badge especial de especialista para destacar seu perfil",
      price: 750,
      type: "badge",
      image: "/expert-badge-icon.jpg",
    },
    {
      id: "badge_master",
      name: "Badge Mestre do Direito",
      description: "Badge raro de mestre para os mais dedicados",
      price: 1500,
      type: "badge",
      image: "/placeholder.svg?height=200&width=200&text=Mestre",
    },
    {
      id: "badge_legend",
      name: "Badge Lendário",
      description: "Badge lendário exclusivo para os top 1%",
      price: 3000,
      type: "badge",
      image: "/placeholder.svg?height=200&width=200&text=Lendário",
    },
    {
      id: "discount_20",
      name: "20% OFF Consultoria",
      description: "Desconto de 20% na próxima consultoria jurídica",
      price: 1500,
      type: "discount",
      image: "/discount-coupon.png",
    },
    {
      id: "discount_30",
      name: "30% OFF Consultoria",
      description: "Desconto especial de 30% na próxima consultoria",
      price: 2000,
      type: "discount",
      image: "/placeholder.svg?height=200&width=200&text=30%+OFF",
    },
    {
      id: "discount_50",
      name: "50% OFF Consultoria",
      description: "Super desconto de 50% na próxima consultoria",
      price: 3500,
      type: "discount",
      image: "/placeholder.svg?height=200&width=200&text=50%+OFF",
    },
  ]
}

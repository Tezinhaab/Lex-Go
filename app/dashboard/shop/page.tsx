"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { shopService } from "@/lib/store"
import { authService } from "@/lib/auth"
import { ShoppingBag, Star, Check, Lock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function ShopPage() {
  const [items, setItems] = useState(shopService.getItems())
  const [user, setUser] = useState(authService.getCurrentUser())
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const handlePurchase = () => {
    if (!user || !selectedItem) return

    const result = shopService.purchaseItem(selectedItem.id, user.xp)

    if (result.success) {
      // Deduzir pontos do usuário
      authService.updateUser({ xp: user.xp - selectedItem.price })
      setUser(authService.getCurrentUser())
      setItems(shopService.getItems())
      alert(result.message)
    } else {
      alert(result.message)
    }

    setShowConfirmDialog(false)
    setSelectedItem(null)
  }

  const openPurchaseDialog = (item: any) => {
    if (item.isPurchased) return
    setSelectedItem(item)
    setShowConfirmDialog(true)
  }

  return (
    <div className="min-h-screen bg-black">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-white mb-2">Lojinha LEX GO</h1>
            <p className="text-gray-400">Troque seus pontos por itens exclusivos</p>
          </div>
          <Card className="p-4 bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border-yellow-800">
            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-400">Seus Pontos</p>
                <p className="text-2xl font-black text-white">{user?.xp || 0}</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="mb-6 flex gap-4">
          <Button variant="outline" className="bg-white/5 border-white/10">
            Todos
          </Button>
          <Button variant="ghost">Avatares</Button>
          <Button variant="ghost">Temas</Button>
          <Button variant="ghost">Badges</Button>
          <Button variant="ghost">Descontos</Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Card
              key={item.id}
              className={`relative overflow-hidden border-2 transition-all ${
                item.isPurchased
                  ? "border-green-800 bg-green-950/10"
                  : "border-zinc-800 hover:border-yellow-800 cursor-pointer"
              }`}
              onClick={() => !item.isPurchased && openPurchaseDialog(item)}
            >
              {item.isPurchased && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-green-500">
                    <Check className="w-3 h-3 mr-1" />
                    Adquirido
                  </Badge>
                </div>
              )}

              <div className="aspect-square bg-gradient-to-br from-zinc-900 to-zinc-950 flex items-center justify-center p-8">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={200}
                  height={200}
                  className={`object-contain ${item.isPurchased ? "opacity-50" : ""}`}
                />
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-lg text-white">{item.name}</h3>
                  <Badge variant={getTypeBadge(item.type)}>
                    {item.type === "avatar" && "Avatar"}
                    {item.type === "theme" && "Tema"}
                    {item.type === "badge" && "Badge"}
                    {item.type === "discount" && "Desconto"}
                  </Badge>
                </div>

                <p className="text-sm text-gray-400 mb-4">{item.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="text-xl font-bold text-white">{item.price}</span>
                    <span className="text-sm text-gray-400">pontos</span>
                  </div>

                  {item.isPurchased ? (
                    <Button disabled className="bg-green-600">
                      <Check className="w-4 h-4 mr-2" />
                      Adquirido
                    </Button>
                  ) : (user?.xp || 0) >= item.price ? (
                    <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold">
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Comprar
                    </Button>
                  ) : (
                    <Button disabled className="bg-zinc-800">
                      <Lock className="w-4 h-4 mr-2" />
                      Bloqueado
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <DialogContent className="bg-zinc-950 border-zinc-800">
            <DialogHeader>
              <DialogTitle className="text-2xl text-white">Confirmar Compra</DialogTitle>
            </DialogHeader>

            {selectedItem && (
              <div className="space-y-6">
                <div className="aspect-square bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-lg flex items-center justify-center p-8">
                  <Image
                    src={selectedItem.image || "/placeholder.svg"}
                    alt={selectedItem.name}
                    width={200}
                    height={200}
                    className="object-contain"
                  />
                </div>

                <div>
                  <h3 className="font-bold text-xl text-white mb-2">{selectedItem.name}</h3>
                  <p className="text-gray-400 mb-4">{selectedItem.description}</p>

                  <div className="bg-zinc-900 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Preço</span>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="font-bold text-white">{selectedItem.price} pontos</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Seus pontos atuais</span>
                      <span className="font-bold text-white">{user?.xp || 0} pontos</span>
                    </div>
                    <div className="border-t border-zinc-800 pt-3 flex justify-between">
                      <span className="text-gray-400">Saldo após compra</span>
                      <span className="font-bold text-yellow-500">{(user?.xp || 0) - selectedItem.price} pontos</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setShowConfirmDialog(false)} className="flex-1">
                    Cancelar
                  </Button>
                  <Button
                    onClick={handlePurchase}
                    className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold"
                  >
                    Confirmar Compra
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}

function getTypeBadge(type: string) {
  switch (type) {
    case "avatar":
      return "default"
    case "theme":
      return "secondary"
    case "badge":
      return "outline"
    case "discount":
      return "destructive"
    default:
      return "default"
  }
}

import { DashboardHeader } from "@/components/dashboard-header"
import { AchievementsGrid } from "@/components/achievements-grid"
import { Sparkles, Trophy, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AchievementsPage() {
  const totalPoints = 2450
  const unlockedAchievements = 24
  const totalAchievements = 120

  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-black mb-2">Suas Conquistas</h1>
              <p className="text-gray-600">
                Desbloqueie conquistas estudando, participando da comunidade e atingindo marcos importantes
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white border-2 border-gray-200 p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-[#1E3A8A]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pontos Totais</p>
                  <p className="text-3xl font-bold text-[#1E3A8A]">{totalPoints}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">Use na lojinha</p>
            </div>

            <div className="bg-white border-2 border-gray-200 p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Conquistas</p>
                  <p className="text-3xl font-bold text-black">
                    {unlockedAchievements}/{totalAchievements}
                  </p>
                </div>
              </div>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#1E3A8A] rounded-full h-2 transition-all duration-500"
                  style={{ width: `${(unlockedAchievements / totalAchievements) * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-white border-2 border-gray-200 p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Lojinha</p>
                  <p className="text-lg font-bold text-black">Em breve</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="mt-2 w-full border-gray-300 bg-transparent" disabled>
                Troque seus pontos
              </Button>
            </div>
          </div>
        </div>

        {/* Achievements Grid */}
        <AchievementsGrid />
      </main>
    </div>
  )
}

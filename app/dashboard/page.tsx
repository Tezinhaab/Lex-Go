import { DashboardHome } from "@/components/dashboard-home"
import { DashboardHeader } from "@/components/dashboard-header"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black">
      <DashboardHeader />
      <DashboardHome />
    </div>
  )
}

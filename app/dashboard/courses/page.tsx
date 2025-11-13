import { DashboardHeader } from "@/components/dashboard-header"
import { MyCoursesGrid } from "@/components/my-courses-grid"

export default function MyCoursesPage() {
  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-balance text-black">Meus Cursos</h1>
          <p className="text-gray-600 text-lg">Continue aprendendo de onde você parou</p>
        </div>
        <MyCoursesGrid />
      </main>
    </div>
  )
}

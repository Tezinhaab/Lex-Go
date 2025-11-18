import { SubjectPath } from "@/components/subject-path"
import { DashboardHeader } from "@/components/dashboard-header"

export default function CoursePage({ params }: { params: { courseId: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <SubjectPath courseId={params.courseId} />
      </main>
    </div>
  )
}

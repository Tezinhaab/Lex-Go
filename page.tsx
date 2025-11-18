import { Hero } from "@/components/hero"
import { FullscreenShowcase } from "@/components/fullscreen-showcase"
import { Features } from "@/components/features"
import { Stats } from "@/components/stats"
import { CTA } from "@/components/cta"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FullscreenShowcase />
      <Stats />
      <Features />
      <CTA />
    </main>
  )
}

export function Stats() {
  const stats = [
    { value: "50K+", label: "Usuários Ativos" },
    { value: "200+", label: "Lições" },
    { value: "15min", label: "Por Dia" },
    { value: "98%", label: "Satisfação" },
  ]

  return (
    <section className="py-16 md:py-20 bg-white border-y border-border">
      <div className="container px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center space-y-2 p-6 rounded-lg hover:bg-muted/50 transition-all">
              <div className="text-3xl md:text-4xl font-black text-foreground">{stat.value}</div>
              <div className="text-sm md:text-base text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

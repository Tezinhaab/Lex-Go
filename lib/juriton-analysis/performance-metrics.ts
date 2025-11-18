// Análise de performance das respostas do Juriton

export interface ToolCallMetrics {
  toolName: string
  called: boolean
  correctSchema: boolean
  correctArguments: boolean
  executedSuccessfully: boolean
  errorMessage?: string
}

export interface ResponseMetrics {
  queryId: string
  query: string
  responseQuality: number
  toolCalls: ToolCallMetrics[]
  tokensUsed: number
  executionTime: number
  timestamp: Date
  backend: string
}

export interface PerformanceAnalysis {
  totalQueries: number
  averageQuality: number
  passRate: number
  toolSuccessRates: Record<string, number>
  averageExecutionTime: number
  averageTokensUsed: number
  errorRate: number
}

export function analyzePerformance(metrics: ResponseMetrics[]): PerformanceAnalysis {
  if (metrics.length === 0) {
    return {
      totalQueries: 0,
      averageQuality: 0,
      passRate: 0,
      toolSuccessRates: {},
      averageExecutionTime: 0,
      averageTokensUsed: 0,
      errorRate: 0,
    }
  }

  const qualitySum = metrics.reduce((sum, m) => sum + m.responseQuality, 0)
  const timeSum = metrics.reduce((sum, m) => sum + m.executionTime, 0)
  const tokensSum = metrics.reduce((sum, m) => sum + m.tokensUsed, 0)

  let totalToolCalls = 0
  let successfulToolCalls = 0
  const toolSuccessRates: Record<string, { success: number; total: number }> = {}

  metrics.forEach((m) => {
    m.toolCalls.forEach((tc) => {
      totalToolCalls++
      if (tc.executedSuccessfully) successfulToolCalls++

      if (!toolSuccessRates[tc.toolName]) {
        toolSuccessRates[tc.toolName] = { success: 0, total: 0 }
      }
      toolSuccessRates[tc.toolName].total++
      if (tc.executedSuccessfully) {
        toolSuccessRates[tc.toolName].success++
      }
    })
  })

  const toolRates: Record<string, number> = {}
  Object.entries(toolSuccessRates).forEach(([tool, rates]) => {
    toolRates[tool] = rates.total > 0 ? rates.success / rates.total : 0
  })

  return {
    totalQueries: metrics.length,
    averageQuality: qualitySum / metrics.length,
    passRate: totalToolCalls > 0 ? successfulToolCalls / totalToolCalls : 0,
    toolSuccessRates: toolRates,
    averageExecutionTime: timeSum / metrics.length,
    averageTokensUsed: tokensSum / metrics.length,
    errorRate: metrics.filter((m) => m.responseQuality < 50).length / metrics.length,
  }
}

export function printAnalysis(analysis: PerformanceAnalysis): void {
  console.log('\n=== JURITON PERFORMANCE ANALYSIS ===')
  console.log(`Total Queries: ${analysis.totalQueries}`)
  console.log(`Average Quality: ${analysis.averageQuality.toFixed(2)}/100`)
  console.log(`Tool Call Pass Rate: ${(analysis.passRate * 100).toFixed(2)}%`)
  console.log(`Average Execution Time: ${analysis.averageExecutionTime.toFixed(2)}ms`)
  console.log(`Average Tokens Used: ${analysis.averageTokensUsed.toFixed(0)}`)
  console.log(`Error Rate: ${(analysis.errorRate * 100).toFixed(2)}%`)
  console.log('\nTool Success Rates:')
  Object.entries(analysis.toolSuccessRates).forEach(([tool, rate]) => {
    console.log(`  ${tool}: ${(rate * 100).toFixed(2)}%`)
  })
}

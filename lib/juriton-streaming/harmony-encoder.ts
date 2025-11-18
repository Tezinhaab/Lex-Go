export interface HarmonyMessage {
  role: "user" | "assistant" | "system" | "tool"
  content: string
  metadata?: {
    channel?: string
    recipient?: string
    reasoning?: string
  }
}

export interface HarmonyStructure {
  messages: HarmonyMessage[]
  reasoning?: string
  toolCalls?: Array<{
    name: string
    parameters: Record<string, any>
  }>
  finalAnswer: string
}

export const harmonyEncoder = {
  encodeConversation: (messages: HarmonyMessage[]): HarmonyStructure => {
    const reasoning: string[] = []
    const toolCalls: Array<{ name: string; parameters: Record<string, any> }> = []
    let finalAnswer = ""

    for (const msg of messages) {
      if (msg.metadata?.reasoning) {
        reasoning.push(msg.metadata.reasoning)
      }

      if (msg.metadata?.recipient) {
        const match = msg.content.match(/call_(\w+)$$(.*?)$$/s)
        if (match) {
          toolCalls.push({
            name: match[1],
            parameters: parseParameters(match[2]),
          })
        }
      }

      if (msg.role === "assistant" && !msg.metadata?.recipient) {
        finalAnswer = msg.content
      }
    }

    return {
      messages,
      reasoning: reasoning.join("\n"),
      toolCalls: toolCalls.length > 0 ? toolCalls : undefined,
      finalAnswer,
    }
  },

  parseStructuredResponse: (text: string): HarmonyStructure => {
    const structure: HarmonyStructure = {
      messages: [],
      finalAnswer: text,
    }

    const reasoningMatches = [...text.matchAll(/<reasoning>(.*?)<\/reasoning>/gs)]
    if (reasoningMatches.length > 0) {
      structure.reasoning = reasoningMatches.map(m => m[1]).join("\n")
    }

    const toolMatches = [...text.matchAll(/<tool_call>(.*?)<\/tool_call>/gs)]
    if (toolMatches.length > 0) {
      structure.toolCalls = toolMatches.map(m => {
        try {
          return JSON.parse(m[1])
        } catch {
          return { name: "unknown", parameters: {} }
        }
      })
    }

    return structure
  },
}

function parseParameters(paramStr: string): Record<string, any> {
  try {
    return JSON.parse(paramStr)
  } catch {
    return { raw: paramStr }
  }
}

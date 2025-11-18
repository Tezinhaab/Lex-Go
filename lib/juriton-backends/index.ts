// Backend abstrato com suporte a múltiplos LLMs

export type LLMBackendType = 'groq' | 'vllm' | 'ollama' | 'openai'

export interface LLMBackendConfig {
  type: LLMBackendType
  modelName: string
  apiUrl?: string
  apiKey?: string
  maxTokens: number
  temperature?: number
}

export interface LLMResponse {
  content: string
  tokensUsed: number
  backend: LLMBackendType
}

export async function getLLMResponse(
  prompt: string,
  config: LLMBackendConfig
): Promise<LLMResponse> {
  switch (config.type) {
    case 'groq':
      return { content: prompt + ' [Groq Response]', tokensUsed: 100, backend: 'groq' }
    case 'vllm':
      return { content: prompt + ' [vLLM Response]', tokensUsed: 100, backend: 'vllm' }
    case 'ollama':
      return { content: prompt + ' [Ollama Response]', tokensUsed: 100, backend: 'ollama' }
    case 'openai':
      return { content: prompt + ' [OpenAI Response]', tokensUsed: 100, backend: 'openai' }
    default:
      throw new Error(`Unknown backend type: ${config.type}`)
  }
}

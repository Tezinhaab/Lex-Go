export interface LLMProviderConfig {
  name: string
  apiBaseUrl: string
  apiKey: string
  modelName: string
  apiType: ("chat" | "responses")[]
  providerDetails?: Record<string, any>
}

export const PROVIDERS: Record<string, LLMProviderConfig> = {
  openai: {
    name: "OpenAI",
    apiBaseUrl: "https://api.openai.com/v1",
    apiKey: process.env.OPENAI_API_KEY || "",
    modelName: "gpt-4-turbo",
    apiType: ["chat", "responses"],
    providerDetails: {
      organizationId: process.env.OPENAI_ORG_ID
    }
  },

  groq: {
    name: "Groq",
    apiBaseUrl: "https://api.groq.com/openai/v1",
    apiKey: process.env.GROQ_API_KEY || "",
    modelName: "mixtral-8x7b-32768",
    apiType: ["chat"],
    providerDetails: {
      rateLimit: 30
    }
  },

  vllm: {
    name: "vLLM",
    apiBaseUrl: process.env.VLLM_BASE_URL || "http://localhost:8000/v1",
    apiKey: process.env.VLLM_API_KEY || "vllm",
    modelName: "openai/gpt-oss-120b",
    apiType: ["chat"],
    providerDetails: {
      timeout: 60000
    }
  },

  ollama: {
    name: "Ollama",
    apiBaseUrl: process.env.OLLAMA_BASE_URL || "http://localhost:11434/v1",
    apiKey: "ollama",
    modelName: process.env.OLLAMA_MODEL || "neural-chat",
    apiType: ["chat"],
    providerDetails: {
      timeout: 120000
    }
  }
}

export function getProvider(providerName: string): LLMProviderConfig | null {
  return PROVIDERS[providerName.toLowerCase()] || null
}

export function listAvailableProviders(): string[] {
  return Object.keys(PROVIDERS)
}

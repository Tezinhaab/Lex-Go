"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface JuritonSettings {
  backend: "groq" | "vllm" | "ollama" | "local"
  endpoint?: string
  apiKey?: string
  modelName: string
}

export function JuritonSettings() {
  const [settings, setSettings] = useState<JuritonSettings>({
    backend: "local",
    modelName: "gpt-oss-20b",
  })

  return (
    <div className="w-full max-w-2xl bg-white p-6 rounded-lg border border-gray-200">
      <h2 className="text-xl font-bold text-black mb-4">Configurações do Juriton</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-black mb-2">Backend de IA</label>
          <select
            value={settings.backend}
            onChange={(e) => setSettings({ ...settings, backend: e.target.value as any })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
          >
            <option value="local">Local (Simulado)</option>
            <option value="groq">Groq Cloud</option>
            <option value="vllm">vLLM Server</option>
            <option value="ollama">Ollama Local</option>
          </select>
        </div>

        {settings.backend === "vllm" && (
          <div>
            <label className="block text-sm font-semibold text-black mb-2">Endpoint vLLM</label>
            <Input
              placeholder="http://localhost:8000"
              defaultValue="http://localhost:8000"
              className="text-black"
            />
          </div>
        )}

        {settings.backend === "groq" && (
          <div>
            <label className="block text-sm font-semibold text-black mb-2">API Key Groq</label>
            <Input
              type="password"
              placeholder="Sua API Key do Groq"
              className="text-black"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-black mb-2">Modelo</label>
          <Input
            value={settings.modelName}
            onChange={(e) => setSettings({ ...settings, modelName: e.target.value })}
            placeholder="gpt-oss-20b"
            className="text-black"
          />
        </div>

        <Button className="w-full bg-[#1E3A8A] text-white hover:bg-[#152B5E]">
          Salvar Configurações
        </Button>
      </div>
    </div>
  )
}

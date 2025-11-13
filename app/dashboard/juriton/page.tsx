"use client"

import type React from "react"
import { juritonService } from "@/lib/juriton-ai"
import { authService } from "@/lib/auth"

import { useState, useRef, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Paperclip, FileText, Download, Trash2, Plus } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "juriton"
  timestamp: Date
  attachments?: { name: string; type: string; url: string }[]
}

interface Chat {
  id: string
  title: string
  lastMessage: string
  timestamp: Date
}

export default function JuritonPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Olá! Sou o Juriton, sua IA especializada em Direito. Posso ajudar com minutas, jurisprudências, petições e muito mais. Como posso te auxiliar?",
      sender: "juriton",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [chats, setChats] = useState<Chat[]>([
    {
      id: "1",
      title: "Nova conversa",
      lastMessage: "Olá! Sou o Juriton...",
      timestamp: new Date(),
    },
  ])
  const [currentChatId, setCurrentChatId] = useState("1")

  const scrollRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const quickActions = [
    { label: "Criar Minuta", prompt: "Preciso que você crie uma minuta de contrato" },
    { label: "Buscar Jurisprudência", prompt: "Quero buscar jurisprudências sobre" },
    { label: "Redigir Petição", prompt: "Preciso de ajuda para redigir uma petição" },
    { label: "Analisar Documento", prompt: "Gostaria que você analisasse este documento" },
  ]

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim() && selectedFiles.length === 0) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
      attachments: selectedFiles.map((file) => ({
        name: file.name,
        type: file.type,
        url: URL.createObjectURL(file),
      })),
    }

    setMessages((prev) => [...prev, userMessage])
    const messageInput = inputValue
    setInputValue("")
    setSelectedFiles([])
    setIsTyping(true)

    try {
      const context = messages.map((m) => m.content)
      const response = await juritonService.generateResponse(messageInput, context)

      const juritonMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "juriton",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, juritonMessage])

      const user = authService.getCurrentUser()
      if (user) {
        juritonService.saveConversation(user.id, [...messages, userMessage, juritonMessage])
      }
    } catch (error) {
      console.error("Error:", error)
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content: "Desculpe, ocorreu um erro. Tente novamente.",
          sender: "juriton",
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  const handleQuickAction = (prompt: string) => {
    setInputValue(prompt)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files))
    }
  }

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: "Nova conversa",
      lastMessage: "Iniciando conversa...",
      timestamp: new Date(),
    }
    setChats((prev) => [newChat, ...prev])
    setCurrentChatId(newChat.id)
    setMessages([
      {
        id: "1",
        content: "Olá! Sou o Juriton, sua IA especializada em Direito. Como posso ajudar?",
        sender: "juriton",
        timestamp: new Date(),
      },
    ])
  }

  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader />

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar de conversas - Desktop */}
        <div className="hidden lg:flex flex-col w-80 border-r border-gray-200 bg-white">
          <div className="p-4 border-b border-gray-200">
            <Button onClick={createNewChat} className="w-full gap-2 bg-[#1E3A8A] text-white hover:bg-[#152B5E]">
              <Plus className="w-4 h-4" />
              Nova Conversa
            </Button>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-2">
              {chats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setCurrentChatId(chat.id)}
                  className={`w-full p-4 rounded-lg text-left transition-all ${
                    currentChatId === chat.id ? "bg-blue-50 border-l-4 border-[#1E3A8A]" : "hover:bg-gray-50"
                  }`}
                >
                  <h3 className="font-semibold text-sm text-black truncate">{chat.title}</h3>
                  <p className="text-xs text-gray-500 truncate mt-1">{chat.lastMessage}</p>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Área principal do chat */}
        <div className="flex-1 flex flex-col">
          {/* Header do chat */}
          <div className="border-b border-gray-200 bg-white p-4 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-lg text-black">Juriton</h2>
              <p className="text-xs text-gray-500">IA Especializada em Direito</p>
            </div>

            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              Exportar
            </Button>
          </div>

          {/* Mensagens */}
          <ScrollArea className="flex-1 p-6" ref={scrollRef}>
            <div className="max-w-4xl mx-auto space-y-6">
              {messages.length === 1 && (
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-black mb-4">Olá! Sou o Juriton</h2>
                  <p className="text-gray-600 mb-8">Sua IA especializada em Direito</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {quickActions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickAction(action.prompt)}
                        className="p-4 border-2 border-gray-200 rounded-lg hover:border-[#1E3A8A] hover:bg-blue-50 transition-all text-left"
                      >
                        <h3 className="font-bold text-black text-sm">{action.label}</h3>
                        <p className="text-xs text-gray-500 mt-1">{action.prompt}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <div key={message.id} className={`flex gap-4 ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                  <div
                    className={`flex-1 max-w-[80%] ${
                      message.sender === "user" ? "bg-[#1E3A8A] text-white" : "bg-gray-100 text-black"
                    } rounded-lg p-4`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    <p className={`text-xs mt-2 ${message.sender === "user" ? "text-white/70" : "text-gray-500"}`}>
                      {message.timestamp.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-4">
                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="flex gap-2">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input de mensagem */}
          <div className="border-t border-gray-200 bg-white p-4">
            <div className="max-w-4xl mx-auto">
              {selectedFiles.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg text-sm">
                      <FileText className="w-4 h-4" />
                      <span className="max-w-[200px] truncate">{file.name}</span>
                      <button onClick={() => removeFile(index)}>
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-2 items-end">
                <input type="file" ref={fileInputRef} onChange={handleFileSelect} multiple className="hidden" />

                <Button variant="outline" size="icon" onClick={() => fileInputRef.current?.click()}>
                  <Paperclip className="w-5 h-5" />
                </Button>

                <div className="flex-1 bg-white border-2 border-gray-200 rounded-lg focus-within:border-[#1E3A8A] transition-colors">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                    placeholder="Digite sua pergunta jurídica..."
                    className="border-0 focus-visible:ring-0"
                  />
                </div>

                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  size="icon"
                  className="bg-[#1E3A8A] text-white hover:bg-[#152B5E]"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

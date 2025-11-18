"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Camera, Mail, Phone, Edit, Save, Trophy, MessageSquare, BookOpen, Star, Calendar } from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "Maria Silva",
    email: "maria.silva@email.com",
    phone: "(11) 98765-4321",
    bio: "Estudante de Direito apaixonada por justiça social.",
    role: "Estudante",
    interests: ["Direito Constitucional", "Direitos Humanos"],
    lookingForJob: false,
    officeAddress: "",
    oabNumber: "",
  })

  const activities = [
    {
      id: 1,
      icon: Trophy,
      title: "Nova Conquista Desbloqueada",
      description: "Mestre do Conhecimento",
      time: "Há 2 horas",
    },
    {
      id: 2,
      icon: MessageSquare,
      title: "Comentou na Comunidade",
      description: "Post sobre reforma trabalhista",
      time: "Há 5 horas",
    },
    {
      id: 3,
      icon: BookOpen,
      title: "Concluiu uma Matéria",
      description: "Direito Constitucional",
      time: "Há 1 dia",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader />

      <main className="pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Profile Header */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-10">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Profile Picture */}
              <div className="relative group">
                <div className="w-40 h-40 rounded-2xl bg-[#1E3A8A] flex items-center justify-center text-5xl font-black text-white">
                  M
                </div>
                {isEditing && (
                  <button className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-8 h-8 text-white" />
                  </button>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    {isEditing ? (
                      <Input
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="text-4xl font-black border-gray-300"
                      />
                    ) : (
                      <h1 className="text-4xl font-black text-black">{profile.name}</h1>
                    )}

                    <select
                      value={profile.role}
                      onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                      disabled={!isEditing}
                      className={`mt-2 px-4 py-2 rounded-lg border-2 border-gray-300 text-sm font-bold ${
                        isEditing ? "bg-white" : "bg-gray-100 cursor-default"
                      }`}
                    >
                      <option>Estudante</option>
                      <option>Advogado</option>
                    </select>
                  </div>

                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-[#1E3A8A] text-white hover:bg-[#152B5E]"
                  >
                    {isEditing ? (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Salvar
                      </>
                    ) : (
                      <>
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </>
                    )}
                  </Button>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Sobre Mim</label>
                  {isEditing ? (
                    <Textarea
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      className="border-gray-300 min-h-[80px]"
                    />
                  ) : (
                    <p className="text-gray-700">{profile.bio}</p>
                  )}
                </div>

                {/* Contact */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-5 h-5 text-[#1E3A8A]" />
                    <span className="text-sm">{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-5 h-5 text-[#1E3A8A]" />
                    <span className="text-sm">{profile.phone}</span>
                  </div>
                </div>

                {/* Interests */}
                <div className="space-y-2 pt-4">
                  <label className="text-xs font-bold text-gray-500 uppercase">Áreas de Interesse</label>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest) => (
                      <Badge key={interest} className="bg-gray-100 text-black border-2 border-gray-300">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { icon: Trophy, label: "Conquistas", value: "24" },
              { icon: BookOpen, label: "Matérias", value: "12" },
              { icon: MessageSquare, label: "Comentários", value: "156" },
              { icon: Star, label: "XP Total", value: "2.450" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white border-2 border-gray-200 p-6 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon className="w-5 h-5 text-[#1E3A8A]" />
                  <span className="text-xs font-bold text-gray-500 uppercase">{stat.label}</span>
                </div>
                <p className="text-3xl font-black text-black">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Activity Feed */}
          <div className="mt-12">
            <h2 className="text-3xl font-black text-black mb-6">Atividades Recentes</h2>
            <div className="space-y-3">
              {activities.map((activity) => {
                const Icon = activity.icon
                return (
                  <div key={activity.id} className="bg-white border-2 border-gray-200 p-6 rounded-xl">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#1E3A8A]/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[#1E3A8A]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-black">{activity.title}</h3>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                          <Calendar className="w-4 h-4" />
                          {activity.time}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

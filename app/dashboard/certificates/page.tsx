"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { certificateService, type Certificate } from "@/lib/certificates"
import { authService } from "@/lib/auth"
import { Award, Download, Share2, Check, QrCode } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [user, setUser] = useState(authService.getCurrentUser())

  useEffect(() => {
    if (user) {
      const userCerts = certificateService.getUserCertificates(user.id)
      setCertificates(userCerts)
    }
  }, [])

  const handleDownload = (certificate: Certificate) => {
    // Gerar PDF do certificado
    const certificateHTML = generateCertificateHTML(certificate)
    const blob = new Blob([certificateHTML], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `certificado-${certificate.courseName.toLowerCase().replace(/\s+/g, "-")}.html`
    a.click()
  }

  const generateCertificateHTML = (cert: Certificate) => {
    return `
<!DOCTYPE html>
<html>
<head>
  <title>Certificado - ${cert.courseName}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Georgia', serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .certificate {
      background: white;
      padding: 60px;
      max-width: 900px;
      border: 20px solid #f59e0b;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    .header { text-align: center; margin-bottom: 40px; }
    .logo { font-size: 48px; font-weight: bold; color: #f59e0b; }
    .title {
      font-size: 36px;
      color: #111;
      margin: 20px 0;
      font-weight: bold;
    }
    .subtitle { font-size: 18px; color: #666; }
    .content {
      text-align: center;
      margin: 40px 0;
      line-height: 2;
    }
    .name {
      font-size: 32px;
      font-weight: bold;
      color: #111;
      border-bottom: 2px solid #f59e0b;
      display: inline-block;
      padding: 0 20px 10px;
      margin: 20px 0;
    }
    .course {
      font-size: 24px;
      color: #f59e0b;
      font-weight: bold;
      margin: 20px 0;
    }
    .details {
      display: flex;
      justify-content: space-around;
      margin: 40px 0;
      padding: 20px;
      background: #f3f4f6;
      border-radius: 10px;
    }
    .detail-item {
      text-align: center;
    }
    .detail-label {
      font-size: 12px;
      color: #666;
      text-transform: uppercase;
    }
    .detail-value {
      font-size: 18px;
      font-weight: bold;
      color: #111;
      margin-top: 5px;
    }
    .footer {
      margin-top: 40px;
      text-align: center;
      padding-top: 20px;
      border-top: 2px solid #e5e7eb;
    }
    .verification {
      font-size: 14px;
      color: #666;
      margin-top: 20px;
    }
    .code {
      font-family: monospace;
      background: #f3f4f6;
      padding: 10px 20px;
      border-radius: 5px;
      display: inline-block;
      margin-top: 10px;
      font-size: 16px;
      font-weight: bold;
    }
    @media print {
      body { background: white; }
      .certificate { border-color: #f59e0b; }
    }
  </style>
</head>
<body>
  <div class="certificate">
    <div class="header">
      <div class="logo">LEX GO!</div>
      <div class="title">CERTIFICADO DE CONCLUSÃO</div>
      <div class="subtitle">Direito no Dia a Dia</div>
    </div>
    
    <div class="content">
      <p>Certificamos que</p>
      <div class="name">${cert.studentName}</div>
      <p>concluiu com êxito o curso de</p>
      <div class="course">${cert.courseName}</div>
      <p>demonstrando dedicação e comprometimento com o aprendizado jurídico</p>
    </div>
    
    <div class="details">
      <div class="detail-item">
        <div class="detail-label">Data de Conclusão</div>
        <div class="detail-value">${new Date(cert.completedAt).toLocaleDateString("pt-BR")}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Nota Final</div>
        <div class="detail-value">${cert.grade}%</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">XP Obtido</div>
        <div class="detail-value">${cert.xpEarned}</div>
      </div>
    </div>
    
    <div class="footer">
      <p><strong>LEX GO - Plataforma de Educação Jurídica</strong></p>
      <p>www.lexgo.com.br</p>
      
      <div class="verification">
        <p>Código de Verificação:</p>
        <div class="code">${cert.verificationCode}</div>
        <p style="margin-top: 10px; font-size: 12px;">
          Verifique a autenticidade deste certificado em<br/>
          https://lexgo.com.br/verificar-certificado
        </p>
      </div>
    </div>
  </div>
</body>
</html>
    `
  }

  return (
    <div className="min-h-screen bg-black">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-white mb-2">Meus Certificados</h1>
          <p className="text-gray-400">Certificados de conclusão dos seus cursos</p>
        </div>

        {certificates.length === 0 ? (
          <Card className="p-12 text-center border-zinc-800">
            <Award className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <h3 className="text-xl font-bold text-white mb-2">Nenhum certificado ainda</h3>
            <p className="text-gray-400">Complete seus cursos para ganhar certificados!</p>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {certificates.map((certificate) => (
              <Card
                key={certificate.id}
                className="relative overflow-hidden border-2 border-zinc-800 bg-gradient-to-br from-zinc-950 to-zinc-900"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-bl-full" />

                <div className="relative p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-white mb-1">{certificate.courseName}</h3>
                      <p className="text-sm text-gray-400">
                        Concluído em {new Date(certificate.completedAt).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    <Badge className="bg-green-600">
                      <Check className="w-3 h-3 mr-1" />
                      Concluído
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-black/30 rounded-lg">
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">Nota</p>
                      <p className="text-lg font-bold text-white">{certificate.grade}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">XP Ganho</p>
                      <p className="text-lg font-bold text-yellow-500">+{certificate.xpEarned}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">Verificação</p>
                      <QrCode className="w-6 h-6 mx-auto text-yellow-500" />
                    </div>
                  </div>

                  <div className="mb-4 p-3 bg-blue-950/20 border border-blue-800 rounded-lg">
                    <p className="text-xs text-blue-300 mb-1">Código de Verificação:</p>
                    <code className="text-sm font-mono font-bold text-white">{certificate.verificationCode}</code>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleDownload(certificate)}
                      className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Baixar
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <Share2 className="w-4 h-4 mr-2" />
                      Compartilhar
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

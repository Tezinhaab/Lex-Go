"use client"

export interface Certificate {
  id: string
  userId: string
  courseId: string
  courseName: string
  studentName: string
  completedAt: string
  xpEarned: number
  grade: number
  verificationCode: string
  pdfUrl?: string
}

export const certificateService = {
  generateCertificate: (
    userId: string,
    courseId: string,
    courseName: string,
    studentName: string,
    xpEarned: number,
    grade: number,
  ): Certificate => {
    const certificate: Certificate = {
      id: "cert_" + Date.now(),
      userId,
      courseId,
      courseName,
      studentName,
      completedAt: new Date().toISOString(),
      xpEarned,
      grade,
      verificationCode: certificateService.generateVerificationCode(),
    }

    const certificates = certificateService.getUserCertificates(userId)
    certificates.push(certificate)
    localStorage.setItem(`lexgo_certificates_${userId}`, JSON.stringify(certificates))

    return certificate
  },

  generateVerificationCode: (): string => {
    return "LEX" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 8).toUpperCase()
  },

  getUserCertificates: (userId: string): Certificate[] => {
    if (typeof window === "undefined") return []
    const certificatesStr = localStorage.getItem(`lexgo_certificates_${userId}`)
    return certificatesStr ? JSON.parse(certificatesStr) : []
  },

  verifyCertificate: (verificationCode: string): Certificate | null => {
    // Simula verificação em todas as contas
    const allCerts = Object.keys(localStorage)
      .filter((key) => key.startsWith("lexgo_certificates_"))
      .flatMap((key) => {
        const certs = localStorage.getItem(key)
        return certs ? JSON.parse(certs) : []
      })

    return allCerts.find((cert: Certificate) => cert.verificationCode === verificationCode) || null
  },
}

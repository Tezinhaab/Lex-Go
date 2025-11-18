"use client"

export interface Notification {
  id: string
  userId: string
  type: "achievement" | "course" | "community" | "consultation" | "certificate" | "streak"
  title: string
  message: string
  icon: string
  timestamp: string
  isRead: boolean
  actionUrl?: string
}

export const notificationService = {
  addNotification: (userId: string, notification: Omit<Notification, "id" | "timestamp" | "isRead">) => {
    const notifications = notificationService.getNotifications(userId)

    const newNotification: Notification = {
      ...notification,
      id: "notif_" + Date.now(),
      timestamp: new Date().toISOString(),
      isRead: false,
    }

    notifications.unshift(newNotification)

    // Manter apenas as últimas 50 notificações
    const trimmedNotifications = notifications.slice(0, 50)
    localStorage.setItem(`lexgo_notifications_${userId}`, JSON.stringify(trimmedNotifications))

    // Mostrar notificação do navegador se permitido
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(notification.title, {
        body: notification.message,
        icon: "/mascot.png",
      })
    }

    return newNotification
  },

  getNotifications: (userId: string): Notification[] => {
    if (typeof window === "undefined") return []
    const notificationsStr = localStorage.getItem(`lexgo_notifications_${userId}`)
    return notificationsStr ? JSON.parse(notificationsStr) : []
  },

  markAsRead: (userId: string, notificationId: string) => {
    const notifications = notificationService.getNotifications(userId)
    const notification = notifications.find((n) => n.id === notificationId)

    if (notification) {
      notification.isRead = true
      localStorage.setItem(`lexgo_notifications_${userId}`, JSON.stringify(notifications))
    }
  },

  markAllAsRead: (userId: string) => {
    const notifications = notificationService.getNotifications(userId)
    notifications.forEach((n) => (n.isRead = true))
    localStorage.setItem(`lexgo_notifications_${userId}`, JSON.stringify(notifications))
  },

  getUnreadCount: (userId: string): number => {
    return notificationService.getNotifications(userId).filter((n) => !n.isRead).length
  },

  requestPermission: async () => {
    if ("Notification" in window && Notification.permission === "default") {
      await Notification.requestPermission()
    }
  },
}

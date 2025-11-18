"use client"

import { useEffect, useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { notificationService, type Notification } from "@/lib/notifications"
import { authService } from "@/lib/auth"
import { ScrollArea } from "@/components/ui/scroll-area"

export function NotificationsBell() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const user = authService.getCurrentUser()

  useEffect(() => {
    if (user) {
      loadNotifications()
      notificationService.requestPermission()
    }
  }, [user])

  const loadNotifications = () => {
    if (!user) return
    const notifs = notificationService.getNotifications(user.id)
    setNotifications(notifs)
    setUnreadCount(notificationService.getUnreadCount(user.id))
  }

  const handleMarkAsRead = (notificationId: string) => {
    if (!user) return
    notificationService.markAsRead(user.id, notificationId)
    loadNotifications()
  }

  const handleMarkAllAsRead = () => {
    if (!user) return
    notificationService.markAllAsRead(user.id)
    loadNotifications()
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "achievement":
        return "🏆"
      case "course":
        return "📚"
      case "community":
        return "💬"
      case "consultation":
        return "⚖️"
      case "certificate":
        return "🎓"
      case "streak":
        return "🔥"
      default:
        return "🔔"
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-red-600 text-xs">
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notificações</span>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead} className="text-xs">
              Marcar todas como lidas
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-96">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-gray-500">Nenhuma notificação</div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`flex items-start gap-3 p-4 cursor-pointer ${!notification.isRead ? "bg-blue-950/20" : ""}`}
                onClick={() => handleMarkAsRead(notification.id)}
              >
                <div className="text-2xl flex-shrink-0">{getNotificationIcon(notification.type)}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{notification.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(notification.timestamp).toLocaleString("pt-BR")}
                  </p>
                </div>
                {!notification.isRead && <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />}
              </DropdownMenuItem>
            ))
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

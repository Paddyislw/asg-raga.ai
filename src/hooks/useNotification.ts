import { useState, useCallback } from 'react'

export function useNotification() {
  const [permission, setPermission] = useState<NotificationPermission>(
    typeof Notification !== 'undefined' ? Notification.permission : 'default',
  )

  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) return 'denied' as const

    const result = await Notification.requestPermission()
    setPermission(result)
    return result
  }, [])

  const sendNotification = useCallback(
    async (title: string, options?: NotificationOptions) => {
      if (!('Notification' in window)) return null

      let currentPermission = Notification.permission

      if (currentPermission === 'default') {
        currentPermission = await requestPermission()
      }

      if (currentPermission !== 'granted') return null

      if ('serviceWorker' in navigator) {
        try {
          const registrations = await navigator.serviceWorker.getRegistrations()
          if (registrations.length > 0) {
            const reg = registrations.find((r) => r.active) ?? registrations[0]
            await reg.showNotification(title, {
              icon: '/favicon.svg',
              badge: '/favicon.svg',
              ...options,
            })
            return null
          }
        } catch {
          // fall through
        }
      }

      return new Notification(title, { icon: '/favicon.svg', ...options })
    },
    [requestPermission],
  )

  return { permission, requestPermission, sendNotification }
}

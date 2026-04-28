import { useLocation } from 'react-router-dom'
import { Bell, Search } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useNotification } from '@/hooks/useNotification'
import { getInitials } from '@/utils/helpers'
import { ROUTES } from '@/constants/routes'

const PAGE_TITLES: Record<string, string> = {
  [ROUTES.DASHBOARD]: 'Dashboard',
  [ROUTES.PATIENTS]: 'Patients',
  [ROUTES.ANALYTICS]: 'Analytics',
}

function Header() {
  const location = useLocation()
  const { user } = useAuth()
  const { sendNotification, requestPermission, permission } = useNotification()

  const title = PAGE_TITLES[location.pathname] || 'MedBoard'
  const displayName = user?.displayName || user?.email?.split('@')[0] || 'User'

  async function handleNotificationClick() {
    if (permission === 'default') {
      await requestPermission()
    }
    sendNotification('MedBoard Alert', {
      body: 'Patient Thomas Wright (Room 102A) vitals require attention.',
      tag: 'critical-alert',
    })
  }

  return (
    <header className="h-16 border-b-2 border-background-white bg-background-weak flex items-center justify-between px-4 shrink-0">
      <h1 className="font-ibm-plex-serif text-xl font-semibold text-strong">{title}</h1>

      <div className="flex items-center gap-2">
        <div className="bg-background-white border-2 border-background-weak rounded-full flex items-center h-10 px-3 w-64 focus-within:border-background-sub transition-colors duration-200">
          <Search size={16} strokeWidth={2} className="text-soft mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm text-sub placeholder:text-soft w-full"
          />
        </div>

        <button
          onClick={handleNotificationClick}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-background-white hover:bg-background-soft transition-colors duration-200 relative"
          title="Send test notification"
        >
          <Bell size={18} strokeWidth={2} className="text-sub" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-error-base rounded-full" />
        </button>

        <div className="w-10 h-10 rounded-full bg-feature-lighter flex items-center justify-center text-feature-base text-xs font-semibold">
          {getInitials(displayName)}
        </div>
      </div>
    </header>
  )
}

export { Header }

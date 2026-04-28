import { NavLink } from 'react-router-dom'
import { Home, Users, BarChart3, LogOut, Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/store'
import { useAuth } from '@/hooks/useAuth'
import { ROUTES, NAV_ITEMS } from '@/constants/routes'
import { APP_NAME } from '@/constants'
import type { LucideIcon } from 'lucide-react'

const ICON_MAP: Record<string, LucideIcon> = {
  Home09Icon: Home,
  UserGroupIcon: Users,
  BarChart01Icon: BarChart3,
}

function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useUIStore()
  const { signOut } = useAuth()

  return (
    <aside
      className={cn(
        'h-screen bg-background-weak border-r-2 border-background-white flex flex-col transition-all duration-300 shrink-0',
        sidebarCollapsed ? 'w-[var(--sidebar-collapsed-width)]' : 'w-[var(--sidebar-width)]',
      )}
    >
      <div className="p-3 flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-background-white hover:bg-background-soft transition-colors duration-200"
        >
          <Menu size={18} strokeWidth={2} className="text-sub" />
        </button>
        {!sidebarCollapsed && (
          <span className="font-ibm-plex-serif text-lg font-semibold text-strong">{APP_NAME}</span>
        )}
      </div>

      <div className="h-px bg-background-soft w-full" />

      <nav className="flex-1 p-3 flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const IconComponent = ICON_MAP[item.icon]
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === ROUTES.DASHBOARD}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 h-10 rounded-full transition-all duration-300',
                  sidebarCollapsed ? 'justify-center px-0' : 'px-3',
                  isActive
                    ? 'bg-background-strong text-white'
                    : 'text-sub hover:bg-background-white',
                )
              }
            >
              {IconComponent && <IconComponent size={18} strokeWidth={2} />}
              {!sidebarCollapsed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </NavLink>
          )
        })}
      </nav>

      <div className="h-px bg-background-soft w-full" />

      <div className="p-3">
        <button
          onClick={signOut}
          className={cn(
            'flex items-center gap-3 h-10 rounded-full text-sub hover:bg-error-lighter hover:text-error-base transition-all duration-300 w-full',
            sidebarCollapsed ? 'justify-center px-0' : 'px-3',
          )}
        >
          <LogOut size={18} strokeWidth={2} />
          {!sidebarCollapsed && <span className="text-sm font-medium">Sign out</span>}
        </button>
      </div>
    </aside>
  )
}

export { Sidebar }

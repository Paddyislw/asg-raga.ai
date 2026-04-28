import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface DropdownItem {
  label: string
  value: string
}

interface DropdownProps {
  items: DropdownItem[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

function Dropdown({ items, value, onChange, placeholder = 'Select...', className }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const selected = items.find((item) => item.value === value)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="h-10 px-3 rounded-full bg-background-white border-2 border-background-weak text-sm font-medium text-sub w-full text-left flex items-center justify-between gap-2 hover:border-background-sub transition-colors duration-200"
      >
        <span className={selected ? 'text-sub' : 'text-soft'}>
          {selected?.label || placeholder}
        </span>
        <svg
          className={cn('w-4 h-4 text-soft transition-transform duration-200', open && 'rotate-180')}
          viewBox="0 0 16 16"
          fill="none"
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute top-full left-0 mt-1 w-full z-50 rounded-[20px] border-2 border-background-white bg-background-weak p-2 shadow-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
          >
            {items.map((item) => (
              <div
                key={item.value}
                onClick={() => {
                  onChange(item.value)
                  setOpen(false)
                }}
                className={cn(
                  'rounded-3xl p-2 text-sm cursor-pointer transition-colors duration-100',
                  item.value === value
                    ? 'bg-background-white text-strong font-medium'
                    : 'text-sub hover:bg-background-sub',
                )}
              >
                {item.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export { Dropdown }
export type { DropdownProps, DropdownItem }

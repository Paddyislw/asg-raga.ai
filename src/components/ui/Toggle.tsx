import { cn } from '@/lib/utils'

interface ToggleOption {
  value: string
  label: string
  icon?: React.ReactNode
}

interface ToggleProps {
  options: ToggleOption[]
  value: string
  onChange: (value: string) => void
  className?: string
}

function Toggle({ options, value, onChange, className }: ToggleProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full bg-background-white border-2 border-background-weak p-1 gap-1',
        className,
      )}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            'h-8 px-3 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-1.5',
            value === opt.value
              ? 'bg-background-strong text-white'
              : 'text-soft hover:text-sub',
          )}
        >
          {opt.icon}
          {opt.label}
        </button>
      ))}
    </div>
  )
}

export { Toggle }
export type { ToggleProps, ToggleOption }

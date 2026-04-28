import { type InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xs font-medium text-sub">
            {label}
          </label>
        )}
        <div
          className={cn(
            'bg-background-white border-2 rounded-full transition-colors duration-200 flex items-center',
            error ? 'border-error-base' : 'border-background-weak focus-within:border-background-sub',
          )}
        >
          {icon && <span className="pl-3 text-soft">{icon}</span>}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'h-10 px-3 text-sub placeholder:text-soft text-sm bg-transparent outline-none w-full',
              icon && 'pl-2',
              className,
            )}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-error-base pl-3">{error}</p>}
      </div>
    )
  },
)

Input.displayName = 'Input'

export { Input }
export type { InputProps }

import { cn } from '@/lib/utils'

type BadgeVariant = 'success' | 'error' | 'warning' | 'info' | 'neutral'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  success: 'bg-success-lighter text-success-base',
  error: 'bg-error-lighter text-error-base',
  warning: 'bg-warning-lighter text-warning-base',
  info: 'bg-information-lighter text-information-base',
  neutral: 'bg-background-soft text-soft',
}

function Badge({ variant = 'neutral', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'px-3 py-1.5 rounded-full text-xs font-medium inline-flex items-center',
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}

export { Badge }
export type { BadgeProps, BadgeVariant }

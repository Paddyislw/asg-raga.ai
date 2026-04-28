import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  padding?: boolean
}

function Card({ children, className, padding = true }: CardProps) {
  return (
    <div
      className={cn(
        'bg-background-weak border-2 border-background-white rounded-[20px] shadow-[0_4px_8px_0_rgba(0,0,0,0.06),0_0_4px_0_rgba(0,0,0,0.04)]',
        padding && 'p-3',
        className,
      )}
    >
      {children}
    </div>
  )
}

function CardInner({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('bg-background-white rounded-[20px] p-3', className)}>
      {children}
    </div>
  )
}

export { Card, CardInner }
export type { CardProps }

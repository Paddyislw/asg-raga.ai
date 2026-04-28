interface EmptyStateProps {
  icon: React.ReactNode
  message: string
  action?: React.ReactNode
}

function EmptyState({ icon, message, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
      <div className="w-10 h-10 rounded-full bg-background-white flex items-center justify-center">
        {icon}
      </div>
      <p className="text-sm text-soft">{message}</p>
      {action}
    </div>
  )
}

export { EmptyState }

interface LoadingProps {
  fullScreen?: boolean
  message?: string
  size?: "sm" | "md" | "lg"
}

export default function Loading({ fullScreen = false, message, size = "md" }: LoadingProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-2",
    lg: "h-12 w-12 border-3",
  }

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-primary border-t-transparent`}
        role="status"
        aria-label="Loading"
      />
      {message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  )

  if (fullScreen) {
    return <div className="flex h-screen items-center justify-center">{spinner}</div>
  }

  return spinner
}

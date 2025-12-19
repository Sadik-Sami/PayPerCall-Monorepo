import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router"
import { ROUTES } from "@/utils/constants"

interface InsufficientPermissionsProps {
  message?: string
  showBackButton?: boolean
}

export default function InsufficientPermissions({
  message = "You don't have permission to access this page",
  showBackButton = true,
}: InsufficientPermissionsProps) {
  const navigate = useNavigate()

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 p-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="rounded-full bg-destructive/10 p-3">
          <svg
            className="h-6 w-6 text-destructive"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Insufficient Permissions</h1>
        <p className="text-sm text-muted-foreground">{message}</p>
        <p className="text-xs text-muted-foreground">Contact the admin for help</p>
      </div>
      {showBackButton && (
        <Button onClick={() => navigate(ROUTES.DASHBOARD)} variant="outline">
          Go to Dashboard
        </Button>
      )}
    </div>
  )
}

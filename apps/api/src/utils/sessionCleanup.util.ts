import { sessionService } from '../modules/auth/session.service'

const CLEANUP_INTERVAL = 60 * 60 * 1000 // 1 hour

let cleanupTimer: NodeJS.Timeout | null = null

export function startSessionCleanup(): void {
  if (cleanupTimer) return

  cleanupTimer = setInterval(async () => {
    try {
      const cleaned = await sessionService.cleanupExpiredSessions()
      if (cleaned > 0) {
        console.log(`[SessionCleanup] Removed ${cleaned} expired sessions`)
      }
    } catch (error) {
      console.error("[SessionCleanup] Error:", error)
    }
  }, CLEANUP_INTERVAL)

  console.log("[SessionCleanup] Started with interval:", CLEANUP_INTERVAL / 1000, "seconds")
}

export function stopSessionCleanup(): void {
  if (cleanupTimer) {
    clearInterval(cleanupTimer)
    cleanupTimer = null
    console.log("[SessionCleanup] Stopped")
  }
}

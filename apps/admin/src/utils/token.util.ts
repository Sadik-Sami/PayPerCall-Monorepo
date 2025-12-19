import { TOKEN_KEY } from "./constants"

export const tokenUtil = {
  get: (): string | null => {
    try {
      return localStorage.getItem(TOKEN_KEY)
    } catch {
      return null
    }
  },

  set: (token: string): void => {
    try {
      localStorage.setItem(TOKEN_KEY, token)
    } catch (error) {
      console.error("[Token] Failed to set token:", error)
    }
  },

  remove: (): void => {
    try {
      localStorage.removeItem(TOKEN_KEY)
    } catch (error) {
      console.error("[Token] Failed to remove token:", error)
    }
  },

  exists: (): boolean => {
    return !!tokenUtil.get()
  },
}

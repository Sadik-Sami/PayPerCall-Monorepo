import morgan from "morgan"
import { config } from "@/config/env"

// Custom morgan token for request ID (can add UUID generation if needed)
morgan.token("user-id", (req) => {
  const userReq = req as any
  return userReq.user?.id || "anonymous"
})

// Development logging format
const devFormat = ":method :url :status :response-time ms - :user-id [:date[clf]]"

// Production logging format (simplified)
const prodFormat = ":method :url :status :response-time ms - :user-id"

export const loggingMiddleware = morgan(config.nodeEnv === "production" ? prodFormat : devFormat, {
  skip: (req) => req.method === "OPTIONS",
  stream: {
    write: (message: string) => {
      console.log(message.trim())
    },
  },
})

import db from "@/db"
import { sql } from "drizzle-orm"

export const healthService = {
  check: async () => {
    // Test database connection
    const result = await db.execute(sql `SELECT 1`)

    return {
      status: "ok",
      timestamp: new Date().toISOString(),
      database: "connected",
    }
  },
}

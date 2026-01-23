import type { Request, Response, NextFunction } from "express"
import { healthService } from "./health.service"
import { ApiResponse } from '../../utils/apiResponse.util'

export const healthController = {
  check: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const health = await healthService.check()
      res.json(ApiResponse.success(health, "Health check passed"))
    } catch (error) {
      next(error)
    }
  },
}

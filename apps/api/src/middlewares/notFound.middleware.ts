import type { Request, Response } from "express"
import { ApiResponse } from "@/utils/apiResponse.util"

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json(ApiResponse.error(`Route ${req.path} not found`, 404))
}

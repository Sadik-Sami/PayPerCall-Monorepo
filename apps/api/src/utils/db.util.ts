import { AppError } from '../middlewares/errorHandler'

/**
 * Helper function to get first result from query or throw error
 * Useful pattern to avoid undefined checks on array results
 */
export async function getFirstOrThrow<T>(query: Promise<T[]>, message = "Resource not found"): Promise<T> {
  const result = (await query)[0]
  if (!result) throw new AppError(message, 404)
  return result
}

/**
 * Helper to safely get optional first result
 */
export async function getFirstOrNull<T>(query: Promise<T[]>): Promise<T | null> {
  const result = (await query)[0]
  return result ?? null
}

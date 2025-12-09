export class ValidationError extends Error {
  readonly statusCode = 400
  constructor(
    message: string,
    public readonly details?: Record<string, string[]>,
  ) {
    super(message)
    this.name = "ValidationError"
    Error.captureStackTrace(this, this.constructor)
  }
}

export class UnauthorizedError extends Error {
  readonly statusCode = 401
  constructor(message = "Unauthorized") {
    super(message)
    this.name = "UnauthorizedError"
    Error.captureStackTrace(this, this.constructor)
  }
}

export class ForbiddenError extends Error {
  readonly statusCode = 403
  constructor(message = "Forbidden") {
    super(message)
    this.name = "ForbiddenError"
    Error.captureStackTrace(this, this.constructor)
  }
}

export class NotFoundError extends Error {
  readonly statusCode = 404
  constructor(message = "Not Found") {
    super(message)
    this.name = "NotFoundError"
    Error.captureStackTrace(this, this.constructor)
  }
}

export class ConflictError extends Error {
  readonly statusCode = 409
  constructor(message = "Conflict") {
    super(message)
    this.name = "ConflictError"
    Error.captureStackTrace(this, this.constructor)
  }
}

export class TooManyRequestsError extends Error {
  readonly statusCode = 429
  constructor(message = "Too Many Requests") {
    super(message)
    this.name = "TooManyRequestsError"
    Error.captureStackTrace(this, this.constructor)
  }
}

// Type guards
export function isValidationError(error: unknown): error is ValidationError {
  return error instanceof ValidationError
}

export function isUnauthorizedError(error: unknown): error is UnauthorizedError {
  return error instanceof UnauthorizedError
}

export function isForbiddenError(error: unknown): error is ForbiddenError {
  return error instanceof ForbiddenError
}

export function isNotFoundError(error: unknown): error is NotFoundError {
  return error instanceof NotFoundError
}

export function isConflictError(error: unknown): error is ConflictError {
  return error instanceof ConflictError
}

export function isTooManyRequestsError(error: unknown): error is TooManyRequestsError {
  return error instanceof TooManyRequestsError
}

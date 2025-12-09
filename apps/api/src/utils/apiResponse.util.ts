export interface ApiResponseData<T> {
  success: boolean
  statusCode: number
  data?: T
  message: string
  errors?: Record<string, string[]>
}

export class ApiResponse {
  static success<T>(data: T, message = "Success", statusCode = 200): ApiResponseData<T> {
    return {
      success: true,
      statusCode,
      data,
      message,
    }
  }

  static error(message: string, statusCode = 500, errors?: Record<string, string[]>): ApiResponseData<null> {
    return {
      success: false,
      statusCode,
      message,
      errors,
    }
  }
}

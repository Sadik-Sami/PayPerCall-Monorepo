export interface ApiResponse<T = unknown> {
  success: boolean
  statusCode: number
  message: string
  data?: T
  accessToken?: string
  sessionId?: string
}

export interface ApiError {
  success: false
  message: string
  statusCode: number
  errors?: Array<{ field: string; message: string }>
}

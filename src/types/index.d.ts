export type { IUser } from './user'
export type { TaskStatus, TaskPriority, ITask } from './task'
export type { IJWTPayload, ILogin, ILoginResponse } from './auth'

export interface ApiResponse<T = any> {
  success: boolean
  message?: string
  data?: T
  meta?: PaginationMeta
  error?: string
}

declare global {
  namespace Express {
    interface Request {
      user?: IJWTPayload
    }
  }
}

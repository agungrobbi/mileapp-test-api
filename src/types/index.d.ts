export type { IUser } from './user'
export type {
  TaskStatus,
  TaskPriority,
  ITask,
  TaskQueryParams,
  CreateTaskRequest,
  UpdateTaskRequest,
} from './task'
export type { IJWTPayload, ILogin, ILoginResponse } from './auth'

export interface PaginationMeta {
  total: number
  page: number
  limit: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

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

export type TaskStatus = 'pending' | 'progress' | 'review' | 'completed'
export type TaskPriority = 'low' | 'medium' | 'high'

export interface ITask {
  id: number
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  dueDate: string | null
  createdAt: Date
  updatedAt: Date
}

export interface TaskQueryParams {
  status?: string
  priority?: string
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  page?: string
  limit?: string
}

export interface CreateTaskRequest {
  title: string
  description?: string
  status?: TaskStatus
  priority?: TaskPriority
  dueDate?: string
}

export interface UpdateTaskRequest {
  title?: string
  description?: string
  status?: TaskStatus
  priority?: TaskPriority
  dueDate?: string
}

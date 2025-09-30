export type TaskStatus = 'pending' | 'progress' | 'completed'
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

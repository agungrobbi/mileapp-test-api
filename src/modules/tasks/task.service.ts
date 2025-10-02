import { StatusCodes } from 'http-status-codes'

import {
  ITask,
  TaskStatus,
  TaskPriority,
  CreateTaskRequest,
  UpdateTaskRequest,
  TaskQueryParams,
  PaginationMeta,
} from '@src/types'
import { ApiError } from '@src/lib/apiResponse'
import { tasks, taskIdCounter } from '@src/lib/mockData'

async function getTasks(query: TaskQueryParams): Promise<{ data: ITask[]; meta: PaginationMeta }> {
  const {
    status,
    priority,
    search,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    page = '1',
    limit = '10',
  } = query

  let filteredTasks = [...tasks]

  if (status && status !== 'all') {
    filteredTasks = filteredTasks.filter((task) => task.status === status)
  }

  if (priority && priority !== 'all') {
    filteredTasks = filteredTasks.filter((task) => task.priority === priority)
  }

  if (search && search.trim() !== '') {
    const searchLower = search.toLowerCase().trim()
    filteredTasks = filteredTasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchLower) ||
        task.description.toLowerCase().includes(searchLower),
    )
  }

  filteredTasks.sort((a, b) => {
    let aVal: any = a[sortBy as keyof ITask]
    let bVal: any = b[sortBy as keyof ITask]

    if (sortBy === 'createdAt' || sortBy === 'updatedAt') {
      aVal = new Date(aVal)
      bVal = new Date(bVal)
    }

    if (sortOrder === 'asc') {
      return aVal > bVal ? 1 : -1
    } else {
      return aVal < bVal ? 1 : -1
    }
  })

  const pageNum = parseInt(page)
  const limitNum = parseInt(limit)
  const startIndex = (pageNum - 1) * limitNum
  const endIndex = startIndex + limitNum
  const paginatedTasks = filteredTasks.slice(startIndex, endIndex)

  return {
    data: paginatedTasks,
    meta: {
      total: filteredTasks.length,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(filteredTasks.length / limitNum),
      hasNextPage: endIndex < filteredTasks.length,
      hasPrevPage: pageNum > 1,
    },
  }
}

async function getTaskById(id: number): Promise<ITask> {
  const task = tasks.find((t) => t.id === id)

  if (!task) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Task not found')
  }

  return task
}

async function createTask(data: CreateTaskRequest): Promise<ITask> {
  const { title, description, status = 'pending', priority = 'medium', dueDate } = data

  let idCounter = taskIdCounter

  if (!title || title.trim() === '') {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Title is required')
  }

  if (title.length > 200) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Title must be less than 200 characters')
  }

  const validStatuses: TaskStatus[] = ['pending', 'progress', 'completed']
  if (!validStatuses.includes(status)) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Invalid status. Must be: pending, progress, or completed',
    )
  }

  const validPriorities: TaskPriority[] = ['low', 'medium', 'high']
  if (!validPriorities.includes(priority)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid priority. Must be: low, medium, or high')
  }

  const newTask: ITask = {
    id: idCounter++,
    title: title.trim(),
    description: description ? description.trim() : '',
    status,
    priority,
    dueDate: dueDate || null,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  tasks.push(newTask)
  return newTask
}

async function updateTask(id: number, data: UpdateTaskRequest): Promise<ITask> {
  const { title, description, status, priority, dueDate } = data

  const taskIndex = tasks.findIndex((t) => t.id === id)

  if (taskIndex === -1) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Task not found')
  }

  if (title !== undefined && title.trim() === '') {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Title cannot be empty')
  }

  if (title && title.length > 200) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Title must be less than 200 characters')
  }

  if (status) {
    const validStatuses: TaskStatus[] = ['pending', 'progress', 'completed']
    if (!validStatuses.includes(status)) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        'Invalid status. Must be: pending, progress, or completed',
      )
    }
  }

  if (priority) {
    const validPriorities: TaskPriority[] = ['low', 'medium', 'high']
    if (!validPriorities.includes(priority)) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid priority. Must be: low, medium, or high')
    }
  }

  const updatedTask: ITask = {
    ...tasks[taskIndex],
    ...(title && { title: title.trim() }),
    ...(description !== undefined && { description: description.trim() }),
    ...(status && { status }),
    ...(priority && { priority }),
    ...(dueDate !== undefined && { dueDate }),
    updatedAt: new Date(),
  }

  tasks[taskIndex] = updatedTask
  return updatedTask
}

async function deleteTask(id: number): Promise<ITask> {
  const taskIndex = tasks.findIndex((t) => t.id === id)

  if (taskIndex === -1) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Task not found')
  }

  const deletedTask = tasks[taskIndex]
  tasks.splice(taskIndex, 1)
  return deletedTask
}

export default {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
}

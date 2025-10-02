import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'

import { ApiError, ApiResponse as ApiResponseUtil } from '@src/lib/apiResponse'
import taskService from './task.service'
import { CreateTaskRequest, UpdateTaskRequest, TaskQueryParams } from '@src/types'

async function getTasksController(req: Request, res: Response, next: NextFunction) {
  try {
    const query = req.query as TaskQueryParams
    const result = await taskService.getTasks(query)
    ApiResponseUtil.sendSuccess(res, result.data, StatusCodes.OK)
  } catch (error) {
    next(error)
  }
}

async function getTaskByIdController(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id)
    const task = await taskService.getTaskById(id)
    ApiResponseUtil.sendSuccess(res, task, StatusCodes.OK)
  } catch (error) {
    next(error)
  }
}

async function createTaskController(req: Request, res: Response, next: NextFunction) {
  try {
    const body = req.body as CreateTaskRequest
    if (!body) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Request body is required')
    }
    const task = await taskService.createTask(body)
    ApiResponseUtil.sendSuccess(res, task, StatusCodes.CREATED)
  } catch (error) {
    next(error)
  }
}

async function updateTaskController(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id)
    const body = req.body as UpdateTaskRequest
    const task = await taskService.updateTask(id, body)
    ApiResponseUtil.sendSuccess(res, task, StatusCodes.OK)
  } catch (error) {
    next(error)
  }
}

async function deleteTaskController(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id)
    const task = await taskService.deleteTask(id)
    ApiResponseUtil.sendSuccess(res, task, StatusCodes.OK)
  } catch (error) {
    next(error)
  }
}

export default {
  getTasksController,
  getTaskByIdController,
  createTaskController,
  updateTaskController,
  deleteTaskController,
}

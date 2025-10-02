import express from 'express'

import taskController from './task.controller'
import { authenticateToken } from '@src/middleware/auth.middleware'

export const taskRoutes = express.Router()

taskRoutes.use(authenticateToken)

taskRoutes.get('/', taskController.getTasksController)
taskRoutes.get('/:id', taskController.getTaskByIdController)
taskRoutes.post('/', taskController.createTaskController)
taskRoutes.put('/:id', taskController.updateTaskController)
taskRoutes.delete('/:id', taskController.deleteTaskController)

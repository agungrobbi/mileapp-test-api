import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { ApiError, ApiResponse } from '@src/lib/apiResponse'
import authService from './auth.service'

async function loginController(req: Request, res: Response) {
  try {
    const body = req.body
    if (!body) {
      throw new ApiError(
        StatusCodes.BAD_GATEWAY,
        'There are error when trying to login. Please try again.',
      )
    }

    const data = await authService.login(body)
    ApiResponse.sendSuccess(res, data, StatusCodes.OK)
  } catch (error) {
    ApiResponse.sendError(res, error as Error)
  }
}

export default {
  loginController,
}

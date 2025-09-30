import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes'

import { env } from '@/config/env'
import { IJWTPayload, ApiResponse } from '@src/types'
import { ApiError } from '@src/lib/apiResponse'

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return next(new ApiError(StatusCodes.UNAUTHORIZED, 'Access token required'))
  }

  jwt.verify(token, env.SECRET_KEY as string, (err, decoded) => {
    if (err) {
      return next(new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid or expired token'))
    }
    req.user = decoded as IJWTPayload
    next()
  })
}

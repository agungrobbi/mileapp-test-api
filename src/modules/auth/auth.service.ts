import jwt from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes'

import { env } from '@/config/env'
import { ILogin, ILoginResponse, IJWTPayload } from '@src/types'
import { ApiError } from '@src/lib/apiResponse'
import { users } from '@src/lib/mockData'

async function login(body: ILogin): Promise<ILoginResponse> {
  const { email, password } = body

  if (!email || !password) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Email and password are required')
  }

  const user = users.find((u) => u.email === email && u.password === password)

  if (!user) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid email or password')
  }

  const payload: IJWTPayload = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  }

  const token = jwt.sign(payload, env.SECRET_KEY, { expiresIn: '24h' })

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  }
}

export default {
  login,
}

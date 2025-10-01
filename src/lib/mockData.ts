import { IUser } from '@src/types'

export const users: IUser[] = [
  {
    id: 1,
    email: 'admin@mile.app',
    password: 'password',
    name: 'Admin User',
    role: 'admin',
  },
  {
    id: 2,
    email: 'user@mile.app',
    password: 'password',
    name: 'Test User',
    role: 'user',
  },
]

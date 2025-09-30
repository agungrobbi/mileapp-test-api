import { IUser } from '@src/types'

export const users: IUser[] = [
  {
    id: 1,
    email: 'admin@mile.app',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
  },
  {
    id: 2,
    email: 'user@mile.app',
    password: 'user123',
    name: 'Test User',
    role: 'user',
  },
]

export interface IJWTPayload {
  id: number
  email: string
  name: string
  role: string
}

export interface ILogin {
  email: string
  password: string
}

export interface ILoginResponse {
  token: string
  user: {
    id: number
    email: string
    name: string
    role: string
  }
}

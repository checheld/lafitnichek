import { Permission, Round, User } from '@prisma/client'

export interface CreateUser {
  name: string
  password: string
  role: Permission
}

export interface CreateRound {
  start_date: Date
  end_date: Date | null
}

export interface IBook {
  id: number
  name: string
  author: string
  user?: User
  user_id: number
  round?: Round
  round_id: number
  readers: number[]
  rating: number
}

export interface CreateBook {
  name: string
  author: string
  user_id: number
  round_id: number
  readers: number[]
}

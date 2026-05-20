'use client'

import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { enqueueSnackbar } from 'notistack'
import {
  createBook,
  createRound,
  createUser,
  deleteBook,
  deleteRound,
  getAllBooks,
  getAllRounds,
  getAllUsers,
  updateBook,
  updateRound,
  updateUser
} from '@/prisma/repository/adminRepository'
import { Book, Round, User } from '@prisma/client'
import {
  CreateBook,
  CreateRound,
  CreateUser,
  IBook
} from '@/prisma/types/admin.types'

interface AdminStore {
  users: User[]
  rounds: Round[]
  books: IBook[]
  getAllUsers: () => Promise<void>
  createUser: (user: CreateUser) => Promise<void>
  updateUser: (user: User) => Promise<void>
  getAllRounds: () => Promise<void>
  createRound: (round: CreateRound) => Promise<void>
  updateRound: (round: Round) => Promise<void>
  deleteRound: (id: number) => Promise<void>
  getAllBooks: () => Promise<void>
  createBook: (book: CreateBook) => Promise<void>
  updateBook: (book: Book) => Promise<void>
  deleteBook: (id: number) => Promise<void>
}

export const useAdminStore = create<AdminStore>()(
  devtools(
    immer(set => ({
      users: [],
      rounds: [],
      books: [],
      getAllUsers: async () => {
        try {
          const users = await getAllUsers()
          set({ users: users })
        } catch (error) {
          console.log('error', error)
        }
      },
      createUser: async user => {
        try {
          const users = await createUser(user)
          enqueueSnackbar('Пользователь добавлен', {
            variant: 'success'
          })
          set({ users: users })
        } catch (error) {
          console.log('error', error)
          enqueueSnackbar('Ошибка добавления пользователя', {
            variant: 'error'
          })
        }
      },
      updateUser: async user => {
        try {
          const users = await updateUser(user)
          enqueueSnackbar('Пользователь изменен', {
            variant: 'success'
          })
          set({ users: users })
        } catch (error) {
          console.log('error', error)
          enqueueSnackbar('Ошибка изменения пользователя', {
            variant: 'error'
          })
        }
      },
      getAllRounds: async () => {
        try {
          const rounds = await getAllRounds()
          set({ rounds: rounds })
        } catch (error) {
          console.log('error', error)
        }
      },
      createRound: async round => {
        try {
          const rounds = await createRound(round)
          enqueueSnackbar('Раунд добавлен', {
            variant: 'success'
          })
          set({ rounds: rounds })
        } catch (error) {
          console.log('error', error)
          enqueueSnackbar('Ошибка добавления раунда', {
            variant: 'error'
          })
        }
      },
      updateRound: async round => {
        try {
          const rounds = await updateRound(round)
          enqueueSnackbar('Раунд изменен', {
            variant: 'success'
          })
          set({ rounds: rounds })
        } catch (error) {
          console.log('error', error)
          enqueueSnackbar('Ошибка изменения раунда', {
            variant: 'error'
          })
        }
      },
      deleteRound: async id => {
        try {
          const rounds = await deleteRound(id)
          enqueueSnackbar('Раунд удален', {
            variant: 'success'
          })
          set({ rounds: rounds })
        } catch (error) {
          console.log('error', error)
          enqueueSnackbar('Ошибка удаления раунда', {
            variant: 'error'
          })
        }
      },
      getAllBooks: async () => {
        try {
          const books = await getAllBooks()
          set({ books: books })
        } catch (error) {
          console.log('error', error)
        }
      },
      createBook: async book => {
        try {
          const books = await createBook(book)
          enqueueSnackbar('Раунд добавлен', {
            variant: 'success'
          })
          set({ books: books })
        } catch (error) {
          console.log('error', error)
          enqueueSnackbar('Ошибка добавления раунда', {
            variant: 'error'
          })
        }
      },
      updateBook: async book => {
        try {
          const books = await updateBook(book)
          enqueueSnackbar('Раунд изменен', {
            variant: 'success'
          })
          set({ books: books })
        } catch (error) {
          console.log('error', error)
          enqueueSnackbar('Ошибка изменения раунда', {
            variant: 'error'
          })
        }
      },
      deleteBook: async id => {
        try {
          const books = await deleteBook(id)
          enqueueSnackbar('Раунд удален', {
            variant: 'success'
          })
          set({ books: books })
        } catch (error) {
          console.log('error', error)
          enqueueSnackbar('Ошибка удаления раунда', {
            variant: 'error'
          })
        }
      }
    }))
  )
)

'use client'

import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { enqueueSnackbar } from 'notistack'
import {
  getAllBooks,
  updateBook
} from '@/prisma/repository/adminRepository'
import { Book } from '@prisma/client'
import { IBook } from '@/prisma/types/admin.types'

interface RatingStore {
  books: IBook[]
  getAllBooks: () => Promise<void>
  updateBook: (book: Book) => Promise<void>
}

export const useRatingStore = create<RatingStore>()(
  devtools(
    immer(set => ({
      books: [],
      getAllBooks: async () => {
        try {
          const books = await getAllBooks()
          set({ books: books.sort((a, b) => a.rating - b.rating) })
        } catch (error) {
          console.log('error', error)
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
      }
    }))
  )
)

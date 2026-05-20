'use server'

import prisma from '@/prisma'
import { Round, User, Book } from '@prisma/client'
import {
  CreateRound,
  CreateUser,
  CreateBook
} from '../types/admin.types'

export const getAllUsers = async (): Promise<User[]> => {
  try {
    return await prisma.user.findMany()
  } catch (error) {
    throw new Error(String(error))
  }
}

export const createUser = async (
  user: CreateUser
): Promise<User[]> => {
  try {
    await prisma.user.create({
      data: user
    })
    return await prisma.user.findMany()
  } catch (error) {
    throw new Error(String(error))
  }
}

export const updateUser = async (user: User): Promise<User[]> => {
  try {
    await prisma.user.update({
      where: { id: user.id },
      data: user
    })
    return await prisma.user.findMany()
  } catch (error) {
    throw new Error(String(error))
  }
}

export const getAllRounds = async (): Promise<Round[]> => {
  try {
    return await prisma.round.findMany()
  } catch (error) {
    throw new Error(String(error))
  }
}

export const createRound = async (
  round: CreateRound
): Promise<Round[]> => {
  try {
    await prisma.round.create({
      data: round
    })
    return await prisma.round.findMany()
  } catch (error) {
    throw new Error(String(error))
  }
}

export const updateRound = async (round: Round): Promise<Round[]> => {
  try {
    await prisma.round.update({
      where: { id: round.id },
      data: round
    })
    return await prisma.round.findMany()
  } catch (error) {
    throw new Error(String(error))
  }
}

export const deleteRound = async (id: number): Promise<Round[]> => {
  try {
    await prisma.round.delete({ where: { id } })
    return await prisma.round.findMany()
  } catch (error) {
    throw new Error(String(error))
  }
}

export const getAllBooks = async (): Promise<Book[]> => {
  try {
    return await prisma.book.findMany({
      include: {
        user: true,
        round: true,
        vote: true
      }
    })
  } catch (error) {
    throw new Error(String(error))
  }
}

export const createBook = async (
  book: CreateBook
): Promise<Book[]> => {
  try {
    await prisma.book.create({
      data: book
    })
    return await prisma.book.findMany({
      include: {
        user: true,
        round: true
      }
    })
  } catch (error) {
    throw new Error(String(error))
  }
}

export const updateBook = async (book: Book): Promise<Book[]> => {
  try {
    await prisma.book.update({
      where: { id: book.id },
      data: book
    })
    return await prisma.book.findMany({
      include: {
        user: true,
        round: true
      }
    })
  } catch (error) {
    throw new Error(String(error))
  }
}

export const deleteBook = async (id: number): Promise<Book[]> => {
  try {
    await prisma.book.delete({ where: { id } })
    return await prisma.book.findMany({
      include: {
        user: true,
        round: true
      }
    })
  } catch (error) {
    throw new Error(String(error))
  }
}

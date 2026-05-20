'use client'

import { FC, useEffect } from 'react'
import { useRatingStore } from './store'
// import './styles.sass'

const RatingPage: FC = () => {
  const { books, getAllBooks } = useRatingStore()

  useEffect(() => {
    getAllBooks()
  }, [])

  return (
    <main className='rating'>
      {books.slice(0, 9).map(book => (
        <div className='rating__book' key={book.id}>
          <div className='rating__book__name'>{book.name}</div>
          <div className='rating__book__rating'>{book.rating}</div>
        </div>
      ))}
    </main>
  )
}

export default RatingPage

'use client'

import { FC, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import {
  Backdrop,
  Button,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField
} from '@mui/material'
import MultiSelect from '@/components/multiselect'
import { useAdminStore } from '@/app/admin/store'
import { Book } from '@prisma/client'

interface IProps {
  open: boolean
  handleClose: () => void
  editBook?: Book
}

const BookModal: FC<IProps> = ({ open, handleClose, editBook }) => {
  const { users, rounds, createBook, updateBook } = useAdminStore()
  const [name, setName] = useState('')
  const [author, setAuthor] = useState('')
  const [user, setUser] = useState<number | null>(null)
  const [round, setRound] = useState<number | null>(null)
  const [readers, setReaders] = useState<number[]>([])
  const [isDisable, setIsDisable] = useState(true)

  useEffect(() => {
    if (name.length < 2 || author.length < 2 || !user || !round) {
      setIsDisable(true)
    } else setIsDisable(false)
  }, [name, author, user, round])

  useEffect(() => {
    if (editBook) {
      setName(editBook.name)
      setAuthor(editBook.author)
      setUser(editBook.user_id)
      setRound(editBook.round_id)
      setReaders(editBook.readers)
    }
  }, [editBook])

  const handleSubmit = () => {
    if (editBook) {
      const book = {
        id: editBook.id,
        name: name.toLowerCase(),
        author: author.toLowerCase(),
        user_id: user as number,
        round_id: round as number,
        readers: readers
      }
      updateBook(book)
    } else {
      const book = {
        name: name.toLowerCase(),
        author: author.toLowerCase(),
        user_id: user as number,
        round_id: round as number,
        readers: readers
      }
      createBook(book)
    }
    handleClose()
    setName('')
    setAuthor('')
    setUser(null)
    setRound(null)
    setReaders([])
    setIsDisable(true)
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          TransitionComponent: Fade
        }
      }}
    >
      <Fade in={open}>
        <div className='modal'>
          <TextField
            label='название'
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <TextField
            label='автор'
            value={author}
            onChange={e => setAuthor(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel>пользователь</InputLabel>
            <Select
              value={user}
              label='пользователь'
              onChange={e => setUser(Number(e.target.value))}
            >
              {users.map((el, key) => (
                <MenuItem value={el.id} key={key}>
                  {el.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>раунд</InputLabel>
            <Select
              value={round}
              label='раунд'
              onChange={e => setRound(Number(e.target.value))}
            >
              {rounds.map((el, key) => (
                <MenuItem value={el.id} key={key}>
                  {dayjs(el.start_date).format('DD/MM/YYYY')} -
                  {el.end_date
                    ? dayjs(el.end_date).format('DD/MM/YYYY')
                    : 'нет'}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <MultiSelect
            items={readers}
            setItems={setReaders}
            array={users}
          />
          <div className='modal__button'>
            <Button onClick={handleSubmit} disabled={isDisable}>
              {editBook ? 'изменить данные' : 'добавить книгу'}
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  )
}

export default BookModal

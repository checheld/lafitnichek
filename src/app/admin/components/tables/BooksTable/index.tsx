import { FC, useState } from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import dayjs from 'dayjs'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import BookModal from '../../modals/BookModal'
import DeleteModal from '../../modals/DeleteModal'
import { useAdminStore } from '@/app/admin/store'

const BooksTable: FC = () => {
  const { books } = useAdminStore()
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [index, setIndex] = useState(0)

  const handleOpenEdit = (key: number) => {
    setOpenEdit(true)
    setIndex(key)
  }

  const handleOpenDelete = (key: number) => {
    setOpenDelete(true)
    setIndex(key)
  }

  return (
    <>
      <TableContainer component={Paper} className='admin__table'>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'></TableCell>
              <TableCell align='center'>название</TableCell>
              <TableCell align='center'>автор</TableCell>
              <TableCell align='center'>пользователь</TableCell>
              <TableCell align='center'>раунд</TableCell>
              <TableCell align='center'>участники</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((row, key) => (
              <TableRow
                key={key}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 }
                }}
              >
                <TableCell align='center'>{key + 1}</TableCell>
                <TableCell align='center'>{row.name}</TableCell>
                <TableCell align='center'>{row.author}</TableCell>
                <TableCell align='center'>{row.user?.name}</TableCell>
                <TableCell align='center'>
                  {dayjs(row.round?.start_date).format('DD/MM/YYYY')}-
                  {row.round?.end_date
                    ? dayjs(row.round?.end_date).format('DD/MM/YYYY')
                    : 'нет'}
                </TableCell>
                <TableCell align='center'>
                  <div className='admin__table__icons'>
                    <div
                      className='admin__table__icons__icon'
                      onClick={() => handleOpenEdit(key)}
                    >
                      <EditIcon />
                    </div>
                    <div
                      className='admin__table__icons__icon'
                      onClick={() => handleOpenDelete(key)}
                    >
                      <DeleteIcon />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {books[index] && (
        <>
          <BookModal
            open={openEdit}
            handleClose={() => setOpenEdit(false)}
            editBook={books[index]}
          />
          <DeleteModal
            open={openDelete}
            handleClose={() => setOpenDelete(false)}
            type='refund'
            id={books[index].id}
          />
        </>
      )}
    </>
  )
}

export default BooksTable

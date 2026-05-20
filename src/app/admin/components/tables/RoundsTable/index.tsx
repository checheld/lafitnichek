import { FC, useState } from 'react'
import dayjs from 'dayjs'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import RoundModal from '../../modals/RoundModal'
import DeleteModal from '../../modals/DeleteModal'
import { useAdminStore } from '@/app/admin/store'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const RoundsTable: FC = () => {
  const { rounds } = useAdminStore()
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
              <TableCell align='center'>начало</TableCell>
              <TableCell align='center'>конец</TableCell>
              <TableCell align='center'>действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rounds.map((row, key) => (
              <TableRow
                key={key}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 }
                }}
              >
                <TableCell align='center'>{key + 1}</TableCell>
                <TableCell align='center'>
                  {dayjs(row.start_date).format('DD/MM/YYYY')}
                </TableCell>
                <TableCell align='center'>
                  {row.end_date
                    ? dayjs(row.end_date).format('DD/MM/YYYY')
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
      <RoundModal
        open={openEdit}
        handleClose={() => setOpenEdit(false)}
        editRound={rounds[index]}
      />
      {rounds[index] && (
        <DeleteModal
          open={openDelete}
          handleClose={() => setOpenDelete(false)}
          type='refund'
          id={rounds[index].id}
        />
      )}
    </>
  )
}

export default RoundsTable

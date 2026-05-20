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
import EditIcon from '@mui/icons-material/Edit'
import UserModal from '../../modals/UserModal'
import { useAdminStore } from '@/app/admin/store'

const UserTable: FC = () => {
  const { users } = useAdminStore()
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  const handleOpen = (key: number) => {
    setOpen(true)
    setIndex(key)
  }

  return (
    <>
      <TableContainer component={Paper} className='admin__table'>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>имя</TableCell>
              <TableCell align='center'>активность</TableCell>
              <TableCell align='center'>возможность выбора</TableCell>
              <TableCell align='center'>роль</TableCell>
              <TableCell align='center'>действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row, key) => (
              <TableRow
                key={key}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 }
                }}
              >
                <TableCell align='center'>{key + 1}</TableCell>
                <TableCell component='th' scope='row'>
                  {row.name}
                </TableCell>
                <TableCell align='center'>
                  {String(row.isActive)}
                </TableCell>
                <TableCell align='center'>
                  {String(row.isAvailableSelect)}
                </TableCell>
                <TableCell align='center'>{row.role}</TableCell>
                <TableCell align='center'>
                  <div
                    className='admin__table__icons__icon'
                    onClick={() => handleOpen(key)}
                  >
                    <EditIcon />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UserModal
        open={open}
        handleClose={() => setOpen(false)}
        editUser={users[index]}
      />
    </>
  )
}

export default UserTable

import { FC } from 'react'
import { Backdrop, Button, Fade, Modal } from '@mui/material'
import { useAdminStore } from '@/app/admin/store'
import { deleteBook } from '@/prisma/repository/adminRepository'

interface IProps {
  open: boolean
  handleClose: () => void
  type: string
  id: number
}

const RoundModal: FC<IProps> = ({ open, handleClose, type, id }) => {
  const { deleteRound } = useAdminStore()

  const handleDelete = () => {
    if (type === 'round') deleteRound(id)
    else if (type === 'book') deleteBook(id)
    handleClose()
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
          <h3>Уверены, что хотите удалить?</h3>
          <div className='modal__buttons'>
            <Button variant='outlined' onClick={handleClose}>
              Отмена
            </Button>
            <Button onClick={handleDelete}>Удалить</Button>
          </div>
        </div>
      </Fade>
    </Modal>
  )
}

export default RoundModal

'use client'

import { FC, useEffect, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider'
import { Backdrop, Button, Fade, Modal } from '@mui/material'
import { useAdminStore } from '@/app/admin/store'
import { Round } from '@prisma/client'

interface IProps {
  open: boolean
  handleClose: () => void
  editRound?: Round
}

const RoundModal: FC<IProps> = ({ open, handleClose, editRound }) => {
  const { createRound, updateRound } = useAdminStore()
  const [start, setStart] = useState<Dayjs | null>(null)
  const [end, setEnd] = useState<Dayjs | null>(null)
  const [isDisable, setIsDisable] = useState(true)

  useEffect(() => {
    if (start) setIsDisable(false)
    else setIsDisable(true)
  }, [start])

  useEffect(() => {
    if (editRound) {
      setStart(dayjs(editRound.start_date))
      setEnd(dayjs(editRound.end_date))
    }
  }, [editRound])

  const handleSubmit = () => {
    if (editRound) {
      const round = {
        id: editRound.id,
        start_date: start!.toDate(),
        end_date: end && end!.toDate()
      }
      updateRound(round)
    } else {
      const round = {
        start_date: start!.toDate(),
        end_date: end && end!.toDate()
      }
      createRound(round)
    }
    handleClose()
    setStart(null)
    setEnd(null)
    setIsDisable(false)
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className='modal__container'>
              <DatePicker
                label='Начало'
                value={start}
                onChange={value => setStart(value)}
              />
              <DatePicker
                label='Конец'
                value={end}
                onChange={value => setEnd(value)}
              />
            </div>
          </LocalizationProvider>
          <div className='modal__button'>
            <Button onClick={handleSubmit} disabled={isDisable}>
              {editRound ? 'изменить данные' : 'добавить раунд'}
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  )
}

export default RoundModal

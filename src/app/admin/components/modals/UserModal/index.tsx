'use client'

import { FC, useEffect, useState } from 'react'
import {
  Backdrop,
  Button,
  Checkbox,
  Fade,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  TextField
} from '@mui/material'
import { useAdminStore } from '@/app/admin/store'
import { Permission, User } from '@prisma/client'
import { Visibility, VisibilityOff } from '@mui/icons-material'

interface IProps {
  open: boolean
  handleClose: () => void
  editUser?: User
}

const UserModal: FC<IProps> = ({ open, handleClose, editUser }) => {
  const { createUser, updateUser } = useAdminStore()
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [isDisable, setIsDisable] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [isAvailableSelect, setIsAvailableSelect] = useState(false)

  useEffect(() => {
    if (name.length < 3 || password.length < 6 || !role) {
      setIsDisable(true)
    } else setIsDisable(false)
  }, [name, password, role])

  useEffect(() => {
    if (editUser) {
      setName(editUser.name)
      setPassword(editUser.password)
      setRole(editUser.role)
      setIsActive(editUser.isActive)
      setIsAvailableSelect(editUser.isAvailableSelect)
    }
  }, [editUser])

  const handleSubmit = () => {
    if (editUser) {
      const user = {
        id: editUser.id,
        name: name.toLowerCase(),
        password: password.toLowerCase(),
        role: role as Permission,
        isActive: isActive,
        isAvailableSelect: isAvailableSelect
      }
      updateUser(user)
    } else {
      const user = {
        name: name.toLowerCase(),
        password: password.toLowerCase(),
        role: role as Permission
      }
      createUser(user)
    }
    handleClose()
    setName('')
    setPassword('')
    setRole('')
    setIsActive(false)
    setIsAvailableSelect(false)
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
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
            label='имя'
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <FormControl>
            <InputLabel>Пароль</InputLabel>
            <OutlinedInput
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label={
                      showPassword
                        ? 'hide the password'
                        : 'display the password'
                    }
                    onClick={() => setShowPassword(show => !show)}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge='end'
                  >
                    {showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label='Password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>роль</InputLabel>
            <Select
              value={role}
              label='роль'
              onChange={e => setRole(e.target.value)}
            >
              {Object.keys(Permission).map((el, key) => (
                <MenuItem value={el} key={key}>
                  {el}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {editUser && (
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isActive}
                    onChange={() => setIsActive(!isActive)}
                  />
                }
                label='Активный'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isAvailableSelect}
                    onChange={() =>
                      setIsAvailableSelect(!isAvailableSelect)
                    }
                  />
                }
                label='Может ли закидывать книгу в этом раунде'
              />
            </div>
          )}
          <div className='modal__button'>
            <Button onClick={handleSubmit} disabled={isDisable}>
              {editUser ? 'изменить данные' : 'добавить пользователя'}
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  )
}

export default UserModal

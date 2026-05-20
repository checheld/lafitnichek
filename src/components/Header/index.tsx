import { FC } from 'react'
import { AppBar } from '@mui/material'
import './styles.sass'

const Header: FC = () => {
  return (
    <AppBar position='static' className='header'>
      <h1>Салонъ Лафитничек</h1>
    </AppBar>
  )
}

export default Header

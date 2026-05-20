'use client'

import { FC } from 'react'
import { SnackbarProvider } from 'notistack'
import { styled } from '@mui/material'
import SnackbarIcon from './SnackbarIcon'

const StyledSnackbarProvider = styled(SnackbarProvider)`
  &.notistack-MuiContent {
    padding-left: 16px !important;
    background-color: #45553d !important;
    font-family: var(--font-baron) !important;
    text-transform: uppercase;
  }
`
interface IProps {
  children: React.ReactNode
}

const SnackbarWrapper: FC<IProps> = ({ children }) => {
  return (
    <StyledSnackbarProvider
      maxSnack={4}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      autoHideDuration={3000}
      iconVariant={{
        success: <SnackbarIcon type={'success'} />,
        error: <SnackbarIcon type={'error'} />,
        warning: <SnackbarIcon type={'warning'} />,
        info: <SnackbarIcon type={'info'} />
      }}
    >
      {children}
    </StyledSnackbarProvider>
  )
}

export default SnackbarWrapper

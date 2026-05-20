import { FC } from 'react'
import CircleIcon from '@mui/icons-material/Circle'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import InfoIcon from '@mui/icons-material/Info'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import './styles.sass'

interface IProps {
  type: string
}

const SnackbarIcon: FC<IProps> = ({ type }) => {
  return (
    <div style={{ boxSizing: 'border-box' }}>
      <div className='container'>
        <CircleIcon
          fontSize='large'
          className={`container__circleIcon ${type}`}
        />
        {type === 'success' && (
          <CheckIcon
            fontSize='medium'
            className='container__notificationIcon'
          />
        )}
        {type === 'error' && (
          <CloseIcon
            fontSize='medium'
            className='container__notificationIcon'
          />
        )}
        {type === 'warning' && (
          <PriorityHighIcon
            fontSize='medium'
            className='container__notificationIcon'
          />
        )}
        {type === 'info' && (
          <InfoIcon
            fontSize='large'
            className='container__infoIcon'
          />
        )}
      </div>
    </div>
  )
}
export default SnackbarIcon

import { FC, useEffect, useState } from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Chip from '@mui/material/Chip'
import { User } from '@prisma/client'
import './styles.sass'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

interface IProps {
  items?: number[]
  setItems: (value: number[]) => void
  array: User[]
}

const MultiSelect: FC<IProps> = ({ items, setItems, array }) => {
  const [personName, setPersonName] = useState<string[]>([])

  useEffect(() => {
    if (items) {
      const elements = items.map(
        el => array.find(item => item.id === el)?.name
      )
      if (elements) setPersonName(elements as string[])
    }
  }, [])

  useEffect(() => {
    const elements = personName.map(
      el => array.find(item => item.name === el)?.id
    )
    if (elements) setItems(elements as number[])
  }, [personName])

  const handleChange = (
    event: SelectChangeEvent<typeof personName>
  ) => {
    const {
      target: { value }
    } = event
    setPersonName(
      typeof value === 'string' ? value.split(',') : value
    )
  }

  return (
    <FormControl fullWidth>
      <InputLabel>участники</InputLabel>
      <Select
        multiple
        value={personName}
        onChange={handleChange}
        input={<OutlinedInput label='участники' />}
        renderValue={selected => (
          <div className='multi-select__chips'>
            {selected.map(value => (
              <Chip key={value} label={value} />
            ))}
          </div>
        )}
        MenuProps={MenuProps}
      >
        {array.map(el => (
          <MenuItem key={el.id} value={el.name}>
            {el.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default MultiSelect

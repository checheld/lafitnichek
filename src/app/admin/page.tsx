'use client'

import { FC, useEffect, useState } from 'react'
import { Button, Tab, Tabs } from '@mui/material'
import UsersTable from './components/tables/UsersTable'
import RoundsTable from './components/tables/RoundsTable'
import BooksTable from './components/tables/BooksTable'
import UserModal from './components/modals/UserModal'
import RoundModal from './components/modals/RoundModal'
import BookModal from './components/modals/BookModal'
import { useAdminStore } from './store'
import './styles.sass'

const filterData = ['пользователи', 'раунды', 'книги']

const AdminPage: FC = () => {
  const { getAllUsers, getAllRounds, getAllBooks } = useAdminStore()
  const [tab, setTab] = useState(0)
  const [openEl, setOpenEl] = useState([false, false, false])

  useEffect(() => {
    getAllUsers()
    getAllRounds()
    getAllBooks()
  }, [])

  const filterChange = (
    event: React.SyntheticEvent,
    value: number
  ) => {
    setTab(value)
  }

  const handleOpenEl = () => {
    const elements = [...openEl]
    elements[tab] = true
    setOpenEl(elements)
  }

  const handleClose = (index: number) => {
    const elements = [...openEl]
    elements[index] = false
    setOpenEl(elements)
  }

  const _renderFilterButton = () =>
    filterData.map((i, index) => <Tab label={i} key={index} />)

  return (
    <main className='admin'>
      <div className='admin__panel'>
        <Tabs
          selectionFollowsFocus
          onChange={filterChange}
          value={tab}
          indicatorColor='secondary'
        >
          {_renderFilterButton()}
        </Tabs>
        <Button onClick={handleOpenEl}>добавить</Button>
      </div>
      {tab === 0 && (
        <>
          <UsersTable />
          <UserModal
            handleClose={() => handleClose(0)}
            open={openEl[0]}
          />
        </>
      )}
      {tab === 1 && (
        <>
          <RoundsTable />
          <RoundModal
            handleClose={() => handleClose(1)}
            open={openEl[1]}
          />
        </>
      )}
      {tab === 2 && (
        <>
          <BooksTable />
          <BookModal
            handleClose={() => handleClose(2)}
            open={openEl[2]}
          />
        </>
      )}
    </main>
  )
}

export default AdminPage

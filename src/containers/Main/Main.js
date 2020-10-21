import React from 'react'
import AddItem from '../../components/AddItem/AddItem'
import NoteList from '../../components/NoteList/NoteList'

const Main = () => {
  return (
    <main>
      <div className="container">
        <AddItem 
          text='Add a new note'
        />
        <NoteList />
      </div>
    </main>
  )
}

export default Main
import React from 'react'
import NoteList from '../../components/NoteList/NoteList'
import LinkButton from '../../components/UI/LinkButton/LinkButton'

const Main = () => {
  return (
    <main>
      <div className='container'>
        <LinkButton 
          link='/note'
          text={<><span className={`icon-plus`}></span> Add a new note</>}
          classType='add'
          title='Add a new note'
        />
        <NoteList />
      </div>
    </main>
  )
}

export default Main
import React from 'react'
import { useSelector } from 'react-redux'
import NoteList from '../../components/NoteList/NoteList'
import Confirmation from '../../components/UI/Confirmation/Confirmation'
import LinkButton from '../../components/UI/LinkButton/LinkButton'

const Main = () => {
  const deletionId = useSelector(state => state.noteList.deletionId)

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

      {
        deletionId
          ? <Confirmation />
          : ''
      }
    </main>
  )
}

export default Main
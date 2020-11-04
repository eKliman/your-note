import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NoteList from '../../components/NoteList/NoteList'
import Confirmation from '../../components/UI/Confirmation/Confirmation'
import LinkButton from '../../components/UI/LinkButton/LinkButton'
import Select from '../../components/UI/Select/Select'
import { setSortingNoteList } from '../../store/actions/noteList'
import classes from './Main.module.scss'

const Main = () => {
  const dispatch = useDispatch()
  const deletionId = useSelector(state => state.noteList.deletionId)
  const noteList = useSelector(state => state.noteList.notes)
  const sorting = useSelector(state => state.noteList.sorting)

  const changeSortHandler = value => {
    dispatch(setSortingNoteList(value))
  }

  return (
    <main>
      <div className='container'>
        <div className={classes.panel}>
          <LinkButton 
            link='/note'
            text={<><span className={`icon-plus`}></span> Add new note</>}
            classType='add'
            title='Add new note'
          />

          {
            Object.keys(noteList)?.length
              ? <Select 
                changeHandler={changeSortHandler}
                options={['Newest', 'Oldest']}
                sorting={sorting}
              />
              : ''
          }
        </div>

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
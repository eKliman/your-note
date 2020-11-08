import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NoteList from '../../components/NoteList/NoteList'
import Alert from '../../components/UI/Alert/Alert'
import Confirmation from '../../components/UI/Confirmation/Confirmation'
import LinkButton from '../../components/UI/LinkButton/LinkButton'
import Loader from '../../components/UI/Loader/Loader'
import Select from '../../components/UI/Select/Select'
import { getNotesFromServer, getNotesFromStorage, setSortingNoteList } from '../../store/actions/noteList'
import classes from './Main.module.scss'

const Main = () => {
  const dispatch = useDispatch()
  const deletionId = useSelector(state => state.noteList.deletionId)
  const noteList = useSelector(state => state.noteList.notes)
  const sorting = useSelector(state => state.noteList.sorting)
  const loading = useSelector(state => state.app.loading)
  const alert = useSelector(state => state.app.alertText)
  const token = useSelector(state => state.auth.token)

  useEffect(() => {
    if (token) {
      dispatch(getNotesFromServer())
      return
    }
    dispatch(getNotesFromStorage())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const changeSortHandler = value => {
    dispatch(setSortingNoteList(value))
  }

  return (
    <main>
      <div className='container'>
        {alert ? <Alert /> : null}
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
      
        {
          loading
            ? <Loader />
            : <NoteList />
        }
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
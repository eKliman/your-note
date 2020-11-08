import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Button from '../../components/UI/Button/Button'
import Todo from '../../components/ToDo/ToDo'
import ModalInput from '../../components/UI/ModalInput/ModalInput'
import Confirmation from '../../components/UI/Confirmation/Confirmation'
import Select from '../../components/UI/Select/Select'
import Loader from '../../components/UI/Loader/Loader'
import Alert from '../../components/UI/Alert/Alert'
import { idGenerator, sortDone, sortInProgress } from '../../utils/utils'
import { setLoading } from '../../store/actions/app'
import { 
  setTodos, 
  setIdEditingTodo, 
  setInitialState, 
  setIsTitleEditing, 
  setNoteTitle, 
  setSorting,
  saveNoteToServer
} from '../../store/actions/note'
import { 
  getNoteFromServerById, 
  getNotesFromStorage, 
  saveNotesToStorage, 
  setUndoNoteId 
} from '../../store/actions/noteList'
import classes from './Note.module.scss'
import LinkButton from '../../components/UI/LinkButton/LinkButton'

const Note = props => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)
  const loading = useSelector(state => state.app.loading)
  const noteList = useSelector(state => state.noteList.notes)
  const note = useSelector(state => state.note)
  const deletionId = useSelector(state => state.noteList.deletionId)
  const undoId = useSelector(state => state.noteList.undoId)
  const sorting = useSelector(state => state.note.sorting)
  const id = props.match.params.id || idGenerator('note')
  const isNoteNew = !props.match.params.id
  const alert = useSelector(state => state.app.alertText)

  // Getting data from Server or Local storage
  useEffect(() => {
    if (token && !isNoteNew) {
      dispatch(getNoteFromServerById(id))
      return
    }
    dispatch(getNotesFromStorage())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  // Getting data for editing an existing note
  useEffect(() => {
    if(!token && Object.values(noteList).length && !isNoteNew) {
      dispatch(setNoteTitle(noteList[id].title))
      dispatch(setTodos(JSON.parse(JSON.stringify(noteList[id].todos))))
      dispatch(setIsTitleEditing(false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteList])

  useEffect(() => {
    // Create a title for a new note
    if (isNoteNew) {
      dispatch(setIsTitleEditing(true))
    }
    return () => dispatch(setInitialState())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Sorting tasks
  let todosKeys = Object.keys(note.todos)
  if (sorting === 'Newest') {
    todosKeys = todosKeys.reverse()
  } else if (sorting === 'Done') {
    todosKeys = todosKeys.sort((a, b) => sortDone(a, b, note.todos))
  } else if (sorting === 'In progress') {
    todosKeys = todosKeys.sort((a, b) => sortInProgress(a, b, note.todos))
  }

  const addTodoHandler = () => {
    dispatch(setIdEditingTodo(idGenerator('todo')))
  }
  
  const saveHandler = async () => {
    let error
    if (token) {
      dispatch(setLoading(true))
      error = await dispatch(saveNoteToServer(token, isNoteNew, id))
      dispatch(setLoading(false))
    } else {
      const data = {...noteList, [id]: {title: note.title, todos: note.todos}}
      dispatch(saveNotesToStorage(data))
    }

    if (!error) {
      props.history.push('/')
    }
  }

  const changeSortHandler = value => {
    dispatch(setSorting(value))
  }

  const renderTodos = () => todosKeys.map(key => (
    <Todo 
      key={key}
      id={key}
      text={note.todos[key].text}
      isChecked={note.todos[key].done}
    />
  ))

  return (
    <main>
      <div className='container'>
        {alert ? <Alert /> : null}
        <div className={classes.note}>
          <div className={classes.header}>
            <Todo 
              text={note.title} 
              isTodo={false}
              id={id}
            />
          </div>
          
          <div className={classes.body}>
            <div className={classes.panel}>
              <Button
                text={<><span className={`icon-plus`}></span> Add task</>}
                classType='add'
                title='Add task' 
                clickHandler={addTodoHandler}
              />

              <Select 
                changeHandler={changeSortHandler}
                options={['Newest', 'Oldest', 'Done', 'In progress']}
                sorting={sorting}
              />
            </div>

            {loading ? <Loader /> : renderTodos()}

            <div className={classes.bottomButtons}>
              <Button
                text='Save note'
                classType='success'
                title='Save note'
                disabled={!note.isTouched}
                clickHandler={saveHandler}
              />
              {
                note.isTouched
                  ? <Button
                      text='Reset changes'
                      classType='danger'
                      title='Reset changes' 
                      clickHandler={() => dispatch(setUndoNoteId(id))}
                    />
                  : <LinkButton 
                      link='/'
                      text='Home page'
                      classType='primary'
                      title='To home page'
                    />
              }
            </div>
          </div>
        </div>
      </div>
      {
        note.isTitleEditing || note.idEditingTodo
          ? <ModalInput />
          : ''
      }
      {
        deletionId || undoId
          ? <Confirmation />
          : ''
      }
    </main>
  )
}

export default withRouter(Note) 
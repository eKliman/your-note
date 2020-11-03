import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Button from '../../components/UI/Button/Button'
import Todo from '../../components/ToDo/ToDo'
import ModalInput from '../../components/UI/ModalInput/ModalInput'
import { 
  setTodos, 
  setIdEditingTodo, 
  setInitialState, 
  setIsTitleEditing, 
  setNoteTitle 
} from '../../store/actions/note'
import { idGenerator } from '../../utils/utils'
import classes from './Note.module.scss'
import Confirmation from '../../components/UI/Confirmation/Confirmation'
import { saveNotesToStorage, setUndoNoteId } from '../../store/actions/noteList'

const Note = props => {
  const dispatch = useDispatch()
  const noteList = useSelector(state => state.noteList.notes)
  const note = useSelector(state => state.note)
  const deletionId = useSelector(state => state.noteList.deletionId)
  const undoId = useSelector(state => state.noteList.undoId)
  const id = props.match.params.id || idGenerator('note')
  
  useEffect(() => {
    if (noteList[id]) {
      dispatch(setNoteTitle(noteList[id].title))
      dispatch(setTodos(JSON.parse(JSON.stringify(noteList[id].todos))))
      dispatch(setIsTitleEditing(false))
      return
    }
    dispatch(setIsTitleEditing(true))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteList])

  useEffect(() => {
    return () => dispatch(setInitialState())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addTodoHandler = () => {
    dispatch(setIdEditingTodo(idGenerator('todo')))
  }

  const saveHandler = () => {
    const data = {...noteList, [id]: {title: note.title, todos: note.todos}}
    dispatch(saveNotesToStorage(data))
    props.history.push('/')
  }

  return (
    <main>
      <div className='container'>
        <div className={classes.note}>
          <div className={classes.header}>
            <Todo 
              text={note.title} 
              isTodo={false}
              id={id}
            />
          </div>
          
          <div className={classes.body}>
            <Button
              text={<><span className={`icon-plus`}></span> Add task</>}
              classType='add'
              title='Add task' 
              clickHandler={addTodoHandler}
            />

            {
              Object.keys(note.todos).map(key => (
                <Todo 
                  key={key}
                  id={key}
                  text={note.todos[key].text}
                  isChecked={note.todos[key].done}
                />
              ))
            }

            <div className={classes.bottomButtons}>
              <Button
                text='Save note'
                classType='success'
                title='Save note'
                disabled={!note.isTouched}
                clickHandler={saveHandler}
              />
              <Button
                text='Reset changes'
                classType='danger'
                title='Reset changes' 
                disabled={!note.isTouched}
                clickHandler={() => dispatch(setUndoNoteId(id))}
              />
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
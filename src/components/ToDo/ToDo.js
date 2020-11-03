import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNoteIdToDelete } from '../../store/actions/noteList'
import { 
  setIdEditingTodo, 
  setIsTitleEditing, 
  setTodos, 
  setPrevTodos, 
  setPrevTitle, 
  setIsTouched 
} from '../../store/actions/note'
import Button from '../UI/Button/Button'
import classes from './ToDo.module.scss'

const Todo = ({text = '', isChecked = false, isTodo = true, id = ''}) => {
  const dispatch = useDispatch()
  const note = useSelector(state => state.note)
  const todos = {...note.todos}
  const prevTitle = {...note.prevTitle}
  const prevTodos = {...note.prevTodos}

  const editHandler = () => {
    if (isTodo) {
      dispatch(setIdEditingTodo(id))
    } else {
      dispatch(setIsTitleEditing(true))
    }
  }

  const deleteHandler = () => {
    if (isTodo) {
      delete todos[id]
      dispatch(setTodos(todos))
      return
    }

    dispatch(setNoteIdToDelete(id))
  }

  const checkboxHandler = () => {
    todos[id].done = !isChecked
    dispatch(setTodos(todos))
    dispatch(setIsTouched(true))
  }

  const undoRedoHandler = () => {
    if (!isTodo) {
      [note.title, prevTitle.title] = [prevTitle.title, note.title]
      prevTitle.undoTitleBtn = !prevTitle.undoTitleBtn
      prevTitle.redoTitleBtn = !prevTitle.redoTitleBtn
      dispatch(setPrevTitle(prevTitle))
      return
    }

    [todos[id].text, prevTodos[id].text] = [prevTodos[id].text, todos[id].text]
    prevTodos[id].undoBtn = !prevTodos[id].undoBtn
    prevTodos[id].redoBtn = !prevTodos[id].redoBtn
    dispatch(setPrevTodos(prevTodos))
  }

  const cls = [classes.todo]
  if (!isTodo) {
    cls.push(classes.title)
  } else if (isChecked) {
    cls.push(classes.done)
  }

  return (
    <div className={cls.join(' ')}>
      <div className={classes.buttons}>
        {
          (prevTitle.undoTitleBtn && !isTodo) || 
          (prevTodos[id] && (prevTodos[id].undoBtn && isTodo))
            ? <Button
              text={<span className="icon-undo2"></span>}
              classType='btnIcon'
              title='Undo'
              clickHandler={undoRedoHandler}
              disabled={isChecked}
            />
            : ''
        }
        {
          (prevTitle.redoTitleBtn && !isTodo) || 
          (prevTodos[id] && (prevTodos[id].redoBtn && isTodo))
            ? <Button
              text={<span className="icon-redo2"></span>}
              classType='btnIcon'
              title='Redo'
              clickHandler={undoRedoHandler}
              disabled={isChecked}
            />
            : ''
        }

        <Button
          text={<span className="icon-pencil"></span>}
          classType='btnIcon'
          title={isTodo ? 'Edit task' : 'Edit note'}
          clickHandler={editHandler}
          disabled={isChecked}
        />
        <Button
          text={<span className='icon-bin'></span>}
          classType='deleteIcon'
          title={isTodo ? 'Delete task' : 'Delete note'}
          clickHandler={deleteHandler}
        />
      </div>

      {
        isTodo 
          ? <>
            <input type='checkbox' checked={isChecked} onChange={checkboxHandler} id={id} />
            <label htmlFor={id} />
          </> 
          : ''
      }

      <span className={classes.text}>{text}</span>
    </div>
  )
}

export default Todo
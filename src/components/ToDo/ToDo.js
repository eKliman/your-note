import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIdEditingTodo, setIsTitleEditing, changetodos, changePrevState } from '../../store/actions/note'
import Button from '../UI/Button/Button'
import classes from './Todo.module.scss'

const Todo = ({text = '', isChecked = false, isTodo = true, id = ''}) => {
  const dispatch = useDispatch()
  const note = useSelector(state => state.note)
  const todos = {...note.todos}
  const prevState = {...note.prevState}

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
      dispatch(changetodos(todos))
    }
  }

  const checkboxHandler = () => {
    todos[id].done = !isChecked
    dispatch(changetodos(todos))
  }

  const undoRedoHandler = () => {
    if (!isTodo) {
      [note.title, prevState.title] = [prevState.title, note.title]
      prevState.undoTitleBtn = !prevState.undoTitleBtn
      prevState.redoTitleBtn = !prevState.redoTitleBtn
    } else {
      [todos[id].text, prevState.todos[id].text] = [prevState.todos[id].text, todos[id].text]
      prevState.todos[id].undoBtn = !prevState.todos[id].undoBtn
      prevState.todos[id].redoBtn = !prevState.todos[id].redoBtn
    }
    dispatch(changePrevState(prevState))
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
          (prevState.undoTitleBtn && !isTodo) || 
          (prevState.todos[id] && (prevState.todos[id].undoBtn && isTodo))
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
          (prevState.redoTitleBtn && !isTodo) || 
          (prevState.todos[id] && (prevState.todos[id].redoBtn && isTodo))
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
            <input type='checkbox' checked={isChecked} onChange={checkboxHandler} id={id}></input>
            <label htmlFor={id} />
          </> 
          : ''
      }

      <span className={classes.text}>{text}</span>
    </div>
  )
}

export default Todo
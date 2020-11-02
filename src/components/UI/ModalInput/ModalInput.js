import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
  setIdEditingTodo, 
  setIsTitleEditing, 
  setNoteTitle, setTodos, 
  setPrevTitle, setPrevTodos, setIsTouched 
} from '../../../store/actions/note'
import Backdrop from '../Backdrop/Backdrop'
import Button from '../Button/Button'
import Input from '../Input/Input'
import LinkButton from '../LinkButton/LinkButton'
import classes from './ModalInput.module.scss'

const ModalInput = () => {
  const dispatch = useDispatch()
  const inputRef = useRef(null)
  const note = useSelector(state => state.note)
  const todos = {...note.todos}
  const isTitleEditing = note.isTitleEditing
  const prevTitle = {...note.prevTitle}
  const prevTodos = {...note.prevTodos}
  let noteTitle = note.title
  
  const [value, setValue] = useState(startValue)
  const [disabled, setDisabled] = useState(true)

  //Define start value for input
  let startValue
  if (isTitleEditing) {
    startValue = note.title
  } else {
    startValue = todos[note.idEditingTodo] 
      ? todos[note.idEditingTodo].text
      : ''
  }

  //Set the focus on input
  useEffect(() => inputRef.current.focus(), [])
  
  let label
  if (isTitleEditing) {
    label = 'Enter your note title:'
  } else {
    label = 'Enter your task:'
  }

  const changeHandler = val => {
    setDisabled(!val)
    setValue(val)
  }

  const submitHandler = event => {
    event.preventDefault()

    if (isTitleEditing) {
      //Save to the previous state and display the undo/redo buttons for the title
      prevTitle.title = noteTitle
      prevTitle.redoTitleBtn = false
        if(prevTitle.title) {
          prevTitle.undoTitleBtn = true
        }
      dispatch(setPrevTitle(prevTitle))

      //Work with the current title state
      noteTitle = value
      dispatch(setNoteTitle(noteTitle))
      dispatch(setIsTitleEditing(false))
      dispatch(setIsTouched(true))
      return
    }

    //Create initial state for new Todo
    if (note.idEditingTodo && !todos[note.idEditingTodo]) {
      todos[note.idEditingTodo] = {
        text: '',
        done: false
      }
      prevTodos[note.idEditingTodo] = {
        text: '',
        undoBtn: false,
        redoBtn: false
      }
    }

    //Create initial prevState for editing Todo
    if (!prevTodos[note.idEditingTodo]) {
      prevTodos[note.idEditingTodo] = {
        text: '',
        undoBtn: false,
        redoBtn: false
      }
    }

    //Save to the previous state and display the undo/redo buttons for the edited todo
    prevTodos[note.idEditingTodo].text = todos[note.idEditingTodo].text
    prevTodos[note.idEditingTodo].redoBtn = false
        if(prevTodos[note.idEditingTodo].text) {
          prevTodos[note.idEditingTodo].undoBtn = true
        }
    dispatch(setPrevTodos(prevTodos))

    //Work with the current state
    todos[note.idEditingTodo].text = value
    dispatch(setTodos(todos))
    dispatch(setIdEditingTodo(''))
    dispatch(setIsTouched(true))
  }

  const cancelHandler = () => {
    dispatch(setIsTitleEditing(false))
    dispatch(setIdEditingTodo(''))
  }

  return (
    <>
      <form 
        className={classes.modal} 
        onSubmit={event => submitHandler(event)}
      >
        <Input 
          label={label}
          changeHandler={changeHandler}
          inputRef={inputRef}
          value={value}
        />

        <div className={classes.buttons}>
          <Button
            text='Save'
            classType='success'
            title='Save'
            disabled={disabled}
            type='submit'
          />

          {
            isTitleEditing && !noteTitle
              ? <LinkButton 
                  link='/'
                  text='Cancel'
                  classType='danger'
                  title='Cancel'
                />
              : <Button
                  text='Cancel'
                  classType='danger'
                  title='Cancel'
                  clickHandler={cancelHandler}
                />
          }
        </div>
      </form>

      <Backdrop />
    </>
  )
}

export default ModalInput
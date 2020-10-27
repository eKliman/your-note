import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIdEditingTodo, setIsTitleEditing, setNoteTitle, changetodos, changePrevState } from '../../../store/actions/note'
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
  let noteTitle = note.title

  const prevState = {...note.prevState}

  //Define start value for input
  let startValue
  if (isTitleEditing) {
    startValue = note.title
  } else {
    startValue = note.todos[note.idEditingTodo] 
      ? note.todos[note.idEditingTodo].text
      : ''
  }

  const [value, setValue] = useState(startValue)
  const [disabled, setDisabled] = useState(true)

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
      prevState.title = noteTitle
      prevState.redoTitleBtn = false
        if(prevState.title) {
          prevState.undoTitleBtn = true
        }
      dispatch(changePrevState(prevState))

      //Work with the current title state
      noteTitle = value
      dispatch(setNoteTitle(noteTitle))
      dispatch(setIsTitleEditing(false))
      return
    }

    //Create initial state for new Todo
    if (note.idEditingTodo && !note.todos[note.idEditingTodo]) {
      todos[note.idEditingTodo] = {
        text: '',
        done: false
      }
      prevState.todos[note.idEditingTodo] = {
        text: '',
        undoBtn: false,
        redoBtn: false
      }
    }

    //Save to the previous state and display the undo/redo buttons for the edited todo
    prevState.todos[note.idEditingTodo].text = todos[note.idEditingTodo].text
    prevState.todos[note.idEditingTodo].redoBtn = false
        if(prevState.todos[note.idEditingTodo].text) {
          prevState.todos[note.idEditingTodo].undoBtn = true
        }
    dispatch(changePrevState(prevState))

    //Work with the current state
    todos[note.idEditingTodo].text = value
    dispatch(changetodos(todos))
    dispatch(setIdEditingTodo(''))
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
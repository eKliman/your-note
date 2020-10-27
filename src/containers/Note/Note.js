import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../components/UI/Button/Button'
import Todo from '../../components/Todo/Todo'
import ModalInput from '../../components/UI/ModalInput/ModalInput'
import classes from './Note.module.scss'
import { setIdEditingTodo } from '../../store/actions/note'
import { idGenerator } from '../../utils/utils'

const Note = () => {
  const note = useSelector(state => state.note)
  const dispatch = useDispatch()

  const addTodoHandler = () => {
    dispatch(setIdEditingTodo(idGenerator('todo')))
  }

  return (
    <main>
      <div className='container'>
        <div className={classes.note}>
          <div className={classes.header}>
            <Todo 
              text={note.title} 
              isTodo={false}
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
              />
              <Button
                text='Undo changes'
                classType='danger'
                title='Undo changes' 
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
    </main>
  )
}

export default Note
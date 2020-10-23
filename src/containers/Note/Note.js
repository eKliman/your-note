import React from 'react'
import AddItem from '../../components/UI/AddItem/AddItem'
import Button from '../../components/UI/Button/Button'
import ToDo from '../../components/ToDo/ToDo'
import classes from './Note.module.scss'

const Note = () => {
  const noteData = {
  title: 'Refresh knowledge about vanilla JS',
  todos: [
    {
      todo: 'Repeat Excel course',
      done: false
    },
    {
      todo: 'To be in focus',
      done: true
    },
    {
      todo: 'Work hard',
      done: false
    }
  ],
  id: 2
}

  return (
    <main>
      <div className='container'>
        <div className={classes.topButtons}>
        <Button
            text='&larr; Back to main'
            type='link'
            title='Return to main page'
          ></Button>
        <Button
            text={<span className='icon-bin'></span>}
            type='deleteIcon'
            title='Delete note'
          ></Button>
        </div>
        <ToDo 
          text={noteData.title} 
          isCheckboxNeeded={false}
        />
        <AddItem text='Add a new task' type='small'/>
        {noteData.todos.map((item, i) => (
          <ToDo 
            key={i}
            text={item.todo}
            isChecked={item.done}
          />
        ))}

        <div className={classes.bottomButtons}>
          <Button
            text='Save'
            type='success'
            title='Save changes'
          ></Button>
          <Button
            text='Reset'
            type='danger'
            title='Undo changes'
          ></Button>
        </div>
      </div>
    </main>
  )
}

export default Note
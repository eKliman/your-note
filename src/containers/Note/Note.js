import React from 'react'
import AddItem from '../../components/UI/AddItem/AddItem'
import Button from '../../components/UI/Button/Button'
import ToDo from '../../components/ToDo/ToDo'
import classes from './Note.module.scss'

const Note = () => {
  const noteData = {
  title: 'Refresh knowledge about vanilla JS. And I am not kidding',
  todos: [
    {
      todo: 'Repeat Excel course Repeat Excel course Repeat Excel course Repeat Excel course Repeat Excel course Repeat Excel course',
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
        <div className={classes.note}>
          <div className={classes.header}>

            <ToDo 
              text={noteData.title} 
              isCheckboxNeeded={false}
            />
          </div>
          
          <div className={classes.body}>
            <AddItem text='Add subtask' type='small'/>
            {noteData.todos.map((item, i) => (
              <ToDo 
                key={i}
                text={item.todo}
                isChecked={item.done}
              />
            ))}

            <div className={classes.bottomButtons}>
              <Button
                text='Save note'
                type='success'
                title='Save note'
              ></Button>
              <Button
                text='Undo changes'
                type='danger'
                title='Undo changes'
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Note
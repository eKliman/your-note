import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../UI/Button/Button'
import classes from './NoteList.module.scss'

const list = [
  {
    title: 'Create awesome application',
    todos: [
      {
        todo: 'To be in focus',
        done: false
      },
      {
        todo: 'Work hard',
        done: true
      }
    ],
    id: 1
  },
  {
    title: 'Refresh knowledge about vanila JS',
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
  },
  {
    title: 'Testing note on "0" todo',
    todos: [
    ],
    id: 3
  }
]

const renderNotes = () => 
  list.map(item => (
    <li key={item.id} className={classes.item}>
      <Link to={`/note/${item.id}`} className={classes.link}>
        <h3>{item.title}</h3>
        <ul>
        {item.todos.slice(0, 2).map((todo, i) => (
          <li key={i} className={classes.todo}>&#10004; {todo.todo}</li>
          ))}
          {item.todos[2] && <span className={classes.etc}>&#10004; <b>. . .</b></span>}
        </ul>
      </Link>
      <Button
        text={<span className='icon-bin'></span>}
        type='deleteIcon'
        title='Delete note'
      ></Button>
    </li>
  ))

const NoteList = () => {
  return (
    <ul className={classes.list}>
      {renderNotes()}
    </ul>
  )
}

export default NoteList
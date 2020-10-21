import React from 'react'
import { Link } from 'react-router-dom'
import classes from './NoteList.module.scss'

const list = [
  {
    title: 'Create awesome application',
    todos: [
      'To be in focus',
      'Work hard'
    ],
    id: 1
  },
  {
    title: 'Refresh knowledge about vanila JS',
    todos: [
      'Repeat Excel course',
      'To be in focus',
      'Work hard'
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
          <li key={i} className={classes.todo}>&#10004; {todo}</li>
          ))}
          {item.todos[2] && <span className={classes.etc}>&#10004; <b>. . .</b></span>}
        </ul>
      </Link>
      <span className={`icon-bin ${classes.delete}`} title="Delete note"></span>
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
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setNoteIdToDelete } from '../../store/actions/noteList'
import Button from '../UI/Button/Button'
import classes from './NoteList.module.scss'

const NoteList = () => {
  const dispatch = useDispatch()
  const noteList = useSelector(state => state.noteList.notes)

  const renderNotes = () => {
    return Object.keys(noteList).map(key => (
      <li 
        key={key} 
        className={classes.item}
      >
        <Link 
          to={`/note/${key}`} 
          className={classes.link}
        >
          <h3>{noteList[key].title}</h3>
          <ul>
          {(Object.keys(noteList[key].todos).slice(0, 2)).map(todoKey => (
            <li key={todoKey} className={classes.todo}>&#10004; {noteList[key].todos[todoKey].text}</li>
            ))}
            {(Object.keys(noteList[key].todos).length > 2) && <span className={classes.etc}>&#10004; <b>. . .</b></span>}
          </ul>
        </Link>
        <Button
          text={<span className='icon-bin'></span>}
          classType='deleteIcon'
          title='Delete note'
          clickHandler={() => dispatch(setNoteIdToDelete(key))}
        ></Button>
      </li>
    ))
  }

  return (
    <ul className={classes.list}>
      {renderNotes()}
    </ul>
  )
}

export default NoteList

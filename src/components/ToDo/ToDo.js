import React from 'react'
import Button from '../UI/Button/Button'
import classes from './ToDo.module.scss'

const ToDo = ({text = '', isChecked = false, isCheckboxNeeded = true}) => {
  return (
    <div className={classes.toDo + ' ' + (!isCheckboxNeeded ? classes.title : '')}>
      <div className={classes.buttons}>
        <Button
          text={<span className="icon-pencil"></span>}
          type='btnIcon'
          title={isCheckboxNeeded ? 'Edit subtask' : 'Edit note'}
        ></Button>
        <Button
          text={<span className='icon-bin'></span>}
          type='deleteIcon'
          title={isCheckboxNeeded ? 'Delete subtask' : 'Delete note'}
        ></Button>
      </div>

      {
        isCheckboxNeeded 
          ? <input type='checkbox' checked={isChecked} onChange={() => {}}></input> 
          : ''
      }

      <span className={classes.text}>{text}</span>
    </div>
  )
}

export default ToDo
import React from 'react'
import classes from './ToDo.module.scss'

const ToDo = ({text = '', isChecked = false, isCheckboxNeeded = true}) => {
  return (
    <div className={classes.toDo}>
      {
        isCheckboxNeeded 
          ? <input type='checkbox' checked={isChecked} onChange={() => {}}></input> 
          : ''
      } 
      <div 
        contentEditable={true}
        suppressContentEditableWarning={true}
        className={classes.input + ' ' + (!isCheckboxNeeded ? classes.title : '')}
        onInput={(e) => {console.log(e.target.textContent)}}
      >{text}</div>
    </div>
  )
}

export default ToDo
import React from 'react'
import classes from './Input.module.scss'

const Input = ({label, changeHandler, inputRef, value}) => {
  return (
    <div className={classes.Input}>
      <label>
        <span>{label}</span>
        <input 
          type='text'
          onChange={event => changeHandler(event.target.value)}
          ref={inputRef}
          value={value}
        />
      </label>
    </div>
  )
}

export default Input
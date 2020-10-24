import React from 'react'
import classes from './Input.module.scss'

const Input = ({label}) => {
  return (
    <div className={classes.Input}>
      <label>
        <span>{label}</span>
        <input type='text'/>
      </label>
    </div>
  )
}

export default Input
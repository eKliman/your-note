import React from 'react'
import classes from './Button.module.scss'

const Button = ({text, type = '', title = ''}) => {
  return (
    <button 
      className={`${classes.button} ${classes[type]}`}
      title={title}
    >
      {text}
    </button>
  )
}

export default Button
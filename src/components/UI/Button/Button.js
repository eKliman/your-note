import React from 'react'
import classes from './Button.module.scss'

const Button = ({text, classType, title = '', disabled = false, clickHandler = () => {}, type = 'button'}) => {
  return (
    <button 
      className={`${classes.button} ${classes[classType]}`}
      title={title}
      onClick={clickHandler}
      disabled={disabled}
      type={type}
    >
      {text}
    </button>
  )
}

export default Button
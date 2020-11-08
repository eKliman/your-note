import React from 'react'
import classes from './Input.module.scss'

const Input = ({
  label, changeHandler, focus = null, value = '', 
  errorMessage = '', type = 'text', valid, touched, 
  shouldValidate, blurHandler = null
}) => {
  const isInvalid = () => !valid && shouldValidate && touched 
  const cls = [classes.labelText]
  
  if (isInvalid()) {
    cls.push(classes.invalid)
  }

  return (
    <div className={classes.Input}>
      <label>
        <span className={cls.join(' ')}>{label}</span>
        <input 
          type={type}
          ref={focus}
          value={value}
          onChange={changeHandler}
          onBlur={blurHandler}
        />
        {
          isInvalid() 
            ? <span className={classes.error}>{errorMessage || 'Enter correct value'}</span>
            : null
        }
        
      </label>
    </div>
  )
}

export default Input
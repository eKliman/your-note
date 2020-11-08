import React from 'react'
import { useSelector } from 'react-redux'
import classes from './Alert.module.scss'

const Alert = () => {
  const text = useSelector(state => state.app.alertText)
  return (
    <div className={classes.alert}>
      <p>{text}</p>
    </div>
  )
}

export default Alert
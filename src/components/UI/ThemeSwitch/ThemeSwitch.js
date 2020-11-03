import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setThemeToStorage } from '../../../store/actions/app'
import classes from './ThemeSwitch.module.scss'

const ThemeSwitch = () => {
  const dispatch = useDispatch()
  const darkTheme = useSelector(state => state.app.darkTheme)
  const changeHandler = () => {
    dispatch(setThemeToStorage(!darkTheme))
  }

  return (
    <label className={classes.switch}>
      <input 
        type="checkbox" 
        className={classes.checkbox}
        onChange={changeHandler}
        checked={darkTheme}
      />
      <span className={classes.slider} />
    </label>
  )
}

export default ThemeSwitch
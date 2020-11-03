import React from 'react'
import { Link } from 'react-router-dom'
import ThemeSwitch from '../UI/ThemeSwitch/ThemeSwitch'
import classes from './Header.module.scss'

const Header = () => {
  return (
    <header className={classes.header}>
      <div className='container'>
        <div className={classes.inner}>
          <Link to='/' className={classes.logo}>
            <span><strong>Your Note</strong></span>
          </Link>
          <div className={classes.buttons}>
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
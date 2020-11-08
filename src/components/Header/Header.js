import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import Button from '../UI/Button/Button'
import LinkButton from '../UI/LinkButton/LinkButton'
import ThemeSwitch from '../UI/ThemeSwitch/ThemeSwitch'
import { logout } from '../../store/actions/auth'
import classes from './Header.module.scss'

const Header = props => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)
  const logOutHandler = () => {
    dispatch(logout())
    props.history.push('/')
  }
  
  return (
    <header className={classes.header}>
      <div className='container'>
        <div className={classes.inner}>
          <Link to='/' className={classes.logo}>
            <span><strong>Your Note</strong></span>
          </Link>
          <div className={classes.buttons}>
          {
            token
              ? <Button
                  text={<span className='icon-exit'></span>}
                  classType='logIcon'
                  title='Log out'
                  clickHandler={logOutHandler}
                />
              : 
                <LinkButton 
                  link='/auth'
                  text={<span className='icon-enter'></span>}
                  classType='logIcon'
                  title='Login'
                />
          }            
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </header>
  )
}

export default withRouter(Header)
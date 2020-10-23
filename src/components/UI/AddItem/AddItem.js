import React from 'react'
import { Link } from 'react-router-dom'
import classes from './AddItem.module.scss'

const AddItem = ({text, type = ''}) => (
  <Link 
    to='/note' 
    className={`${classes.link} ${type === 'small' ? classes.small : ''}`}
  >
    <span className={`icon-plus ${classes.icon}`}></span>
    <span className={classes.text}>{text}</span>
  </Link>
)

export default AddItem
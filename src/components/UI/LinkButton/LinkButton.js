import React from 'react'
import { Link } from 'react-router-dom'
import classes from './LinkButton.module.scss'

const LinkButton = ({link, classType, title = '', text}) => (
  <Link 
    to={link}
    className={`${classes.link} ${classes[classType]}`}
    title={title}
  >
    {text}
  </Link> 
)

export default LinkButton
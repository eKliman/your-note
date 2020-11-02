import React from 'react'
import classes from './Backdrop.module.scss'

const Backdrop = ({clickHandler}) => (
  <div 
    className={classes.backdrop}
    onClick={clickHandler}
  ></div>
)

export default Backdrop
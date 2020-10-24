import React from 'react'
import Backdrop from '../Backdrop/Backdrop'
import Button from '../Button/Button'
import classes from './Confirmation.module.scss'

const Confirmation = ({message, buttonType1, buttonText1, buttonType2, buttonText2}) => {
  return (
    <>
      <div className={classes.modal}>
        <div className={classes.header}>
          <h3>Confirmation</h3>
          <span class="icon-alert"></span>
        </div>

        <div className={classes.body}>
          <span>{message}</span>
          <div className={classes.buttons}>
            <Button
              text={buttonText1}
              type={buttonType1}
              title={buttonText1}
            ></Button>
            <Button
              text={buttonText2}
              type={buttonType2}
              title={buttonText2}
            ></Button>
          </div>
        </div>
      </div>

      <Backdrop />
    </>
  )
}

export default Confirmation
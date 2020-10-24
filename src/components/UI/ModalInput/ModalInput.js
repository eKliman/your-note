import React from 'react'
import Backdrop from '../Backdrop/Backdrop'
import Button from '../Button/Button'
import Input from '../Input/Input'
import classes from './ModalInput.module.scss'

const ModalInput = () => {
  return (
    <>
      <div className={classes.modal}>
        <Input 
          label='Enter your note text:'
        />
        <div className={classes.buttons}>
          <Button
            text='Save'
            type='success'
            title='Save'
          ></Button>
          <Button
            text='Cancel'
            type='danger'
            title='Cancel'
          ></Button>
        </div>
      </div>

      <Backdrop />
    </>
  )
}

export default ModalInput
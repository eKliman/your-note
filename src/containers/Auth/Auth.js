import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import { validateControl } from '../../utils/utils'
import { 
  auth, 
  changeAuthFormControls, 
  setAuthError, 
  setInitialFormControls, 
  setIsFormValid 
} from '../../store/actions/auth'
import classes from './Auth.module.scss'
import { withRouter } from 'react-router-dom'
import { setLoading } from '../../store/actions/app'
import Loader from '../../components/UI/Loader/Loader'

const Auth = () => {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.app.loading)
  const authState = useSelector(state => state.auth)
  const formControls = {...authState.formControls}

  useEffect(() => {
    return () => {
      dispatch(setInitialFormControls())
      dispatch(setIsFormValid(false))
      dispatch(setAuthError(''))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const changeHandler = (event, inputName, isBlur = false) => {
    const control = {...formControls[inputName]}
    let isFormValid = true

    control.value = event.target.value

    if (isBlur) {
      control.touched = true
    }
    
    control.valid = validateControl(control.value, control.validation)

    formControls[inputName] = control
    
    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })
    
    dispatch(changeAuthFormControls(formControls))
    dispatch(setIsFormValid(isFormValid))
  }

  const authHandler = async val => {
    dispatch(setIsFormValid(false))
    dispatch(setLoading(true))
    dispatch(setAuthError(''))
    await dispatch(auth(
      formControls.email.value,
      formControls.password.value,
      val
    )) 
    dispatch(setLoading(false))
    dispatch(setInitialFormControls())
  } 

  const renderInputs = () => {
    return Object.keys(formControls).map((inputName, index) => {
      const control = formControls[inputName]
      return (
        <Input 
          key={index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          changeHandler={event => changeHandler(event, inputName)}
          blurHandler={event => changeHandler(event, inputName, true)}
        />
      )
    })
  }

  return (
    <main>
      <div className='container'>
        <div className={classes.auth}>
          <h2>Authorization</h2>
          {loading ? <Loader /> : renderInputs()}
          {authState.error ? <span className={classes.error}>{authState.error}</span> : null}
          <div className={classes.buttons}>
            <Button 
              text='Login'
              classType='success'
              title='Login'
              disabled={!authState.isFormValid}
              clickHandler={() => authHandler(true)}
            />
            <Button 
              text='Sign up'
              classType='primary'
              title='Sign up'
              disabled={!authState.isFormValid}
              clickHandler={() => authHandler(false)}
            />
          </div>
        </div>
      </div>
    </main>
  )
}

export default withRouter(Auth)
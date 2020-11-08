import { sendRequest } from "../../utils/fetch"
import { 
  CHANGE_AUTH_FORM_CONTROLS, 
  SET_IS_FORM_VALID,
  SET_AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  SET_INITIAL_FORM_CONTROLS
} from "./actionTypes"

export const setInitialFormControls = () => {
  return {
    type: SET_INITIAL_FORM_CONTROLS
  }
}

export const changeAuthFormControls = payload => {
  return {
    type: CHANGE_AUTH_FORM_CONTROLS,
    payload
  }
}

export const setIsFormValid = payload => {
  return {
    type: SET_IS_FORM_VALID,
    payload
  }
}

export const setAuthError = payload => {
  return {
    type: SET_AUTH_ERROR,
    payload
  }
}

export const authSuccess = (token, userId) => {
  return {
    type: AUTH_SUCCESS,
    token,
    userId
  }
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')
  return {
    type: AUTH_LOGOUT
  }
}

export function autoLogout(time) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, time * 1000)
  }
}

export const auth = (email, password, isLogin) => { 
  return async dispatch => {
    const REACT_APP_KEY = process.env.REACT_APP_KEY
    
    const authData = {
      email, password,
      returnSecureToken: true
    }

    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${REACT_APP_KEY}`

    if (isLogin) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${REACT_APP_KEY}`
    }

    try {
      const data = await sendRequest('POST', url, authData, false)
      if (data.error) {
        dispatch(setAuthError(data.error.message))
      } else {
        dispatch(setIsFormValid(true))
        
        const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)
    
        localStorage.setItem('token', data.idToken)
        localStorage.setItem('userId', data.localId)
        localStorage.setItem('expirationDate', expirationDate)
    
        dispatch(authSuccess(data.idToken, data.localId))
        dispatch(autoLogout(data.expiresIn))
        dispatch(setAuthError(''))
      }
    } catch {
      dispatch(setAuthError('An error has occurred. Please reload the page.'))
    }
  }
}

export const autoLogin = () => {
  return dispatch => {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')

    if (!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate <= new Date()) {
        dispatch(logout())
      } else {
        dispatch(authSuccess(token, userId))
        dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
      }
    }
  }
}
import { 
  CHANGE_AUTH_FORM_CONTROLS, 
  SET_IS_FORM_VALID,
  SET_AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  SET_INITIAL_FORM_CONTROLS
} from "../actions/actionTypes"

const createFormControls = () => {
  return {
    email: {
      value: '',
      type: 'email',
      label: 'Email',
      errorMessage: 'Enter correct email',
      valid: false,
      touched: false,
      validation: {
        required: true,
        email: true
      }
    },
    password: {
      value: '',
      type: 'password',
      label: 'Password',
      errorMessage: 'Password must be at least 6 characters',
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 6
      }
    }
  }
}

const initialState = {
  token: null,
  userId: null,
  isFormValid: false,
  error: '',
  formControls: createFormControls(),
}

const handlers = {
  [CHANGE_AUTH_FORM_CONTROLS]: (state, action) => ({...state, formControls: action.payload}),
  [SET_IS_FORM_VALID]: (state, action) => ({...state, isFormValid: action.payload}),
  [SET_AUTH_ERROR]: (state, action) => ({...state, error: action.payload}),
  [AUTH_LOGOUT]: state => ({...state, token: null, userId: null}),
  [SET_INITIAL_FORM_CONTROLS]: state => ({...state, formControls: createFormControls()}),
  [AUTH_SUCCESS]: (state, action) => ({
    ...state, 
    token: action.token, 
    userId: action.userId, 
    formControls: createFormControls()
  }),
  DEFAULT: state => state
}

const authReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}

export default authReducer
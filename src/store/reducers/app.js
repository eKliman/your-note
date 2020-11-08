import { SET_THEME, SET_LOADING, SET_ALERT } from "../actions/actionTypes"

const initialState = {
  darkTheme: false,
  loading: false,
  alertText: ''
}

const handlers = {
  [SET_THEME]: (state, action) => ({...state, darkTheme: action.payload}),
  [SET_LOADING]: (state, action) => ({...state, loading: action.payload}),
  [SET_ALERT]: (state, action) => ({...state, alertText: action.payload}),
  DEFAULT: state => state
}

const appReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}

export default appReducer
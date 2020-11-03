import { SET_THEME } from "../actions/actionTypes"

const initialState = {
  darkTheme: false
}

const handlers = {
  [SET_THEME]: (state, action) => ({...state, darkTheme: action.payload}),
  DEFAULT: state => state
}

const appReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}

export default appReducer
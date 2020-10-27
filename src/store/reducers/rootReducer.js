import { combineReducers } from 'redux'
import appReducer from './app'
import noteReducer from './note'

export default combineReducers({
  app: appReducer,
  note: noteReducer
})
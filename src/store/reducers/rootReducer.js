import { combineReducers } from 'redux'
import appReducer from './app'
import authReducer from './auth'
import noteReducer from './note'
import noteListReducer from './noteList'

export default combineReducers({
  app: appReducer,
  auth: authReducer,
  noteList: noteListReducer,
  note: noteReducer
})
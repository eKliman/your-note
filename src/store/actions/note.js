import { 
  SET_NOTE_TITLE, 
  SET_IS_TITLE_EDITING, 
  SET_ID_EDITING_TODO, 
  ADD_NOTE, 
  CHANGE_TODOS,
  CHANGE_PREVIOUS_STATE
} from './actionTypes'

export const setNoteTitle = payload => (
  {
    type: SET_NOTE_TITLE,
    payload
  }
)

export const changePrevState = payload => (
  {
    type: CHANGE_PREVIOUS_STATE,
    payload
  }
)

export const changetodos = payload => (
  {
    type: CHANGE_TODOS,
    payload
  }
)

export const setIsTitleEditing = payload => (
  {
    type: SET_IS_TITLE_EDITING,
    payload
  }
)

export const setIdEditingTodo = payload => (
  {
    type: SET_ID_EDITING_TODO,
    payload
  }
)

export const addNote = payload => (
  {
    type: ADD_NOTE,
    payload
  }
)
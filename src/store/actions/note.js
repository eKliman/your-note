import { 
  SET_NOTE_TITLE, 
  SET_IS_TITLE_EDITING, 
  SET_ID_EDITING_TODO, 
  SET_INITIAL_STATE, 
  SET_TODOS,
  SET_PREV_TITLE,
  SET_PREV_TODOS,
  SET_IS_TOUCHED,
  SET_SORTING
} from './actionTypes'

export const setNoteTitle = payload => (
  {
    type: SET_NOTE_TITLE,
    payload
  }
)

export const setPrevTitle = payload => (
  {
    type: SET_PREV_TITLE,
    payload
  }
)

export const setPrevTodos = payload => (
  {
    type: SET_PREV_TODOS,
    payload
  }
)

export const setTodos = payload => (
  {
    type: SET_TODOS,
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

export const setIsTouched = payload => (
  {
    type: SET_IS_TOUCHED,
    payload
  }
)

export const setSorting = payload => (
  {
    type: SET_SORTING,
    payload
  }
)

export const setInitialState = () => (
  {
    type: SET_INITIAL_STATE
  }
)
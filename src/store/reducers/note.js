import { 
  SET_NOTE_TITLE, 
  SET_IS_TITLE_EDITING, 
  SET_ID_EDITING_TODO, 
  ADD_NOTE, 
  CHANGE_TODOS,
  CHANGE_PREVIOUS_STATE
} from '../actions/actionTypes'

const initialState = {
  title: '',
  todos: {},
  isTitleEditing: true,
  idEditingTodo: '',
  prevState: {
    title: '',
    undoTitleBtn: false,
    redoTitleBtn: false,
    todos: {}
  }
}
  
const handlers = {
  [SET_NOTE_TITLE]: (state, action) => ({...state, title: action.payload}),
  [CHANGE_PREVIOUS_STATE]: (state, action) => ({...state, prevState: action.payload}),
  [CHANGE_TODOS]: (state, action) => ({...state, todos: action.payload}),
  [SET_IS_TITLE_EDITING]: (state, action) => ({...state, isTitleEditing: action.payload}),
  [SET_ID_EDITING_TODO]: (state, action) => ({...state, idEditingTodo: action.payload}),
  
  [ADD_NOTE]: (state, action) => ({...state}),
  DEFAULT: state => state
}

const noteReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}

export default noteReducer
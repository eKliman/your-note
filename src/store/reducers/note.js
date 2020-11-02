import { 
  SET_NOTE_TITLE, 
  SET_IS_TITLE_EDITING, 
  SET_ID_EDITING_TODO, 
  SET_INITIAL_STATE, 
  SET_TODOS,
  SET_PREV_TITLE,
  SET_PREV_TODOS,
  SET_IS_TOUCHED
} from '../actions/actionTypes'

const initialState = {
  title: '',
  todos: {},
  isTitleEditing: false,
  idEditingTodo: '',
  isTouched: false,
  prevTitle: {
    itle: '',
    undoTitleBtn: false,
    redoTitleBtn: false,
  },
  prevTodos: {}
}
  
const handlers = {
  [SET_NOTE_TITLE]: (state, action) => ({...state, title: action.payload}),
  [SET_PREV_TITLE]: (state, action) => ({...state, prevTitle: action.payload}),
  [SET_PREV_TODOS]: (state, action) => ({...state, prevTodos: action.payload}),
  [SET_TODOS]: (state, action) => ({...state, todos: action.payload}),
  [SET_IS_TITLE_EDITING]: (state, action) => ({...state, isTitleEditing: action.payload}),
  [SET_ID_EDITING_TODO]: (state, action) => ({...state, idEditingTodo: action.payload}),
  [SET_IS_TOUCHED]: (state, action) => ({...state, isTouched: action.payload}),
  [SET_INITIAL_STATE]: () => (initialState),
  DEFAULT: state => state
}

const noteReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}

export default noteReducer
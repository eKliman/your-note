import { 
  SET_NOTES, 
  SET_NOTE_ID_TO_DELETE, 
  SET_UNDO_NOTE_ID,
  SET_SORTING_NOTELIST 
} from '../actions/actionTypes'

const initialState = {
  notes: {},
  deletionId: '',
  undoId: '',
  sorting: 'Newest'
}

const handlers = {
  [SET_NOTES]: (state, action) => ({...state, notes: action.payload}),
  [SET_NOTE_ID_TO_DELETE]: (state, action) => ({...state, deletionId: action.payload}),
  [SET_UNDO_NOTE_ID]: (state, action) => ({...state, undoId: action.payload}),
  [SET_SORTING_NOTELIST]: (state, action) => ({...state, sorting: action.payload}),
  DEFAULT: state => state
}

const noteListReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}

export default noteListReducer
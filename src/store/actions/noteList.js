import { 
  SET_NOTES,
  SET_NOTE_ID_TO_DELETE,
  SET_UNDO_NOTE_ID
} from './actionTypes'

export const setNotes = payload => (
  {
    type: SET_NOTES,
    payload
  }
)

export const getNotesFromStorage = () => {
  const notes = JSON.parse(localStorage.getItem('notes')) || {}
  return dispatch => {
    dispatch(setNotes(notes))
  }
}

export const saveNotesToStorage = payload => {
  localStorage.setItem('notes', JSON.stringify(payload))
  return dispatch => {
    dispatch(getNotesFromStorage())
  }
}

export const setNoteIdToDelete = payload => (
  {
    type: SET_NOTE_ID_TO_DELETE,
    payload
  }
)

export const deleteFromStorage = payload => {
  return (dispatch, getState) => {
    const notes = {...getState().noteList.notes}
    delete notes[payload]
    dispatch(saveNotesToStorage(notes))
    dispatch(setNoteIdToDelete(''))
  }
}

export const setUndoNoteId = payload => (
  {
    type: SET_UNDO_NOTE_ID,
    payload
  }
)

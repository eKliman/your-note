import { 
  SET_NOTES,
  SET_NOTE_ID_TO_DELETE,
  SET_UNDO_NOTE_ID,
  SET_SORTING_NOTELIST
} from './actionTypes'
import { sendRequest } from '../../utils/fetch'
import { setAlert, setLoading } from './app'
import { setIsTitleEditing, setNoteTitle, setTodos } from './note'

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

export const setSortingNoteList = payload => (
  {
    type: SET_SORTING_NOTELIST,
    payload
  }
)

export const getNotesFromServer = () => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true))
    const link = `notes/${getState().auth.userId}.json`
    try {
      const response = await sendRequest('GET', link) || {}
      if (response.error) {
        dispatch(setAlert(`${response.error}. Please reload the page and try again.`))
        setTimeout(() => dispatch(setAlert('')), 7000)
        return 
      }
      Object.keys(response).forEach(key => {
        if (!response[key].todos) {
          response[key].todos = {}
        }
      })
      dispatch(setNotes(response))
    } catch (e) {
      dispatch(setAlert(`${e}. Please reload the page and try again.`))
      setTimeout(() => dispatch(setAlert('')), 7000)
    } finally {
      dispatch(setLoading(false))
    }
  } 
}

export const getNoteFromServerById = id => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true))
    try {
      const response = await sendRequest('GET', `notes/${getState().auth.userId}/${id}.json`)

      if (response.error) {
        dispatch(setAlert(`${response.error}. Please reload the page and try again.`))
        setTimeout(() => dispatch(setAlert('')), 7000)
        return 
      }
      dispatch(setNoteTitle(response.title))
      dispatch(setTodos(response.todos || {}))
      dispatch(setIsTitleEditing(false))
    } catch (e) {
      dispatch(setAlert(`${e}. Please reload the page and try again.`))
      setTimeout(() => dispatch(setAlert('')), 7000)
    } finally {
      dispatch(setLoading(false))
    }
  }
}

import { SET_THEME, SET_LOADING, SET_ALERT } from "./actionTypes";

export const setTheme = payload => (
  {
    type: SET_THEME,
    payload
  }
)

export const setLoading = payload => (
  {
    type: SET_LOADING,
    payload
  }
)

export const setAlert = payload => (
  {
    type: SET_ALERT,
    payload
  }
)

export const setThemeToStorage = payload => {
  localStorage.setItem('darkTheme', JSON.stringify(payload))
  return dispatch => {
    dispatch(setTheme(payload))
  }
}

export const getThemeFromStorage = () => {
  const darkTheme = JSON.parse(localStorage.getItem('darkTheme')) || false
  return dispatch => {
    dispatch(setTheme(darkTheme))
  }
}
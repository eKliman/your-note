const initialState = {
  titleControls: createTitleControls()
}

const handlers = {
  DEFAULT: state => state
}

const noteReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}

function createTitleControls() {
  return {
    value: '',
    touched: false,
    placeholder: 'Enter a title of the note'
  }
}


export default noteReducer
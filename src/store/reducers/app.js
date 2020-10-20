const initialState = {
  test: {}
}

const handlers = {
  DEFAULT: state => state
}

const appReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}

export default appReducer

const ACTION_HANDLERS = {
  ['TEST']: (state, action) => {
    return state
  }
}

const STATE = {

}


export default (state = STATE, action) => {
  const reducer = ACTION_HANDLERS[action.type]

  return reducer ? reducer(state, action) : state
}
export function Authorize(state, payload) {
  let temp_state = { ...payload }
  temp_state.authorized = true
  temp_state.login_time = new Date()
  return temp_state
}

export function ClearPermission(initialState) {
  return initialState
}

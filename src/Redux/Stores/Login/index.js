/* eslint-disable default-param-last */
import * as actions from './actions'

const initialState = {
  id: '',
  username: '',
  password: '',
  first_name: '',
  last_name: '',
  permission: '',
  authorized: false,
  login_time:'',
}

export default function LoginReducer(state = initialState, { type, payload }) {
  switch (type) {
    case 'AUTH':
      return actions.Authorize(state, payload)

    case 'REMOVE_AUTH':
      return actions.ClearPermission(initialState)

    default:
      return state
  }
}

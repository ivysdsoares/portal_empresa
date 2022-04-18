import * as actions from './actions'

const initialState = {
  list: [],
}

export default function WizardReducer(state = initialState, { type, payload }) {
  switch (type) {
    case 'PERMISSAOLIST':
      return actions.PermissoesList(state, payload)

    case 'REMOVELIST':
      return actions.ClearList(initialState)

    default:
      return state
  }
}

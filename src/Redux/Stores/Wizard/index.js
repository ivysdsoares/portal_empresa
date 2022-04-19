/* eslint-disable default-param-last */
import * as actions from './actions'

const initialState = {
  employees_list: [],
  payment_schedule: '',
  step: 0,
  employees_reference: [],
}

export default function WizardReducer(state = initialState, { type, payload }) {
  switch (type) {
    case 'SET_REFERENCE':
      return actions.SetReference(state, payload)
    case 'FILL_LIST':
      return actions.FillList(state, payload)

    case 'EDIT_VALUES':
      return actions.EditValues(state, payload)

    case 'SET_DATE':
      return actions.SetDate(state, payload)

    case 'RESET_WIZARD':
      return initialState
    default:
      return state
  }
}

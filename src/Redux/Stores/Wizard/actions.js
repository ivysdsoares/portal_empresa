export function SetReference(state, payload) {
  let temp_state = { ...state }
  temp_state.employees_reference = payload
  return temp_state
}

export function FillList(state, payload) {
  let temp_state = { ...state }
  let asArray = payload.map((item) => item.id)
  temp_state.employees_list = temp_state.employees_reference.filter((i) =>
    asArray.includes(i.id)
  )
  temp_state.step = 1
  return temp_state
}

export function EditValues(state, payload) {
  let temp_state = { ...state }

  temp_state.employees_list = payload
  temp_state.step = 2

  return temp_state
}

export function SetDate(state, payload) {
  let temp_state = { ...state }
  temp_state.payment_schedule = payload
  temp_state.step = 3
  return temp_state
}

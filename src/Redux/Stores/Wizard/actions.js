export function PermissoesList(state, payload) {
  let temp_state = { ...state }
  let insert = true

  temp_state.list.forEach((item) => {
    if (item.id_acao === payload.id_acao) {
      insert = false
    }
  })

  if (insert) {
    temp_state.list = [...temp_state.list, payload]
  } else {
    temp_state.list = temp_state.list.filter((item) => {
      if (item.id_acao === payload.id_acao) {
        return false
      }
      return true
    })
  }

  return temp_state
}

export function ClearList(initialState) {
  return initialState
}

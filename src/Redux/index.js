import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'
import { encryptTransform } from 'redux-persist-transform-encrypt'
import WizardReducer from './Stores/Wizard'
import LoginReducer from './Stores/Login'

const persistConfig = {
  key: 'root',
  storage,
  transforms: [
    encryptTransform({
      secretKey: 'senha12345678',
      onError(error) {
        console.log(
          '----------------ERRO NA ENCRYPTOGRAFIA-------------------',
          error
        )
      },
    }),
  ],
  blacklist: [],
}

const reducers = combineReducers({
  login_manager: LoginReducer,
  wizard_manager:WizardReducer
})

const persistedReducer = persistReducer(persistConfig, reducers)
const store = createStore(persistedReducer)
const persistor = persistStore(store)

export default function Store({ children }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        {children}
      </PersistGate>
    </Provider>
  )
}

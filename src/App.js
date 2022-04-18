import MuiTheme from 'Mui/Theme'
import Router from './Routes'
import Store from './Redux'

export default function App() {
  return (
    <Store>
      <MuiTheme>
        <Router />
      </MuiTheme>
    </Store>
  )
}

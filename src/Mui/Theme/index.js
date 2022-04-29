import { createTheme } from '@mui/material/styles'
import * as colors from '@mui/material/colors'
import ThemeProvider from '@mui/material/styles/ThemeProvider'

const theme = createTheme({
  palette: {
    background: {
      dark: '#f0f0f0',
      darker: '#e1e1e1',
    },
    primary: colors.blueGrey,
    secondary: colors.lime,
    info: colors.lightBlue,
    warning: colors.amber,
    error: colors.red,
    success: colors.green,
  },
  typography: {
    fontFamily: ['"Fira Sans"'].join(','),
  },
})

export default function MuiTheme({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

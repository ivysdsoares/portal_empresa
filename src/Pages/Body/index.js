import { Outlet } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import stars from './stars.svg'

const CustomBody = styled(
  'div',
  {}
)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  alignItems: 'stretch',
  minWidth: '100vw',
  maxWidth: '100vw',
  minHeight: '100vh',
  maxHeight: '100vh',
  overflow: 'auto',
  padding: '0px',
  backgroundImage: `url(${stars})`,
  backgroundRepeat: 'repeat',
  boxShadow: 'inset 0px 0px 200px 0px rgba(0,0,0,0.2)',
  [theme.breakpoints.down('sm')]: {
    boxShadow: 'inset 0px 0px 100px 0px rgba(0,0,0,0.2)',
  },
}))

export default function Body() {
  return (
    <CustomBody>
      <Outlet />
    </CustomBody>
  )
}

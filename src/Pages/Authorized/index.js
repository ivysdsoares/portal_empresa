import FlexBox from 'Mui/FlexBox'
import ResponsiveAppBar from 'Pages/Authorized/appbar'
import { Outlet } from 'react-router-dom'

export default function Authorized() {
  return (
    <FlexBox direction="column" justify="start" align="stretch">
      <ResponsiveAppBar />
      <Outlet />
    </FlexBox>
  )
}

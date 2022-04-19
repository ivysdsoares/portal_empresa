import FlexBox from 'Mui/FlexBox'
import { useSelector } from 'react-redux'
import {
  Stack,
  Typography,
  Alert,
  Divider,
  Button,

} from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { useNavigate } from 'react-router-dom'

export default function Receipt() {
  const wizard = useSelector((state) => state.wizard_manager)
  const go = useNavigate()
  function getValue() {
    let total = 0
    wizard.employees_list.forEach((item) => {
      total += parseFloat(item.salary)
    })
    return total.toFixed(2).toString().replaceAll('.', ',')
  }
  return (
    <FlexBox>

      <Stack
        gap={4}
        padding={3}
        sx={(theme) => ({
          background: theme.palette.background.default,
          boxShadow: theme.shadows[2],
          borderRadius: '4px',
        })}
      >
        <Alert severity="info">Você irá realizar um pagamento de:</Alert>

        <FlexBox direction="row" justify="center">
          <Typography
            variant="h4"
            sx={(theme) => ({ fontWeight: theme.typography.fontWeightBold })}
          >
            R$
          </Typography>
          <Typography
            variant="h4"
            sx={(theme) => ({ color: theme.palette.text.secondary })}
          >
            {`\xa0\xa0${getValue(wizard)}`}
          </Typography>
        </FlexBox>

        <Divider flexItem direction="horizontal" />
        <FlexBox direction="row" justify="center" align="center">
          <CalendarMonthIcon sx={{ fontSize: '40px' }} />

          <Typography
            sx={(theme) => ({ color: theme.palette.text.secondary })}
            variant="h4"
          >
            {' '}
            {`\xa0\xa0${new Date(wizard.payment_schedule).toLocaleDateString(
              'pt-br'
            )}`}
          </Typography>
        </FlexBox>
        <Button onClick={()=>{setTimeout(()=>{go('/authorized')},1000)}} size="large" variant="contained" color="primary">
          Confirmar
        </Button>
      </Stack>
    </FlexBox>
  )
}

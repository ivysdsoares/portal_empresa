import FlexBox from 'Mui/FlexBox'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import { Typography, Paper } from '@mui/material'

export default function NotFound() {
  return (
    <FlexBox sx={{ alignItems: 'center', justifyContent: 'center', padding:'5px' }}>
      <Paper
        sx={{
          display: 'flex',
          border: (theme) => `4px solid ${theme.palette.background.dark}`,
          borderLeft: (theme) => `10px solid ${theme.palette.info.dark}`,
          padding: '20px',

          justifyContent: 'center',
          alignItems: 'center',
          flex: '0 0 auto',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Typography
          sx={{
            fontSize: (theme) => theme.typography.h1.fontSize,
            color: (theme) => theme.palette.info.main,
            
          }}
        >
          404
        </Typography>
        <Typography
          sx={(theme) => ({
            mx: '10px',
            textAlign: 'center',
            fontSize: {
              xs: theme.typography.h4.fontSize,
              sm: theme.typography.h2.fontSize,
            },
          })}
        >
          {' '}
          Não Encontrada
        </Typography>
      </Paper>
    </FlexBox>
  )
}

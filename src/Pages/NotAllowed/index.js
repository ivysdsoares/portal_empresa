import FlexBox from 'Mui/FlexBox'
import BlockIcon from '@mui/icons-material/Block'
import { Typography, Paper } from '@mui/material'

export default function NotAllowed() {
  return (
    <FlexBox sx={{ alignItems: 'center', justifyContent: 'center', padding:'5px' }}>
      <Paper
        sx={{
          display: 'flex',
          border: (theme) => `4px solid ${theme.palette.background.dark}`,
          borderLeft: (theme) => `10px solid ${theme.palette.error.dark}`,
          padding: '20px',
          justifyContent: 'center',
          alignItems: 'center',
          flex: '0 0 auto',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <BlockIcon
          sx={{
            fontSize: (theme) => theme.typography.h1.fontSize,
            color: (theme) => theme.palette.error.main,
          }}
        />

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
          Sem permissão
        </Typography>
      </Paper>
    </FlexBox>
  )
}

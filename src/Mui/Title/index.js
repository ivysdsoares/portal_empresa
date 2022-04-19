import { Typography } from '@mui/material'
import FlexBox from 'Mui/FlexBox'

export default function Title({ children, title }) {
  return (
    <FlexBox sx={{ padding: { xs: '10px', sm: '20px 30px' } }}>
      <FlexBox sx={(theme) => ({ boxShadow: theme.shadows[3] })}>
        <Typography
          variant="h4"
          px={(theme) => ({
            fontFamily: 'Fira Sans',
            fontWeight: theme.typography.fontWeightMedium,
            background: theme.palette.primary.light,
            borderTopLeftRadius: theme.shape.borderRadius,
            borderTopRightRadius: theme.shape.borderRadius,
            color: theme.palette.primary.contrastText,
            padding: '5px 20px',
          })}
        >
          {title}
        </Typography>
        <FlexBox
          padding="20px"
          sx={(theme) => ({
            borderRadius: theme.shape.borderRadius,
            borderTopLeftRadius: '0px',
            borderTopRightRadius: '0px',
            background: ` linear-gradient(140deg,
            ${theme.palette.background.darker} 0%,
            ${theme.palette.background.dark} 20%,
            ${theme.palette.background.dark} 70%,
            ${theme.palette.background.darker} 100%)`,
          })}
        >
          {children}
        </FlexBox>
      </FlexBox>
    </FlexBox>
  )
}

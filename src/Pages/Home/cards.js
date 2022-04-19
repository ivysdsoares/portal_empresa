import React, { useState } from 'react'
import FlexBox from 'Mui/FlexBox'
import { Typography, Stack, Divider, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

export function ShowHideCard({ value, label }) {
  const [show, setShow] = useState(false)
  return (
    <FlexBox
      padding="10px 20px"
      sx={(theme) => ({
        background: theme.palette.background.dark,
        borderRadius: `${theme.shape.borderRadius}px`,
        boxShadow: theme.shadows[2],
      })}
    >
      <Typography
        variant="caption"
        sx={(theme) => ({
          color: theme.palette.text.secondary,
          fontWeight: theme.typography.fontWeightMedium,
        })}
      >
        {label}
      </Typography>
      <FlexBox direction="row" justify="start" align="center">
        <Typography
          variant="subtitle1"
          fontSize="1.2rem"
          lineHeight="1.1rem"
          fontWeight="500"
        >
          R$
        </Typography>
        <Typography
          fontSize="1.2rem"
          lineHeight="1.1rem"
          variant="subtitle1"
          sx={{
            px: '10px',
            flex: '1 1 auto ',
            textAlign: 'start',
            fontWeight: 700,
          }}
        >
          {show
            ? parseFloat(value).toFixed(2).toString().replaceAll('.', ',')
            : '*******'}
        </Typography>

        <IconButton onClick={() => setShow(!show)}>
          {show ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </FlexBox>
    </FlexBox>
  )
}
export function MenuCard({ icon, label, children }) {
  return (
    <FlexBox
      sx={(theme) => ({
        borderRadius: `${theme.shape.borderRadius}px`,
        boxShadow: theme.shadows[1],
        background: theme.palette.background.default,
        margin: '5px',
        flex: '1 1 0',
        minWidth: { xs: '250px', sm: '350px' },
      })}
    >
      <Stack
        gap={2}
        padding={2}
        divider={<Divider orientation="horizontal" flexItem />}
      >
        <FlexBox direction="row" align="center">
          {React.createElement(icon, {
            sx: (theme) => ({
              color: theme.palette.primary.light,
              fontSize: '1.5rem',
              mr: 2,
            }),
          })}

          <Typography
            sx={(theme) => ({
              fontSize: '1.25rem',
              fontWeight: '500',
              color: theme.palette.primary.main,
            })}
          >
            {' '}
            {label}
          </Typography>
        </FlexBox>
        {children}
      </Stack>
    </FlexBox>
  )
}

import { useEffect, useState } from 'react'
import FlexBox from 'Mui/FlexBox'
import { CircularProgress, Typography, Backdrop } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

export default function Loader({ state, children }) {
  const [current, setCurrent] = useState(state)
  useEffect(() => {
    setTimeout(() => {
      setCurrent(state)
    }, 1000)
  }, [state])

  switch (current) {
    case 'LOADING':
      return (
        <FlexBox
          direction="row"
          align="center"
          justify="center"
          flex="1 1 auto"
          sx={{ width: '100%', height: '100%' }}
        >
          <Backdrop
            sx={{
              zIndex: (theme) => theme.zIndex.appBar-1,

            }}
            open
            onClick={() => {}}
          >
            <FlexBox
              direction="column"
              justify="center "
              align="center"
              padding="30px 10px"
              flex="0 0 0"
              sx={(theme) => ({
                borderRadius: '10px',
                border: `4px solid ${theme.palette.background.dark}`,
                background: theme.palette.background.default,
                boxShadow: theme.shadows[2],
                minWidth: '250px',
              })}
            >
              <CircularProgress color="secondary" size={90} />
              <Typography sx={{ pt: '15px' }} variant="h6">
                CARREGANDO
              </Typography>
              <Typography variant="body1">Seja Paciente</Typography>
            </FlexBox>
          </Backdrop>
        </FlexBox>
      )
    case 'ERROR':
      return (
        <FlexBox
          direction="row"
          align="center"
          justify="center"
          flex="1 1 auto"
          sx={{ width: '100%', height: '100%' }}
        >
          <Backdrop
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open
            onClick={() => {}}
          >
            <FlexBox
              justify="center "
              align="center"
              padding="30px 10px"
              flex="0 0 0"
              sx={(theme) => ({
                borderRadius: '10px',
                border: `4px solid ${theme.palette.error.dark}`,
                background: theme.palette.background.default,
                boxShadow: theme.shadows[2],
                minWidth: '250px',
              })}
            >
              <ErrorOutlineIcon
                sx={(theme) => ({
                  fontSize: '120px',
                  color: theme.palette.error.main,
                })}
              />
              <Typography sx={{ pt: '15px' }} variant="h6">
                ERRO INTERNO
              </Typography>
              <Typography variant="body1">
                TENTE NOVAMENTE MAIS TARDE
              </Typography>
            </FlexBox>
          </Backdrop>
        </FlexBox>
      )
    default:
      return children
  }
}

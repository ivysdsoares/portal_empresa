import { useState } from 'react'
import FlexBox from 'Mui/FlexBox'
import { styled } from '@mui/system'
import CorporateFare from '@mui/icons-material/Business'
import { Form, Field } from 'react-final-form'
import { ValidateForm, yup } from 'Functions/Yup'
import { Stack, TextField, Button, Typography, Alert } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import fakeApi from 'Services/fakeapi'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import ForgotPassword from './forgotPassword'

const CustomDiv = styled(
  'div',
  {}
)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  flexWrap: 'wrap',
  alignItems: 'stretch',
  flex: '1 1 auto',
  minWidth: '300px',
  maxWidth: '500px',
}))

const CustomPaper = styled(
  'div',
  {}
)(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'stretch',
  padding: '20px 0px 30px',
  borderRadius: `${theme.shape.borderRadius}px`,
  boxShadow: theme.shadows[3],
  background: theme.palette.background.default,
}))
const ForegroundPaper = styled(
  'div',
  {}
)(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'stretch',
  ':before': {
    transitionDuration: '200ms',
    position: 'absolute',
    content: '""',
    width: '100%',
    height: '100%',
    boxShadow: theme.shadows[3],
    background: ` linear-gradient(150deg,
       ${theme.palette.primary.dark} 0%,
       ${theme.palette.primary.main} 15%,
       ${theme.palette.primary.main} 30%,
       ${theme.palette.primary.light} 50%,
       ${theme.palette.primary.main} 70%,
       ${theme.palette.primary.main} 85%,
       ${theme.palette.primary.dark} 100%)`,
    borderRadius: `${theme.shape.borderRadius}px`,
    [theme.breakpoints.up('sm')]: {
      transform: 'translate(20px,-20px)',
    },
    [theme.breakpoints.down('sm')]: {
      transform: 'translate(0px,-20px)',
    },
  },
}))

const validationSchema = yup.object().shape({
  user: yup.string().min(5).max(30).required(),
  password: yup.string().min(8).max(16).required(),
})

export default function Login() {
  const [showModal, setModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({ status: 'NULL', msg: '' })
  const go = useNavigate()
  const dispatch = useDispatch()

  function onSubmit(e) {
    setLoading(true)
    fakeApi
      .get(`users/?username=${e.user}&password=${e.password}`)
      .then((res) => {
        if (res.data.length > 0) {
          let delay = setTimeout(() => {
            setError({ status: 'NULL', msg: '' })
            dispatch({ type: 'AUTH', payload: res.data[0] })
            go('/authorized')
          }, 1000)
        } else {
          let delay = setTimeout(() => {
            setLoading(false)
            setError({ status: 'ERROR', msg: 'Usuário ou Senha Incorreto' })
          }, 1000)
        }
      })
      .catch((err) => {
        let delay = setTimeout(() => {
          setLoading(false)
          setError({ status: 'ERROR', msg: 'Erro Interno' })
        }, 1000)
      })
  }

  return (
    <>
      <ForgotPassword show={showModal} setShow={() => setModal(false)} />
      <FlexBox direction="row" justify="center">
        <CustomDiv>
          <ForegroundPaper>
            <CustomPaper elevation={2}>
              <Form
                validate={ValidateForm(validationSchema)}
                onSubmit={onSubmit}
              >
                {(props) => (
                  <form onSubmit={props.handleSubmit}>
                    <Stack spacing={4} padding={3}>
                      <FlexBox direction="row" justify="start" align="center">
                        <CorporateFare
                          sx={(theme) => ({
                            fontSize: theme.typography.h3.fontSize,
                            color: theme.palette.primary.dark,
                          })}
                        />
                        <Typography
                          sx={(theme) => ({
                            flex: '1 1 auto',
                            textAlign: 'center',
                            fontWeight: theme.typography.fontWeightBold,
                            color: theme.palette.primary.main,
                            fontFamily: 'Fira Sans',
                          })}
                          variant="h3"
                        >
                          {' '}
                          PORTAL EMPRESA
                        </Typography>
                      </FlexBox>
                      <Typography variant="h6">
                        {`\xa0\xa0Bem Vindo,`}
                      </Typography>
                      <Field name="user">
                        {({ input, meta }) => (
                          <TextField
                            value={input.value}
                            onChange={input.onChange}
                            error={!!(meta.submitFailed && meta.error)}
                            helperText={meta.submitFailed && meta.error}
                            label="Usuario"
                          />
                        )}
                      </Field>
                      <Field name="password">
                        {({ input, meta }) => (
                          <TextField
                            value={input.value}
                            onChange={input.onChange}
                            error={!!(meta.submitFailed && meta.error)}
                            helperText={meta.submitFailed && meta.error}
                            label="Senha"
                            type="password"
                          />
                        )}
                      </Field>
                      <FlexBox>
                        <LoadingButton
                          type="submit"
                          color="secondary"
                          size="large"
                          loading={loading}
                          variant="contained"
                        >
                          Entrar
                        </LoadingButton>
                        <Button
                          type="button"
                          color="primary"
                          sizer="small"
                          variant="ghost"
                          onClick={() => setModal(true)}
                          sx={{ mt: '5px' }}
                        >
                          Esqueceu sua senha?
                        </Button>
                        {error.status === 'ERROR' && (
                          <Alert sx={{ mt: '5px' }} severity="error">
                            {error.msg}
                          </Alert>
                        )}
                      </FlexBox>
                    </Stack>
                  </form>
                )}
              </Form>
            </CustomPaper>
          </ForegroundPaper>
        </CustomDiv>
      </FlexBox>
    </>
  )
}

import {
  Dialog,
  Stack,
  TextField,
  Typography,
  IconButton,
  Alert,
  DialogContent,
} from '@mui/material'
import { Close } from '@mui/icons-material'
import LoadingButton from '@mui/lab/LoadingButton'
import { Form, Field } from 'react-final-form'
import { ValidateForm, yup } from 'Functions/Yup'
import { useState } from 'react'
import FlexBox from 'Mui/FlexBox'
import fakeApi from 'Services/fakeapi'

const validationSchema = yup.object().shape({
  user: yup.string().min(5).max(30).required(),
  password: yup.string().min(8).max(16).required(),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Senhas devem ser iguais')
    .required(),
})

export default function ForgotPassword({ show, setShow }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({ status: 'NULL', msg: '' })

  function onSubmit(e) {
    setLoading(true)
    const checkUsu = new Promise((resolve, reject) => {
      fakeApi
        .get(`users/?username=${e.user}`)
        .then((res) => {
          if (res.data.length > 0) {
            resolve(res.data[0])
          } else {
            let delay = setTimeout(() => {
              setLoading(false)
              setError({ status: 'ERROR', msg: 'Usuário Incorreto' })
            }, 1000)
            reject()
          }
        })
        .catch((err) => {
          let delay = setTimeout(() => {
            setLoading(false)
            setError({ status: 'ERROR', msg: 'Erro Interno' })
          }, 1000)
          reject()
        })
    })

    checkUsu
      .then((user) => {
        fakeApi
          .patch(`users/${user.id}`, { password: e.password })
          .then((res) => {
            let delay = setTimeout(() => {
              setLoading(false)
              setError({ status: 'SUCCESS', msg: 'Senha Alterada' })
            }, 1000)
            let closeOn = setTimeout(() => {
              setShow()
            }, 3000)
          })
          .catch((err) => {
            let delay = setTimeout(() => {
              setLoading(false)
              setError({ status: 'ERROR', msg: 'Senha Inválida' })
            }, 1000)
          })
      })
      .catch((err) => {})
  }
  return (
    <Dialog sx={{ p: '20px' }} open={show} onClose={setShow}>
      <FlexBox justify="end" direction="row">
        <IconButton onClick={setShow}>
          <Close />
        </IconButton>
      </FlexBox>
      <Stack>
        <Form validate={ValidateForm(validationSchema)} onSubmit={onSubmit}>
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <DialogContent sx={{ pt: '0px' }}>
                <Stack spacing={3}>
                  <FlexBox>
                    <Typography
                      sx={{ textAlign: 'left' }}
                      variant="h6"
                      component="h2"
                    >
                      Mudança de senha
                    </Typography>

                    <Typography variant="body2" sx={{ textAlign: 'left' }}>
                      Informe seu usuário e a nova senha para realizar a
                      alteração
                    </Typography>
                  </FlexBox>

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
                        label="Nova Senha"
                        type="password"
                      />
                    )}
                  </Field>
                  <Field name="confirm_password">
                    {({ input, meta }) => (
                      <TextField
                        value={input.value}
                        onChange={input.onChange}
                        error={!!(meta.submitFailed && meta.error)}
                        helperText={meta.submitFailed && meta.error}
                        label="Confirme Nova Senha"
                        type="password"
                      />
                    )}
                  </Field>
                  <FlexBox>
                    <LoadingButton
                      size="large"
                      type="submit"
                      loading={loading}
                      variant="contained"
                    >
                      Alterar Minha Senha
                    </LoadingButton>
                    {error.status === 'ERROR' && (
                      <Alert sx={{ mt: '5px' }} severity="error">
                        {error.msg}
                      </Alert>
                    )}
                    {error.status === 'SUCCESS' && (
                      <Alert sx={{ mt: '5px' }} severity="success">
                        {error.msg}
                      </Alert>
                    )}
                  </FlexBox>
                </Stack>
              </DialogContent>
            </form>
          )}
        </Form>
      </Stack>
    </Dialog>
  )
}

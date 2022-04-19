import { useEffect, useState } from 'react'
import FlexBox from 'Mui/FlexBox'
import { Paper, Stack, TextField, Button, Typography } from '@mui/material'
import Table from 'Mui/Table'
import { Form, Field } from 'react-final-form'
import SearchIcon from '@mui/icons-material/Search'
import Loader from 'Mui/Loader'
import fakeApi from 'Services/fakeapi'
import Title from 'Mui/Title'

const columns = [
  { id: 'full_name', label: 'NOME', minWidth: 100, align: 'center' },
  {
    id: 'cpf',
    label: 'CPF',
    minWidth: 100,
    align: 'center',
    format: (value) => {
      let cpf = `${value.substr(0, 2)}.${value.substr(2, 3)}.${value.substr(
        5,
        3
      )}.${value.substr(8, 1)}-${value.substr(9, 2)}`
      return cpf
    },
  },
  {
    id: 'salary',
    label: 'SALÁRIO',
    minWidth: 100,
    align: 'center',
    format: (value) => `R$ ${value.toFixed(2).toString().replaceAll('.', ',')}`,
  },

  {
    id: 'entrance_date',
    label: 'DATA DE ENTRADA',
    minWidth: 100,
    align: 'center',
    format: (value) => new Date(value).toLocaleDateString('pt-br'),
  },
  {
    id: 'contract_expiration',
    label: 'EXPIRAÇÃO CONTRATO',
    minWidth: 100,
    align: 'center',
    format: (value) => new Date(value).toLocaleDateString('pt-br'),
  },
]

export default function ListEmployee() {
  const [form, setForm] = useState({})
  const [loader, setLoader] = useState('LOADING')
  const [data, setData] = useState([])

  useEffect(() => {
    fakeApi
      .get('/employees')
      .then((res) => {
        setData(res.data)
        setLoader('DONE')
      })
      .catch((err) => {
        setLoader('ERROR')
      })
  }, [])

  function onSubmit(e) {
    setForm(e)
  }
  return (
    <Loader state={loader}>
      <Title title="Listar Funcionários">
        <FlexBox>
          <Stack gap={4}>
            <Paper sx={{}}>
              <FlexBox
                justify="center"
                align="center"
                direction="row"
                padding="10px"
                sx={(theme) => ({
                  borderTopLeftRadius: theme.shape.borderRadius,
                  borderTopRightRadius: theme.shape.borderRadius,
                  background: theme.palette.background.default,
                  borderBottom: `1px solid ${theme.palette.divider}`,

                })}
              >
                <Typography
                  sx={(theme) => ({
                    fontSize: theme.typography.body2.fontSize,
                    fontWeight: theme.typography.fontWeightMedium,
                    color: theme.palette.primary.main,
                  })}
                >
                  FILTROS
                </Typography>
              </FlexBox>
              <Form onSubmit={onSubmit}>
                {(props) => (
                  <form onSubmit={props.handleSubmit}>
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      padding={3}
                      spacing={4}
                    >
                      <Field name="full_name">
                        {({ input, meta }) => (
                          <TextField
                            size="small"
                           variant='outlined'
                            value={input.value}
                            onChange={input.onChange}
                            error={!!(meta.submitFailed && meta.error)}
                            helperText={meta.submitFailed && meta.error}
                            label="Nome"
                          />
                        )}
                      </Field>
                      <Field name="cpf">
                        {({ input, meta }) => (
                          <TextField
                            size="small"
                           variant='outlined'
                            value={input.value}
                            onChange={input.onChange}
                            error={!!(meta.submitFailed && meta.error)}
                            helperText={meta.submitFailed && meta.error}
                            label="CPF (Somente Dígitos)"
                          />
                        )}
                      </Field>
                      <Field name="salary">
                        {({ input, meta }) => (
                          <TextField
                            size="small"
                           variant='outlined'
                            value={input.value}
                            onChange={input.onChange}
                            error={!!(meta.submitFailed && meta.error)}
                            helperText={meta.submitFailed && meta.error}
                            label="Salário (Somente Dígitos)"
                          />
                        )}
                      </Field>

                      <Button
                        type="submit"
                        color="primary"
                        size="small"
                        variant="contained"
                        sx={{ mt: '5px' }}
                      >
                        <SearchIcon />
                      </Button>
                    </Stack>
                  </form>
                )}
              </Form>
            </Paper>
            <Table rows={data} columns={columns} filterStatement={form} />
          </Stack>
        </FlexBox>
      </Title>
    </Loader>
  )
}

import { Form, Field } from 'react-final-form'
import { ValidateForm, yup } from 'Functions/Yup'
import { useDispatch } from 'react-redux'
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'
import {
  Autocomplete,
  TextField,
  Button,
  Chip,
  Alert,
  Stack,
  Divider,
  styled,
} from '@mui/material'
import FlexBox from 'Mui/FlexBox'

const FlexForm = styled(
  'form',
  {}
)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  alignItems: 'stretch',
  flex: '1 1 auto,',
  minWidth: '100%',
  overflow: 'auto',
  padding: '0px',
  background: theme.palette.background.default,
  borderRadius: '4px',
  boxShadow: theme.shadows[2],
}))

export function SelectEmployees({ options }) {
  const dispatch = useDispatch()

  const validationSchema = yup.object().shape({
    employees: yup.array().max(10).required().min(1),
  })

  function onSubmit(e) {
    dispatch({ type: 'FILL_LIST', payload: e.employees })
  }

  return (
    <Form
      mutators={{ ...arrayMutators }}
      validate={ValidateForm(validationSchema)}
      onSubmit={onSubmit}
    >
      {(props) => (
        <FlexForm onSubmit={props.handleSubmit}>
          <Stack sx={(theme) => ({ flex: '1 1 auto ' })} gap={2} padding={2}>
            <FlexBox
              flex="0 0 0"
              sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
            >
              <Field name="selected">
                {({ input, meta }) => (
                  <Autocomplete
                    sx={{ flex: '2 1 auto', m: 1 }}
                    disablePortal
                    options={options}
                    value={input.value}
                    getOptionLabel={(option) =>
                      option.label ? option.label : ''
                    }
                    onChange={(e, value) => {
                      input.onChange(value)
                    }}
                    renderInput={(params) => (
                      <TextField
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...params}
                        label="Funcionário"
                        error={!!(meta.submitFailed && meta.error)}
                        helperText={meta.submitFailed && meta.error}
                      />
                    )}
                  />
                )}
              </Field>
              <Button
                sx={{ flex: '1 1 auto', m: 1 }}
                disabled={
                  !props.values.selected ||
                  (props.values.employees &&
                    props.values.employees.filter(
                      (item) => item.id === props.values.selected.id
                    ).length > 0)
                }
                onClick={() => {
                  props.form.mutators.push('employees', {
                    ...props.values.selected,
                  })
                }}
                size="large"
                color="secondary"
                variant="contained"
                type="button"
              >
                Adicionar
              </Button>
            </FlexBox>
            <Stack flex="1 1 auto" gap={2}>
              <FieldArray name="employees">
                {({ fields }) =>
                  fields.map((item, index) => (
                    <Chip
                      sx={{ py: '5px' }}
                      label={props.values.employees[index].label}
                      onDelete={() => {
                        fields.remove(index)
                      }}
                    />
                  ))
                }
              </FieldArray>
            </Stack>
            <Field name="employees">
              {({ input, meta }) =>
                meta.submitFailed && meta.error ? (
                  <Alert sx={{ mt: '5px' }} severity="error">
                    {meta.error}
                  </Alert>
                ) : null
              }
            </Field>
            <Button variant="contained" size="large" type="submit">
              Próximo
            </Button>
          </Stack>
        </FlexForm>
      )}
    </Form>
  )
}

export function ConfirmPayment({ list }) {
  const dispatch = useDispatch()

  const subValidation = yup.object().shape({
    salary: yup.number().min(100).max(100000).required(),
  })

  const validationSchema = yup.object().shape({
    employees: yup.array().of(subValidation),
  })

  function onSubmit(e) {
    dispatch({ type: 'EDIT_VALUES', payload: e.employees })
  }

  return (
    <Form
      initialValues={{ employees: list }}
      mutators={{ ...arrayMutators }}
      validate={ValidateForm(validationSchema)}
      onSubmit={onSubmit}
    >
      {(props) => (
        <FlexForm onSubmit={props.handleSubmit}>
          <Stack sx={{ flex: '1 1 auto ' }} gap={2} padding={2}>
            <FieldArray name="employees">
              {({ fields }) => (
                <Stack
                  gap={2}
                  divider={<Divider direction="horizontal" flexItem />}
                >
                  {fields.map((item, index) => (
                    <FlexBox
                      sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
                    >
                      <Field name={`${item}.full_name`}>
                        {({ input, meta }) => (
                          <TextField
                            sx={{ m: 1, flex: '1 1 auto' }}
                            label="Funcionário"
                            disabled
                            value={input.value}
                            onChange={(e) => {
                              input.onChange(e.target.value)
                            }}
                            error={!!(meta.submitFailed && meta.error)}
                            helperText={meta.submitFailed && meta.error}
                          />
                        )}
                      </Field>
                      <Field name={`${item}.salary`}>
                        {({ input, meta }) => (
                          <TextField
                            sx={{ m: 1, flex: '1 1 auto' }}
                            label="Pagamento"
                            value={input.value}
                            type="number"
                            onChange={(e) => {
                              input.onChange(e.target.value)
                            }}
                            error={!!(meta.submitFailed && meta.error)}
                            helperText={meta.submitFailed && meta.error}
                          />
                        )}
                      </Field>
                    </FlexBox>
                  ))}
                </Stack>
              )}
            </FieldArray>
            <Button variant="contained" size="large" type="submit">
              Próximo
            </Button>
          </Stack>
        </FlexForm>
      )}
    </Form>
  )
}

export function SelectDate() {
  const dispatch = useDispatch()

  const validationSchema = yup.object().shape({
    date: yup.date().required(),
  })

  function onSubmit(e) {
    dispatch({ type: 'SET_DATE', payload: e.date })
  }

  return (
    <Form initalValues={{date:' '}} validate={ValidateForm(validationSchema)} onSubmit={onSubmit}>
      {(props) => (
        <FlexForm onSubmit={props.handleSubmit}>
          <Stack sx={{ flex: '1 1 auto ' }} gap={2} padding={2}>
            <Field name="date">
              {({ input, meta }) => (
                <TextField
                  sx={{ m: 1, flex: '1 1 auto' }}
                  label="Data do Pagamento"
                  type="datetime-local"
                  value={input.value}
                  onChange={(e) => {
                    input.onChange(e.target.value)
                  }}
                  error={!!(meta.submitFailed && meta.error)}
                  helperText={meta.submitFailed && meta.error}
                />
              )}
            </Field>
            <Button variant="contained" size="large" type="submit">
              Próximo
            </Button>
          </Stack>
        </FlexForm>
      )}
    </Form>
  )
}

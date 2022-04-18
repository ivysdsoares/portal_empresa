/* eslint-disable no-template-curly-in-string */
import * as yup from 'yup'
import { setIn } from 'final-form'

yup.setLocale({
  mixed: {
    default: 'Não é válido',
    required: '*Obrigatório',
    min: 'Deve ser maior que ${min} caracteres',
    max: 'Excede ${max} caracteres',
  },
  string: {
    default: 'Não é válido',
    required: '*Obrigatório',
    length: 'Deve possuir ${length} caracteres',
    min: 'Deve ser maior que ${min} caracteres',
    max: 'Deve ser menor que ${max} caracteres',
    email: 'Email deve ser válido',
  },
  number: {
    default: 'Não é válido',
    positive: '*Obrigatório',
    required: '*Obrigatório',
    min: 'Deve ser maior que ${min} ',
    max: 'Deve ser menor que ${max} ',
  },
  array: {
    default: 'Não é válido',
    required: '*Obrigatório',
    min: 'Minimo de ${min} itens',
    max: 'Máximo ${max} itens',
  },
})

const ValidateForm = (schema) => async (values) => {
  if (typeof schema === 'function') {
    schema = schema()
  }
  try {
    await schema.validate(values, { abortEarly: false })
  } catch (err) {
    const errors = err.inner.reduce((formError, innerError) => {
      return setIn(formError, innerError.path, innerError.message)
    }, {})

    return errors
  }
}

export { ValidateForm, yup }

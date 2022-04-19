import Title from 'Mui/Title'
import Loader from 'Mui/Loader'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Stepper, Step, StepLabel } from '@mui/material'
import fakeApi from 'Services/fakeapi'
import FlexBox from 'Mui/FlexBox'
import { SelectEmployees, ConfirmPayment, SelectDate } from './forms'
import Receipt from './receipt'

const steps = [
  { label: 'Selecione os Funcionários', value: 'step1' },
  { label: 'Edite os valores do Pagamento', value: 'step2' },
  { label: 'Agende uma Data', value: 'step3' },
  { label: 'Confirme o Pagamento', value: 'step4' },
]

export default function Payment() {
  const [options, setOptions] = useState([])
  const [loader, setLoader] = useState('LOADING')
  const dispatch = useDispatch()
  const wizard = useSelector((state) => state.wizard_manager)

  useEffect(() => {
    dispatch({ type: 'RESET_WIZARD' })
    fakeApi
      .get('employees')
      .then((res) => {
        dispatch({ type: 'SET_REFERENCE', payload: res.data })
        setOptions(
          res.data.map((item) => ({ id: item.id, label: item.full_name }))
        )
        setLoader('DONE')
      })
      .catch((err) => {
        setLoader('ERR')
      })
  }, [])

  return (
    <Loader state={loader}>
      <Title title="Realizar Pagamento">
        <FlexBox direction="row" justify="stretch" align="stretch">
          {wizard.step === 0 && <SelectEmployees options={options} />}
          {wizard.step === 1 && <ConfirmPayment list={wizard.employees_list} />}
          {wizard.step === 2 && <SelectDate list={wizard.employees_list} />}
          {wizard.step === 3 && <Receipt />}
        </FlexBox>
        <FlexBox flex="0 0 0" padding="20px 0px">
          <Stepper activeStep={wizard.step}>
            {steps.map((item) => (
              <Step key={item.value}>
                <StepLabel>{item.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </FlexBox>
      </Title>
    </Loader>
  )
}

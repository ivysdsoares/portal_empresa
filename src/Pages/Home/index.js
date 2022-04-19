import Title from 'Mui/Title'
import Loader from 'Mui/Loader'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import FlexBox from 'Mui/FlexBox'
import {
  Typography,
  Stack,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import { CreditCard, Receipt, ExpandMore } from '@mui/icons-material'
import fakeApi from 'Services/fakeapi'
import { ShowHideCard, MenuCard } from './cards'

export default function Home() {
  const [loader, setLoader] = useState('LOADING')
  const [account, setAccount] = useState({})
  const [receipts, setReceipts] = useState([])
  const userData = useSelector((state) => state.login_manager)

  useEffect(() => {
    const waitAccount = new Promise((resolve, reject) => {
      fakeApi
        .get(`account_savings/?user_id=${userData.id}`)
        .then((res) => {
          if (res.data.length > 0) {
            setAccount(res.data[0])
            resolve()
          }
        })
        .catch((err) => {
          console.log(err)
          reject()
        })
    })
    const waitReceipt = new Promise((resolve, reject) => {
      fakeApi
        .get(`transactions/?user_id=${userData.id}`)
        .then((res) => {
          setReceipts(res.data)
          resolve()
        })
        .catch((err) => {
          console.log(err)
          reject()
        })
    })
    Promise.all([waitAccount, waitReceipt])
      .then((e) => {
        setLoader('DONE')
      })
      .catch((e) => {
        setLoader('ERROR')
      })
  }, [])
  return (
    <Loader state={loader}>
      <Title title="Minha Conta">
        <FlexBox wrap="wrap" direction="row" justify="center" align="stretch">
          <MenuCard icon={CreditCard} label="MEU SALDO">
            <Stack gap={2}>
              <ShowHideCard
                value={account.checking_account}
                label="Conta Corrente:"
              />
              <ShowHideCard
                value={account.savings_account}
                label="Conta Poupança:"
              />
              <ShowHideCard
                value={account.investments}
                label="Investimentos:"
              />
            </Stack>
          </MenuCard>

          <MenuCard icon={Receipt} label=" MEUS EXTRATOS">
            <Accordion disableGutters sx={(theme) => ({})}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography
                  sx={(theme) => ({
                    fontWeight: theme.typography.fontWeightRegular,
                    fontSize: '1.25rem',
                  })}
                >
                  Transações Recentes
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ maxHeight: '35vh', overflow: 'auto' }}>
                <Stack
                  gap={2}
                  divider={<Divider flexItem direction="horizontal" />}
                >
                  {receipts
                    .sort((a, b) => (a.datetime > b.datetime ? -1 : 1))
                    .map((item) => (
                      <FlexBox padding="0px 15px">
                        <FlexBox direction="row">
                          <Typography
                            sx={{ lineHeight: 1.2, fontSize: '1rem' }}
                          >
                            Valor:
                          </Typography>
                          <Typography
                            sx={(theme) => ({
                              flex: '1 1 auto ',
                              color: theme.palette.text.secondary,
                              textAlign: 'center',
                              lineHeight: 1.2,
                              fontSize: '1rem',
                            })}
                          >
                            R$
                            {item.amount
                              .toFixed(2)
                              .toString()
                              .replaceAll('.', ',')}
                          </Typography>
                        </FlexBox>

                        <FlexBox direction="row">
                          <Typography
                            sx={{ lineHeight: 1.2, fontSize: '1rem' }}
                          >
                            Data:
                          </Typography>
                          <Typography
                            sx={(theme) => ({
                              flex: '1 1 auto ',
                              color: theme.palette.text.secondary,
                              textAlign: 'center',
                              lineHeight: 1.2,
                              fontSize: '1rem',
                            })}
                          >
                            {new Date(item.datetime).toLocaleString('pt-br')}
                          </Typography>
                        </FlexBox>
                        <FlexBox direction="row">
                          <Typography
                            sx={{ lineHeight: 1.2, fontSize: '1rem' }}
                          >
                            Hora:
                          </Typography>
                          <Typography
                            sx={(theme) => ({
                              flex: '1 1 auto ',
                              color: theme.palette.text.secondary,
                              textAlign: 'center',
                              lineHeight: 1.2,
                              fontSize: '1rem',
                            })}
                          >
                            {new Date(item.datetime).toLocaleTimeString(
                              'pt-br'
                            )}
                          </Typography>
                        </FlexBox>
                        <FlexBox direction="row">
                          <Typography
                            sx={{ lineHeight: 1.2, fontSize: '1rem' }}
                          >
                            Para:
                          </Typography>
                          <Typography
                            sx={(theme) => ({
                              flex: '1 1 auto ',
                              color: theme.palette.text.secondary,
                              textAlign: 'center',
                              lineHeight: 1.2,
                              fontSize: '1rem',
                            })}
                          >
                            {item.destinatary}
                          </Typography>
                        </FlexBox>
                      </FlexBox>
                    ))}
                </Stack>
              </AccordionDetails>
            </Accordion>
          </MenuCard>
        </FlexBox>
      </Title>
    </Loader>
  )
}

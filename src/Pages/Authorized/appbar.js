import { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Divider, AppBar, Typography, Button, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'
import { CorporateFare, Logout, Menu as MenuIcon } from '@mui/icons-material'
import useOnClickOutside from 'Functions/useOnClickOutside'
import FlexBox from 'Mui/FlexBox'
import pages from 'Routes/pages'
import { NavLink, useNavigate } from 'react-router-dom'

const CustomMenu = styled(
  'div',
  {}
)(({ theme, show }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'start',
  position: 'absolute',
  top: 0,
  left: 0,
  paddingTop: '50px',
  height: ' calc( 100vh - 50px )',
  maxHeight: '100vh',
  transitionDuration: '300ms',
  boxShadow: theme.shadows[4],
  zIndex: theme.zIndex.drawer,
  background: ` linear-gradient(180deg,
       ${theme.palette.background.default} 0%,
       ${theme.palette.background.default} 100%)`,

  [theme.breakpoints.up('sm')]: {
    transform: `${show ? 'translateX(0)' : 'translateX(-100%)'}`,
    width: '10rem',
  },
  [theme.breakpoints.down('sm')]: {
    transform: `${show ? 'translateX(0)' : 'translateX(-100%)'}`,
    width: '100vw',
  },
}))

export default function ResponsiveAppBar() {
  const [open, setOpen] = useState()
  const userData = useSelector((state) => state.login_manager)
  const ref = useRef()
  const ignore = useRef()
  const go = useNavigate()
  const dispatch = useDispatch()

  useOnClickOutside(
    ref,
    () => {
      setOpen(false)
    },
    ignore
  )

  return (
    <>
      <AppBar
        sx={(theme) => ({
          background: ` linear-gradient(90deg,
           ${theme.palette.primary.dark} 0%,
           ${theme.palette.primary.main} 20%,
           ${theme.palette.primary.main} 80%,
           ${theme.palette.primary.dark} 100%)`,
          boxShadow:
            '0px 0px 40px 0px rgba(0,0,0,0.3),0px 0px 10px 0px rgba(0,0,0,0.5) ',
          borderLeft: `5px solid ${theme.palette.secondary.main}`,
          borderRight: `5px solid ${theme.palette.secondary.main}`,
          padding: '2px',
          zIndex: theme.zIndex.drawer+1,
        })}
        position="static"
      >
        <FlexBox direction="row" justify="start" align="center">
          <Button
            onClick={() => {
              setOpen(!open)
            }}
            ref={ignore}
            variant="ghost"
            color="secondary"
          >
            <MenuIcon
              sx={(theme) => ({ color: theme.palette.primary.contrastText })}
            />
          </Button>
          <FlexBox
            direction="row"
            align="center"
            flex="0  0 auto"
            padding="5px 15px"
            sx={(theme) => ({
              color: theme.palette.primary.contrastText,
            })}
          >
            <CorporateFare
              sx={(theme) => ({ fontSize: theme.typography.h5.fontSize })}
            />
            <Typography
              sx={(theme) => ({
                px: '5px',
                color: theme.palette.primary.contrastText,
                fontSize: theme.typography.h5.fontSize,
                lineHeight: '0px',
                fontWeight: theme.typography.fontWeightBold,
                fontFamily: '"Fira Sans"',
                display: { xs: 'none', sm: 'flex' },
              })}
            >
              PORTAL EMPRESA
            </Typography>
          </FlexBox>

          <FlexBox />
          <FlexBox
            sx={{ textAlign: 'center', display: { xs: 'none', sm: 'flex' } }}
            direction="column"
            align="stretch"
            flex="0 0 auto"
            padding="0px 20px"
          >
            <Typography
              sx={(theme) => ({
                fontWeight: theme.typography.fontWeightBold,
                lineHeight: theme.typography.caption.fontSize,
              })}
              variant="caption"
            >
              Sessão Iniciada em:
            </Typography>
            <Typography variant="body2">
              {new Date(userData.login_time).toLocaleString('pt-br')}
            </Typography>
          </FlexBox>

          <Button
            onClick={() => {
              dispatch({ type: 'REMOVE_AUTH', payload: '' })
              go('/')
            }}
            variant="ghost"
          >
            <Logout
              sx={(theme) => ({ color: theme.palette.primary.contrastText })}
            />
          </Button>
        </FlexBox>
      </AppBar>

      <CustomMenu ref={ref} show={open}>
        <Stack divider={<Divider orientation="horizontal" flexItem />}>
          {pages.map((item) => (
            <NavLink
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textDecoration: 'none',
              }}
              to={item.path}
              onClick={()=>{setOpen(false)}}
            >
              {({ isActive }) => (
                <Button
                  variant="text"
                  color="primary"
                  sx={(theme) => ({
                    p: '10px 22px',
                    borderRight: isActive
                      ? `3px solid ${theme.palette.secondary.main}`
                      : `0px solid ${theme.palette.secondary.light}`,
                    borderRadius: '0',
                    flex: '1 1 auto',
                  })}
                >
                  {item.label}
                </Button>
              )}
            </NavLink>
          ))}
        </Stack>
      </CustomMenu>
    </>
  )
}

import * as Pages from 'Pages'
import { useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function PrivateRoute({ element, permission, userData }) {
  let check = { user: 1, admin: 2 }

  if (!userData.authorized) {
    return <Pages.Login />
  }
  if ( check[userData.permission]>= check[permission]) {
    return element
  }
  return <div> Sem permissão</div>
}

export default function Router() {
  const userData = useSelector((state) => state.login_manager)
  console.log(userData)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pages.Body />}>
          <Route index element={<Pages.Login />} />
          <Route
            path="/authorized"
            element={PrivateRoute({
              element: <Pages.Authorized />,
              permission: 'user',
              userData,
            })}
          >
            <Route index element={<Pages.Home />} />
            <Route
              path="/authorized/payment"
              element={PrivateRoute({
                element: <Pages.Payment />,
                permission: 'admin',
                userData,
              })}
            />
            <Route
              path="/authorized/list-employees"
              element={PrivateRoute({
                element: <Pages.ListEmployee />,
                permission: 'admin',
                userData,
              })}
            />
          </Route>
        </Route>
        <Route path="*" element={<Pages.Body />} />
      </Routes>
    </BrowserRouter>
  )
}

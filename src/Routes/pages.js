const pages = [
  {
    label: 'Minha Conta',
    path: '/authorized/',
    permission: 'user',

  },
  {
    label: 'Listagem Funcionários',
    path: '/authorized/list-employees',
    permission: 'admin',
    id: '134564',
  },
  {
    label: 'Realizar Pagamento',
    path: '/authorized/payment/',
    permission: 'admin',

  },
]

export default pages


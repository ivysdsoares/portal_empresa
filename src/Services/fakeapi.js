import axios from 'axios'

const fakeApi = axios.create({
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  baseURL: process.env.REACT_APP_FAKE_API_URL,
})

export default fakeApi

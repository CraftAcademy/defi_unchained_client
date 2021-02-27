import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'

const registration = async (credentials) => {
  let response = await axios.post('/api/auth', credentials)
  let userCredentials = {
    uid: response.headers['uid'],
    access_token: response.headers['access-token'],
    client: response.headers['client'],
    expiry: response.headers['expiry'],
    token_type: 'Bearer'
  }
  localStorage.setItem('credentials', JSON.stringify(userCredentials))
}

const signIn = async (credentials) => {
  let response = await axios.post('/api/auth/sign_in', credentials)
  let userCredentials = {
    uid: response.headers['uid'],
    access_token: response.headers['access-token'],
    client: response.headers['client'],
    expiry: response.headers['expiry'],
    token_type: 'Bearer'
  }
  localStorage.setItem('credentials', JSON.stringify(userCredentials))
}

const subscribe = async () => {
  let credentials = JSON.parse(localStorage.getItem('credentials'))
  let response = await axios.post('/api/subscriptions', {params: ''} , {headers: credentials})
  return response
}

export {registration,  signIn, subscribe}
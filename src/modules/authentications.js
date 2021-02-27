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
  let header_credentials = JSON.parse(localStorage.getItem('credentials'))
  let response = await axios.post('/api/subscriptions', { params: '' }, { headers: header_credentials })
  return response
}

const isSubscribed = async () => {
  let header_credentials = JSON.parse(localStorage.getItem('credentials'))
  let response = await axios.get('/api/subscriptions', { headers: header_credentials })
  return response.data.subscriber
}

const validateToken = async () => {
  let header_credentials = JSON.parse(localStorage.getItem('credentials'))
  try {
    await axios.get('/api/auth/validate_token', { headers: header_credentials })
    return true
  }
  catch (error) {
    return false
  }
}

export { registration, signIn, subscribe, isSubscribed, validateToken }
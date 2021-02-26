import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'

const getMarketCapData = async () => {
  let today = new Date()
  today.setDate(today.getDate() - 7)
  today = today.toISOString().split('today')[0]

  let response = await axios.get(`/api/markets?date=${today}`);
  return response.data.market_data
}

const getCoinData = async () => {
  let response = await axios.get('/api/currencies')
  return response.data.currencies
}

const getNewsData = async () => {
  let credentials = JSON.parse(localStorage.getItem('credentials'))
  let date = new Date()
  date.setDate(date.getDate() - 5);
  date = date.toLocaleDateString('en-CA')
  let response = await axios.get('/api/news',
    { date: date },
    { headers: credentials })
  debugger
  return response.data.articles
}

const registration = async (credentials) => {
  let response = await axios.post('/api/auth', credentials)
  let userCredentials = {
    uid: response.headers['uid'],
    access_token: response.headers['access-token'],
    client: response.headers['client'],
    expiry: response.headers['expiry'],
    token_type: 'Bearer'
  }
  return [response, userCredentials]
}

export { getMarketCapData, getCoinData, registration, getNewsData };


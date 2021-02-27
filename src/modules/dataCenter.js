import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'

let credentials = JSON.parse(localStorage.getItem('credentials'))

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
  let today = new Date()
  today.setDate(today.getDate() - 5);
  let fiveDaysAgo = today.toLocaleDateString('en-CA')

  let response = await axios.get(`/api/news?date=${fiveDaysAgo}`, {headers: credentials})
  return response.data.articles
}

const getBuySignal = async () => {
  let response = await axios.get('/api/buy_signals', { headers: credentials })
  return response.data.signal
}

export { getMarketCapData, getCoinData, getNewsData, getBuySignal };


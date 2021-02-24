import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'

const getMarketCapData = async () => {
  let today = new Date()
  today.setDate(today.getDate() - 7)
  today = today.toISOString().split('today')[0]

  let response = await axios.get(`/api/markets?date=${today}`);
  return response.data
}

const getCoinData = async () => {
  let response = await axios.get('/api/currencies')
  return response.data
}

export { getMarketCapData, getCoinData };


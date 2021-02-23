import axios from 'axios'

const getMarketCapData = async () => {
  let today = new Date()
  today.setDate(today.getDate() - 7)
  today = today.toISOString().split('today')[0]
  try {
    let response = await axios.get(`/api/markets?date=${today}`);
    return response.data
  }
  catch (error) {
    return error.config
  }

}

export { getMarketCapData };


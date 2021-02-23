import axios from 'axios'

const getMarketCapData = async () => {
  let today = new Date
  today.setDate(today.getDate() - 7)
  today = today.toISOString().split('today')[0]
  let response = await axios.get('/api/markets', {
    date: today
  })
  debugger
}

export {getMarketCapData};


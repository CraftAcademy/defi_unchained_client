import React from 'react';
import { getMarketCapData } from '../modules/DataCenter'
import axios from 'axios'

class MarketCapChart extends React.Component {
  state = {
    market_data: []
  }
  componentDidMount = async () => {
    let response = await getMarketCapData()
    this.setState({market_data: response.market_data})
  }

  render() {
    const list = this.state.market_data.map(day => {
      return (
        <h1>{day.market_cap}</h1>
      )
    })
    return (
      <div>
        HELLO LUCAS
         {list}
      </div>
    )
  }
}

export default MarketCapChart;
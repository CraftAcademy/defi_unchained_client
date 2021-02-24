import React from 'react';
import { Container } from 'semantic-ui-react';
import { getMarketCapData } from '../modules/DataCenter'
import axios from 'axios'

class MarketCapChart extends React.Component {
  state = {
    market_data: []

  }
  componentDidMount = async () => {
    let response = await getMarketCapData()
    
    this.setState({ market_data: response.market_data })
    debugger
  }

  render() {
    const list = this.state.market_data.map(day => {
      return (
        <h1>{day.market_cap}</h1>
      )
    })
    return (
      <Container>
{this.state.market_data[1] && <h1>{this.state.market_data[this.state.market_data.length - 1].market_cap}</h1>} 
        </Container>


    )
  }
}

export default MarketCapChart;


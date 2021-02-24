import React from 'react';
import { Card } from 'semantic-ui-react';
import MarketChart from './MarketChart'
import { getMarketCapData } from '../modules/datacenter'

class MarketCapChart extends React.Component {
  state = {
    market_data: []
  }
  componentDidMount = async () => {
    try {
      let response = await getMarketCapData()
      this.setState({ market_data: response.market_data })
    }
    catch (error) {
      this.setState({ errorMessage: error.message })
    }
  }

  render() {
    const { market_data, errorMessage } = this.state
    let daily_cap = market_data[1] ? (+market_data[market_data.length - 1].market_cap).toLocaleString() : errorMessage
    let daily_change = market_data[1] ? ((market_data[market_data.length - 1].market_cap / market_data[market_data.length - 2].market_cap - 1) * 100).toFixed(1) : errorMessage

    return (
    
          <Card className="market-card">
            <Card.Content>
              <Card.Header data-cy="daily-cap">
                <span>Total Market Cap: </span><span>{daily_cap}</span>
              </Card.Header>
              <Card.Header data-cy="daily-change">
                <span>Daily Change: </span><span>{daily_change}%</span>
              </Card.Header>
              <div data-cy="market-chart" >
                <MarketChart market_data={market_data} />
              </div>
            </Card.Content>
          </Card>
     
    )
  }
}

export default MarketCapChart;


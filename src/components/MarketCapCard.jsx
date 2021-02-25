import React from 'react';
import { Card } from 'semantic-ui-react';
import MarketChart from './MarketChart'
import { getMarketCapData } from '../modules/dataCenter'

class MarketCapCard extends React.Component {
  state = {
    market_data: []
  }
  componentDidMount = async () => {
    try {
      let response = await getMarketCapData()
      this.setState({ market_data: response})
    }
    catch (error) {
      this.setState({ errorMessage: error.message})
    }
  }

  render() {
    const { market_data, errorMessage } = this.state
    let dailyCap = market_data[1] && (+market_data[market_data.length - 1].market_cap).toLocaleString()
    let dailyChange = market_data[1] && ((market_data[market_data.length - 1].market_cap / market_data[market_data.length - 2].market_cap - 1) * 100).toFixed(1)

    return (
      <Card className="market-card">
        <Card.Content>
          {market_data[1] ? (
            <>
              <Card.Header data-cy="daily-cap">
                <span>Total Market Cap: </span><span>{dailyCap}</span>
              </Card.Header>
              <Card.Header data-cy="daily-change">
                <span>Daily Change: </span><span>{dailyChange}%</span>
              </Card.Header>
              <div data-cy="market-chart" >
                <MarketChart market_data={market_data} />
              </div>
            </>
          ) : (
              <Card.Header>{errorMessage}</Card.Header>
          )
        }
        </Card.Content>
      </Card>
    )
  }
}
export default MarketCapCard;
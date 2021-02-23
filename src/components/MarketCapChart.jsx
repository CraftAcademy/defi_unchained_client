import React, { Component } from 'react';
import {getMarketCapData} from '../modules/DataCenter'

class MarketCapChart extends React.Component {
  componentDidMount() {
    debugger
  getMarketCapData()
  }
  render() {
    return (
      <div>
        HELLO LUCAS
      </div>
    )
  }
}

export default MarketCapChart;
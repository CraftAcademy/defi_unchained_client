import React from 'react'
import { Line } from 'react-chartjs-2'

const MarketChart = ({ market_data }) => {

  let marketLabels = []
  let marketData = []
  market_data.forEach(day => {
    marketLabels.push(day.timestamp)
    marketData.push(day.market_cap)
  })

  const data = {
    labels: marketLabels,
    datasets: [
      {
        label: "7 Day Chart",
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: marketData
      }
    ]
  }
  return (
    <Line data={data} />
  )
}

export default MarketChart



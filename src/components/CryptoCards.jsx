import React, { useState, useEffect } from 'react'
import { getCoinData } from '../modules/dataCenter'
import { Card, Grid } from 'semantic-ui-react';

const CryptoCards = () => {
  const [currencies, setCurrencies] = useState([])
  const [errorMessage, setErrorMessage] = useState()

  useEffect(() => {
    setTimeout(async () => {
      try {
        let response = await getCoinData()
        setCurrencies(response)
      }
      catch (error) {
        setErrorMessage("Couldn't render information. Please update.")
      }
    }, 1500)
  }, [])

const cryptoCards = currencies.map((coin, i) => {
  return (
    <Grid.Column>
      <Card key={i} data-cy="crypto-card">
        <Card.Content>
          <Card.Header data-cy="crypto-header">
            {coin.name}
            <span><img alt={coin.name} src={coin.logo} /></span>
          </Card.Header>
          <Card.Description data-cy="crypto-price">${coin.price}</Card.Description>
          <Card.Description data-cy="crypto-change">{coin.change.toFixed(2)}%</Card.Description>
        </Card.Content>
      </Card>
    </Grid.Column>
  )
})
return (
  <>
    {errorMessage ? <h2>{errorMessage} </h2>: cryptoCards}
  </>
)
}

export default CryptoCards

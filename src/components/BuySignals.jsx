import React, { useState, useEffect } from 'react'
import { Button, Grid, Segment, Card, Image, Header } from 'semantic-ui-react'
import { getBuySignal } from '../modules/dataCenter'
import { subscribe } from '../modules/authentications'

const BuySignals = ({ authenticated }) => {
  const [subscriber, setSubscriber] = useState(false)
  const [coin, setCoin] = useState()
  const [logo, setLogo] = useState()
  const [user, setUser] = useState('John')

  const becomeSubscriber = async () => {
    let response = await subscribe()
    if (response.status === 200) {
      setSubscriber(true)
    }
  }

  useEffect(async () => {
    if (subscriber === true) {
      let response = await getBuySignal()
      setCoin(response.coin)
      setLogo(response.logo)
    }
  })

  return (
    <>
      {!authenticated ? (
        <Header style={{ color: "white" }}>Please login or make an account</Header>
      ) : (
          !subscriber ? (
            <Button data-cy="subscribe" color="green" onClick={() => becomeSubscriber()}>Become Subscriber!</Button>
          ) : (
              <Header style={{ color: "white" }}>Welcome back {user}. <br></br>Today you should buy:</Header>
            )
        )}
      <Grid.Row >
        {subscriber && (
          <Segment style={{ padding: 20 }} centered textAlign="center" data-cy="signal-wrapper" as={Card}>
            <Header data-cy="signal-coin">{coin}</Header>
            <Image size="small" data-cy="signal-logo" alt={coin} src={logo} />
          </Segment>
        )}
      </Grid.Row>
    </>
  )
}

export default BuySignals

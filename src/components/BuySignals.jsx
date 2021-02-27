import React, { useState, useEffect } from 'react'
import { Grid, Segment, Card, Image, Header } from 'semantic-ui-react'
import BecomeSubscriber from './BecomeSubscriber'
import { getBuySignal } from '../modules/dataCenter'
import { isSubscribed } from '../modules/authentications'
import { Elements } from 'react-stripe-elements'

const BuySignals = ({ authenticated }) => {
  const [subscriber, setSubscriber] = useState(false)
  const [coin, setCoin] = useState()
  const [logo, setLogo] = useState()

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await isSubscribed()
        setSubscriber(response)
        if (response === true) {
          let signal = await getBuySignal()
          setCoin(signal.coin)
          setLogo(signal.logo)
        }
      }
      catch (error) {
      }
    }
    if (authenticated) {
      fetchData()
    }
  }, [authenticated, subscriber])

  return (
    <>
      {!authenticated ? (
        <Header style={{ color: "white" }}>Please login or make an account</Header>
      ) : subscriber ? (
        <>
          <Header style={{ color: "white" }}>Welcome!<br></br>Today you should buy:</Header>
          <Segment style={{ padding: 20 }} centered textAlign="center" data-cy="signal-wrapper" as={Card}>
            <Header data-cy="signal-coin">{coin}</Header>
            <Image size="small" data-cy="signal-logo" centered alt={coin} src={logo} />
          </Segment>
        </>
      ) : (
            <Elements>
              <BecomeSubscriber setSubscriber={setSubscriber} />
            </Elements>
          )}
    </>
  )
}

export default BuySignals

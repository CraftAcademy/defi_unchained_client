import React, { useState } from 'react'
import { Button, Segment} from 'semantic-ui-react'
import { payWithStripe } from '../modules/authentications'
import { injectStripe, CardNumberElement, CardExpiryElement, CardCVCElement } from 'react-stripe-elements'

const BecomeSubscriber = (props) => {
  const [renderForm, setRenderForm] = useState(false)
  const [errorMessage, setErrorMessage] = useState()

  const subscribe = async (event) => {
    event.preventDefault()
    let stripeResponse = await props.stripe.createToken()
    let response = stripeResponse.token && (
      await payWithStripe(stripeResponse.token.id)
    )
    try {
      if (response.paid) {
        props.setSubscriber(true)
      }
    }
    catch (error) {
      setErrorMessage("Wrong information. Try again")
    }
  }

  return (
    <>
      {!renderForm ? (
        <Button data-cy="subscribe" color="green" onClick={() => setRenderForm(true)}>
          Become Subscriber!
        </Button>
      ) : (
          <Segment centered className="payment-wrapper" textAlign="center">
            <form data-cy="payment-form" onSubmit={(event) => subscribe(event)}>
              {errorMessage && <div>{errorMessage}</div>}
              <div data-cy="card-number">
                <label>Card Number</label>
                <CardNumberElement />
              </div>
              <div data-cy="card-expiry">
                <label>Card Expiry Date</label>
                <CardExpiryElement />
              </div>
              <div data-cy="card-cvc">
                <label>Card CVC</label>
                <CardCVCElement />
              </div>
              <Button data-cy="submit-payment">Subscribe!</Button>
            </form>
          </Segment>
        )}
    </>
  )
}

export default injectStripe(BecomeSubscriber)

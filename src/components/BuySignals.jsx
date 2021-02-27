import React, { useState, useEffect } from 'react'
import { Button } from 'semantic-ui-react'

const BuySignals = () => {
  const [subscriber, setSubscriber] = useState(false)

  const becomeSubscriber = async () => {
    try {
      
      setSubscriber(true)
    }
    catch (error) {
      debugger
    }
  }

  return (
    <div>
      <Button color="green" onClick={() => becomeSubscriber()}>Become Subscriber!</Button>
    </div>
  )
}

export default BuySignals

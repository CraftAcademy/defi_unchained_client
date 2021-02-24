import React, { useState, useEffect } from 'react'
import {getCoinData} from '../modules/dataCenter'

const CryptoCards = () => {
  const [currencies, setCurrencies] = useState([])

  useEffect(() => {
    let response = getCoinData()
    setCurrencies(response.currencies)
  }, )

  return (
    <div>
      
    </div>
  )
}

export default CryptoCards

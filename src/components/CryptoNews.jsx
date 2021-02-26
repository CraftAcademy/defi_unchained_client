import React, { useEffect } from 'react'
import { Grid, Header, Segment, Item } from 'semantic-ui-react'
import { getNewsData } from '../modules/dataCenter'

const CryptoNews = ({ authenticated }) => {

  useEffect(async () => {
    try {
      let response = await getNewsData()
    }
    catch (error) {
      debugger
    }

  }, [])

  return (
    <>
      <Grid.Row>
        <Header data-cy="news-header">Latest Crypto News</Header>
      </Grid.Row>
      <Grid.Row>
        <Segment data-cy="news-list-wrapper">
          <Item.Group>

          </Item.Group>
        </Segment>
      </Grid.Row>
    </>
  )
}

export default CryptoNews

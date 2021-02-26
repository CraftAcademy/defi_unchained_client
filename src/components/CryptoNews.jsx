import React, { useEffect, useState } from 'react'
import { Grid, Header, Segment, Item } from 'semantic-ui-react'
import { getNewsData } from '../modules/dataCenter'

const CryptoNews = ({ authenticated }) => {
  const [errorMessage, setErrorMessage] = useState()

  useEffect(() => {
    const asyncFetch = async () => {
      try {
        let response = await getNewsData()
      }
      catch (error) {
      }
    }
  }, [authenticated])

  return (
    <>
      <Grid.Row>
        <Header data-cy="news-header">Latest Crypto News</Header>
      </Grid.Row>
      <Grid.Row>
        <Segment data-cy="news-list-wrapper">
          {authenticated ? (
            <Item.Group>
              HELLO YOURE IN!
            </Item.Group>
          ) : (
              <Header data-cy="news-auth-error" >
                You will need to login in order to see the news.
              </Header>
            )}

        </Segment>
      </Grid.Row>
    </>
  )
}

export default CryptoNews

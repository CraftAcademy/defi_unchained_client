import React, { useEffect, useState } from 'react'
import { Grid, Header, Segment, Item, StepTitle } from 'semantic-ui-react'
import { getNewsData } from '../modules/dataCenter'

const CryptoNews = ({ authenticated }) => {
  const [errorMessage, setErrorMessage] = useState()
  const [news, setNews] = useState([])

  useEffect(async () => {
    try {
      let response = await getNewsData()
      setNews(response)
    }
    catch (error) {
      setErrorMessage(error.message)
    }
  }, [authenticated])

  const newsList = news.map((article, i) => {
    return (
      <Item key={i} className="news-article" data-cy="news-article">
        <Item.Image src={article.urlToImage} />
        <Item.Content>
          <Item.Header>{article.title}</Item.Header>
          <Item.Meta>Written on: {article.date}</Item.Meta>
          <Item.Description>{article.description}</Item.Description>
        </Item.Content>
      </Item>
    )
  })

  return (
    <>
      <Grid.Row className="news-wrapper">
        <Segment >
          {authenticated ? (
            <Item.Group>
              {newsList}
            </Item.Group>
          ) : (
              <Header data-cy="news-auth-error" >
                {errorMessage ? errorMessage : 'You will need to login in order to see the news.'}
              </Header>
            )}
        </Segment>
      </Grid.Row>
    </>
  )
}

export default CryptoNews

import React, { useEffect, useState } from 'react'
import { Grid, Header, Segment, Item } from 'semantic-ui-react'
import { getNewsData } from '../modules/dataCenter'

const CryptoNews = ({ authenticated }) => {
  const [news, setNews] = useState([])

  useEffect(async () => {
    let response = await getNewsData()
    setNews(response)
  }, [authenticated])

  const newsList = news.map((article, i) => {
    return (
      <Item as='a' href={article.url} key={i} className="news-article" data-cy="news-article">
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

      {authenticated ? (
        <Grid.Row column={1} >
            <Segment className="news-wrapper">
              <Item.Group divided>
                {newsList}
              </Item.Group>
            </Segment>
        </Grid.Row >
      ) : (
          <Grid.Row centered>
            <Segment >
              <Header data-cy="news-auth-error" >
                You will need to login in order to see the news.
              </Header>
            </Segment>
          </Grid.Row>
        )}

    </>
  )
}

export default CryptoNews

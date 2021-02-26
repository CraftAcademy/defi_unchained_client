import React, { useState } from 'react';
import MarketCapCard from './components/MarketCapCard'
import CryptoNews from './components/CryptoNews'
import RegistrationModal from './components/RegistrationModal'
import CryptoCard from './components/CryptoCards'
import './app.css'
import { Grid, Tab, Item, Header } from 'semantic-ui-react';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false)

  const panes = [
    {
      menuItem: 'Crypto Info',
      render: () =>
        <Tab.Pane attached={false}>
          <Grid centered textAlign="center">
            <Header className="page-header" data-cy="news-header">Welcome to DeFi Unchained!</Header>
            <Grid.Row>
              <MarketCapCard />
            </Grid.Row>
            <Grid.Row data-cy="crypto-cards" columns={3}>
              <CryptoCard />
            </Grid.Row>
          </Grid>
        </Tab.Pane>
    },
    {
      menuItem: 'Crypto News',
      render: () =>
        <Tab.Pane attached={false}>
          <Grid>
            <Grid.Row centered>
              <Header textAlign="center" className="page-header" data-cy="news-header">Latest Crypto News</Header>
            </Grid.Row>
            <CryptoNews authenticated={authenticated} />
          </Grid>
        </Tab.Pane>,
    },
    {
      menuItem: 'Buy Signals',
      render: () =>
        <Tab.Pane attached={false}>
          <Grid centered textAlign="center">
            <Header className="page-header" data-cy="news-header">Your Daily Buy Signals!</Header>
          </Grid>
        </Tab.Pane>,
    },
    {
      menuItem: <RegistrationModal setAuthenticated={setAuthenticated} />
    }
  ]

  return (
    <Tab menu={{ secondary: true, pointing: true, color: 'teal' }} panes={panes} />
  );
}

export default App;

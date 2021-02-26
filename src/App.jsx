import React, { useState } from 'react';
import MarketCapCard from './components/MarketCapCard'
import CryptoNews from './components/CryptoNews'
import RegistrationModal from './components/RegistrationModal'
import CryptoCard from './components/CryptoCards'
import './app.css'
import { Grid, Tab, Item } from 'semantic-ui-react';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false)

  const panes = [
    {
      menuItem: 'Crypto Info',
      render: () =>
        <Tab.Pane attached={false}>
          <Grid centered textAlign="center">
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
      render: () => <Tab.Pane attached={false}>
        <Grid centered textAlign="center">
          <CryptoNews authenticated={authenticated}/>
        </Grid>
      </Tab.Pane>,
    },
    {
      menuItem: 'Buy Signals',
      render: () => <Tab.Pane attached={false}>
        <Grid centered textAlign="center">
        </Grid>
      </Tab.Pane>,
    },
    {
      menuItem: <RegistrationModal setAuthenticated={setAuthenticated}/>
    }
  ]

  return (
    <Tab menu={{ secondary: true, pointing: true, renderActiveOnly: false }} panes={panes} />
  );
}

export default App;

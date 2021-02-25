import React, { useState } from 'react';
import MarketCapCard from './components/MarketCapCard'
import RegistrationModal from './components/RegistrationModal'
import CryptoCard from './components/CryptoCards'
import './app.css'
import { Grid, Tab } from 'semantic-ui-react';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false)

  const panes = [
    {
      menuItem: 'Crypto Info',
      render: () =>
        <Tab.Pane attached={false}>
          <Grid centered textAlign="center">
            {!authenticated && (
              <Grid.Row>
                <RegistrationModal setAuthenticated={setAuthenticated} />
              </Grid.Row>
            )}
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
          {!authenticated && (
            <Grid.Row>
              <RegistrationModal setAuthenticated={setAuthenticated} />
            </Grid.Row>
          )}
        </Grid>
      </Tab.Pane>,
    },
    {
      menuItem: 'Buy Signals',
      render: () => <Tab.Pane attached={false}>
        <Grid centered textAlign="center">
          {!authenticated && (
            <Grid.Row>
              <RegistrationModal setAuthenticated={setAuthenticated} />
            </Grid.Row>
          )}
        </Grid>
      </Tab.Pane>,
    },
  ]

  return (
    <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
  );
}

export default App;

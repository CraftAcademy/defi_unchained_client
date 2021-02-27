import React, { useState} from 'react';
import MarketCapCard from './components/MarketCapCard'
import BuySignals from './components/BuySignals'
import CryptoNews from './components/CryptoNews'
import RegistrationModal from './components/RegistrationModal'
import CryptoCard from './components/CryptoCards'
import './app.css'
import { Grid, Tab, Header, Loader, Dimmer } from 'semantic-ui-react';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false)
  const [active, setActive] = useState(true)

  const panes = [
    {
      menuItem: 'Crypto Info',
      render: () =>
        <Tab.Pane attached={false}>
          <Dimmer.Dimmable as={Grid} centered blurring dimmed={active}>
            <Header className="page-header" data-cy="news-header">Welcome to DeFi Unchained!</Header>
            <Dimmer active={active}>
              <Loader size="large" content='Just a moment!' />
            </Dimmer>
            <Grid.Row columns={2}>
              <MarketCapCard />
            </Grid.Row>
            <Grid.Row columns={3} data-cy="crypto-cards">
              <CryptoCard setActive={setActive} />
            </Grid.Row>
          </Dimmer.Dimmable>
        </Tab.Pane>
    },
    {
      menuItem: 'Crypto News',
      render: () =>
        <Tab.Pane as={Grid} attached={false}>
          <Grid.Row centered>
            <Header textAlign="center" className="page-header" data-cy="news-header">Latest Crypto News</Header>
          </Grid.Row>
          <CryptoNews authenticated={authenticated} />
        </Tab.Pane>,
    },
    {
      menuItem: 'Buy Signals',
      render: () =>
        <Tab.Pane as={Grid} centered attached={false}>
          <Header style={{ marginTop: 25 }} className="page-header" data-cy="news-header">Your Daily Buy Signals!</Header>
          <Grid.Row>
            <BuySignals authenticated={ authenticated}/>
          </Grid.Row>
        </Tab.Pane>,
    },
    {
      menuItem: <RegistrationModal setAuthenticated={setAuthenticated} />
    }
  ]

  return (
    <Tab
      menu={{ secondary: true, pointing: true, color: 'teal' }}
      panes={panes}
      onTabChange={(event) => {
        if (event.target.className === 'item') {
          setActive(true)
        }
      }} />
  );
}

export default App;

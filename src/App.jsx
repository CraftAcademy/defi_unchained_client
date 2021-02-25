import React, {useState} from 'react';
import MarketCapCard from './components/MarketCapCard'
import RegistrationModal from './components/RegistrationModal'
import CryptoCard from './components/CryptoCards'
import './app.css'
import { Grid } from 'semantic-ui-react';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false)

  return (
    <Grid centered textAlign="center">
      <Grid.Row>
        <RegistrationModal setAuthenticated={() => setAuthenticated}/>
        <MarketCapCard />
      </Grid.Row>
      <Grid.Row data-cy="crypto-cards"columns={3}>
        <CryptoCard />
      </Grid.Row>
    </Grid>
  );
}

export default App;

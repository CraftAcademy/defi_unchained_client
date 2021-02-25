import React from 'react';
import MarketCapCard from './components/MarketCapCard'
import './app.css'
import { Grid } from 'semantic-ui-react';

const App = () => {
  return (
    <Grid textAlign="center">
      <Grid.Row>
        <MarketCapCard />
      </Grid.Row>
      <Grid.Row columns={3}>
        
      </Grid.Row>
    </Grid>
  );
}

export default App;

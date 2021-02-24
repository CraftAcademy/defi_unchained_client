import React from 'react';
import MarketCapChart from './components/MarketCapCard'
import './app.css'
import { Grid } from 'semantic-ui-react';

const App = () => {
  return (
    <Grid textAlign="center">
      <Grid.Row>
        <MarketCapChart />
      </Grid.Row>
      <Grid.Row columns={3}>

      </Grid.Row>
    </Grid>
  );
}

export default App;

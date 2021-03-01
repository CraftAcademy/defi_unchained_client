import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css'
import { StripeProvider } from 'react-stripe-elements'

ReactDOM.render(
  <StripeProvider apiKey="pk_test_51IPapBJyUiLtS1gr5qViR2t8WpH4FQHJFr7enjYOzfob6IAsrUq4SbsSOOCfAoQepI3p4cchYVUvV6AkTiauspCK00S1vuyQlB">
    <App />
  </StripeProvider>,
  document.getElementById('root')
);
reportWebVitals();

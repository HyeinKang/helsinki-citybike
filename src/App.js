import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import './App.css';
import CityBikeInfo from './components/CityBikeInfo';

const client = new ApolloClient({
  uri: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <CityBikeInfo />
      </div>
    </ApolloProvider>
  );
}

export default App;

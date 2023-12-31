import React from 'react';
import {SafeAreaView} from 'react-native';
import {Distance} from './src/components/Distance';
import {StarShips} from './src/components/StarShips';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

function App(): React.JSX.Element {
  const client = new ApolloClient({
    uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
    cache: new InMemoryCache(),
  });
  return (
    <SafeAreaView style={{flex: 1}}>
      <ApolloProvider client={client}>
        <>
          <Distance />
          <StarShips />
        </>
      </ApolloProvider>
    </SafeAreaView>
  );
}

export default App;

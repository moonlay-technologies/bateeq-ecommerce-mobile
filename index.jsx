/**
 * @format
 */

import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';
import App from './App';
import { name as appName } from './app.json';

import store from './app/store/store';

export const httpLink = createHttpLink({
  uri: 'https://bateeqshop.myshopify.com/api/2023-04/graphql.json',
  headers: {
    'X-Shopify-storefront-Access-Token': '495ecfe37736105432f1550487fd9028',
  },
});

export const httpLink2 = createHttpLink({
  uri: 'https://bateeqshop.myshopify.com/admin/api/2023-04/graphql.json',
  headers: {
    'X-Shopify-Access-Token': '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',
  },
});

export const cache = new InMemoryCache();

// Create an Apollo Client instance
export const client = new ApolloClient({
  link: ApolloLink.split(operation => operation.getContext().clientName === 'httpLink2', httpLink2, httpLink),

  cache: cache,
})



function ReduxApp() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  );
}

AppRegistry.registerComponent(appName, () => ReduxApp);

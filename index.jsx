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
    'X-Shopify-storefront-Access-Token': '30ed07258afd05535686d2ea2de46442',
    // 'X-Shopify-storefront-Access-Token': '495ecfe37736105432f1550487fd9028',
  },
});

export const httpLink2 = createHttpLink({
  uri: 'https://bateeqshop.myshopify.com/admin/api/2023-04/graphql.json',
  headers: {
    'X-Shopify-Access-Token': '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',
  },
});

export const cache = new InMemoryCache();

export const client = new ApolloClient({
  link: ApolloLink.split(operation => operation.getContext().clientName === 'httpLink2', httpLink2, httpLink),

  cache,
});

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

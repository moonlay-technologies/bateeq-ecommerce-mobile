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
    'X-Shopify-storefront-Access-Token': '113f8b61743a1f3ff681ec38be7ba44a',
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

/**
 * @format
 */

import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink, ApolloLink, Reference } from '@apollo/client';
import App from './App';
import { name as appName } from './app.json';
import store from './app/store';

const httpLink = createHttpLink({
  uri: 'https://bateeqshop.myshopify.com/api/2023-04/graphql.json',
  headers: {
    'X-Shopify-storefront-Access-Token': '495ecfe37736105432f1550487fd9028',
  },
});

const httpLink2 = createHttpLink({
  uri: 'https://bateeqshop.myshopify.com/admin/api/2023-04/graphql.json',
  headers: {
    'X-Shopify-Access-Token': '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',
  },
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        GetProducts: {
          merge: true,
        },
        customer: {
          merge(existing = {}, incoming) {
            const mergedOrders = existing.orders && incoming.orders
              ? [...existing.orders, ...incoming.orders]
              : incoming.orders || existing.orders;

            return {
              ...incoming,
              orders: mergedOrders,
            };
          },
        },
        variants: {
          merge(existing, incoming) {
            if (!existing) return incoming;
            
            // Create a new merged object
            const merged = {
              ...incoming,
              edges: [
                ...(existing.edges || []),
                ...(incoming.edges || [])
              ],
            };

            return merged;
          },
        },
      },
    },
  },
});

// Create an Apollo Client instance
const client = new ApolloClient({
  link: ApolloLink.split(operation => operation.getContext().clientName === 'httpLink2', httpLink2, httpLink),

  cache: cache,
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

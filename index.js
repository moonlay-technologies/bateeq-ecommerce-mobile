/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import store from './app/store';
import {
    ApolloProvider,
    ApolloClient,
    InMemoryCache,
    createHttpLink,
} from "@apollo/client"

const httpLink = createHttpLink({
    uri: 'https://bateeqshop.myshopify.com/api/2023-04/graphql.json',
    headers: {
      'X-Shopify-storefront-Access-Token': '495ecfe37736105432f1550487fd9028',
    },
  });
  
  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
  

const ReduxApp = () => (
    <ApolloProvider client={client}>
        <Provider store={store}>
            <App />
        </Provider>
    </ApolloProvider>
)

AppRegistry.registerComponent(appName, () => ReduxApp);

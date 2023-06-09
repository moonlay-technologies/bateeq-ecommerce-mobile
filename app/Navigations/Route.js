// import React from 'react';
// import {View, Animated} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
// import StackNavigator from './StackNavigator'
// import {SafeAreaProvider} from 'react-native-safe-area-context';
// import Toast from 'react-native-toast-message';
// import SplashScreen from '../components/SplashScreen';

// const Routes = ({ isAuthenticated, setIsAuthenticated }) => {
//   const [showSplashScreen, setShowSplashScreen] = React.useState(true);
//   const fadeAnim = React.useRef(new Animated.Value(1)).current;

//   React.useEffect(() => {
//     setTimeout(() => {
//       Animated.timing(fadeAnim, {
//         toValue: 0,
//         duration: 500,
//         useNativeDriver: true,
//       }).start(() => {
//         setShowSplashScreen(false);
//       });
//     }, 3000);
//   }, []);

//   return (
//     // <ApolloProvider client={client}>
//       <SafeAreaProvider>
//            {showSplashScreen ? (
//         <Animated.View style={{flex: 1, opacity: fadeAnim}}>
//           <SplashScreen />
//         </Animated.View>
//       ) : (
//         <NavigationContainer>
//           <StackNavigator  isAuthenticated={isAuthenticated}
//             setIsAuthenticated={setIsAuthenticated}/>
//         </NavigationContainer>
//           )}
//         <Toast />
//       </SafeAreaProvider>
//     // </ApolloProvider>
//   );
// };
// export default Routes;

import React from 'react';
import {Animated} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import SplashScreen from '../components/SplashScreen';
import {
  ApolloProvider,
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
  split,
} from '@apollo/client';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import store from '../stores/store/configureStore';

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
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

// Create an Apollo Client instance
const client = new ApolloClient({
  link: ApolloLink.split(
    operation => operation.getContext().clientName === 'httpLink2',
    httpLink2,
    httpLink,
  ),

  cache: cache,
});

const Routes = ({isAuthenticated, setIsAuthenticated}) => {
  const [showSplashScreen, setShowSplashScreen] = React.useState(true);
  const fadeAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setShowSplashScreen(false);
      });
    }, 3000);
  }, []);

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <PaperProvider>
          <SafeAreaProvider>
            {showSplashScreen ? (
              <Animated.View style={{flex: 1, opacity: fadeAnim}}>
                <SplashScreen />
              </Animated.View>
            ) : (
              <NavigationContainer>
                <StackNavigator
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                />
              </NavigationContainer>
            )}
            <Toast />
          </SafeAreaProvider>
        </PaperProvider>
      </ApolloProvider>
    </Provider>
  );
};

export default Routes;

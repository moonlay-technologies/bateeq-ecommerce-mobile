import React, { useRef } from 'react';
<<<<<<< HEAD
import { Animated, Linking, View } from 'react-native';
=======
import {Animated, useWindowDimensions, View} from 'react-native';
>>>>>>> df133af4deb0a486e781e99f3c469b2d88d6f20c
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { Provider as PaperProvider } from 'react-native-paper';
import { connect } from 'react-redux';
import SplashScreen from '../components/SplashScreen';
import StackNavigator from './StackNavigator';
import CustomDrawer from './DrawerNavigation';
import { LoadUsers, setToken } from '../store/actions';
import BottomNavigation from './BottomNavigation';
import NavbarCheckoutWidget from "../components/shared-components/checkouts/navbar.checkout.widget";

function Routes({ options, loading, isAuthenticated, isLogin }) {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const screen = useWindowDimensions()

  return (
    <PaperProvider>
      <SafeAreaProvider>
        {loading ? (
          <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
            <SplashScreen />
          </Animated.View>
        ) : (
          <NavigationContainer>
            <View style={{ flex: 1,height:screen.height,width:screen.width,position:"relative" }}>
              <NavbarCheckoutWidget/>
              <CustomDrawer />
              <StackNavigator isAuthenticated={isAuthenticated} />
              <BottomNavigation isAuthenticated={[isAuthenticated, isLogin]} />
            </View>
          </NavigationContainer>
        )}
        <Toast />
      </SafeAreaProvider>
    </PaperProvider>
  );
}

export default connect(
  ({ Auth, User }) => {
    const { isAuthenticated, isLogin } = Auth;

    const { options, loading } = User;
    return { options, isAuthenticated, loading, isLogin };
  },
  { LoadUsers, setToken }
)(React.memo(Routes));

import React, { useEffect, useState, useRef } from 'react';
import {Animated} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import SplashScreen from '../components/SplashScreen';
import {Provider as PaperProvider} from 'react-native-paper';
import { useSelector } from 'react-redux';

const Routes = () => {
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const { isLogin,  } = useSelector(state => state.user)

  useEffect(() => {
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
   
      <PaperProvider>
        <SafeAreaProvider>
          {showSplashScreen ? (
            <Animated.View style={{flex: 1, opacity: fadeAnim}}>
              <SplashScreen />
            </Animated.View>
          ) : (
            <NavigationContainer>
              <StackNavigator
                isAuthenticated={isLogin}
              />
            </NavigationContainer>
          )}
          <Toast />
        </SafeAreaProvider>
      </PaperProvider>

  );
};

export default Routes;

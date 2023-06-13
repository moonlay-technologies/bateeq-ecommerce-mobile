import React, { useEffect, useState, useRef } from 'react';
import {Animated} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import SplashScreen from '../components/SplashScreen';
import {Provider as PaperProvider} from 'react-native-paper';
import {connect, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DrawerNavigation from "./DrawerNavigation";
import BottomNavigation from "./BottomNavigation";

const Routes = (props) => {
  let { isLogin } = props
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  // const { isLogin,  } = useSelector(state => state?.auth.user)

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

  useEffect(() => {
    const checkAccessToken = async () => {
      try {
        if(isLogin){
          const accessToken = await AsyncStorage.getItem('accessToken');
          setIsAuthenticated(!!accessToken);
        }
      
      } catch (error) {
        console.log('Error reading access token from AsyncStorage:', error);
      }
    };
    checkAccessToken();
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
                isAuthenticated={isAuthenticated}
              />
            </NavigationContainer>
          )}
          <Toast />
        </SafeAreaProvider>
      </PaperProvider>

  );
};

export default connect(({Auth})=> {
  let { isLogin } = Auth
  return {isLogin}
},{})(Routes);

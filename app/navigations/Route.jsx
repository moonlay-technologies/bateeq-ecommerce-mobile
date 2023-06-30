import React, { useRef } from 'react';
import { Animated, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { Provider as PaperProvider } from 'react-native-paper';
import { connect } from 'react-redux';
import SplashScreen from '../components/SplashScreen';
import StackNavigator from './StackNavigator';
import CustomDrawer from './DrawerNavigation';
import { LoadUsers, setToken } from '../store/actions/user';
import BottomNavigation from './BottomNavigation';

function Routes({ options, loading, isAuthenticated }) {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  // const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <PaperProvider>
      <SafeAreaProvider>
        {loading ? (
          <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
            <SplashScreen />
          </Animated.View>
        ) : (
          <NavigationContainer>
            <View style={{ flex: 1 }}>
              <CustomDrawer />
              <StackNavigator isAuthenticated={isAuthenticated} />
              <BottomNavigation />
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
    const { isAuthenticated } = Auth;
    const { options, loading } = User;
    return { options, isAuthenticated, loading };
  },
  { LoadUsers, setToken }
)(React.memo(Routes));

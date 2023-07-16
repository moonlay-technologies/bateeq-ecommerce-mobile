import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainHome from '../screens/Home/MainHome';
import Wishlist from '../screens/Wishlist/Wishlist';
import Profile from '../screens/Account/Profile';
import Orders from '../screens/Orders/Orders';
import Cart from '../screens/Cart/Cart';
import CustomBottomNavigation from './CustomBottomNavigation';
import Search from '../screens/Search/Search';

const Tab = createBottomTabNavigator();

function BottomNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
      tabBar={props => <CustomBottomNavigation {...props} />}
    >
      <Tab.Screen name="Home" component={MainHome} />
      <Tab.Screen name="Favourite" component={Wishlist} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Orders" component={Orders} />
      <Tab.Screen name="Account" component={Profile} />
      <Tab.Screen name="Cart" component={Cart} />
    </Tab.Navigator>
  );
}

export default BottomNavigation;

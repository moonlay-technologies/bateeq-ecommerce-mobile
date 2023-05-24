import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainHome from '../Screens/Home/MainHome';
import Wishlist from '../Screens/Wishlist/Wishlist';
import Profile from '../Screens/Account/Profile';
import Orders from '../Screens/Orders/Orders';
import Cart from '../Screens/Cart/Cart';
import CustomBottomNavigation from './CustomBottomNavigation';
import Search from '../Screens/Search/Search';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'Home'}
      tabBar={props => <CustomBottomNavigation {...props} />}>
      <Tab.Screen name="Home" component={MainHome} />
      <Tab.Screen name="Favourite" component={Wishlist} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Orders" component={Orders} />
      <Tab.Screen name="Account" component={Profile} />
      <Tab.Screen name="Cart" component={Cart} />
    </Tab.Navigator>
  );
};

export default BottomNavigation;

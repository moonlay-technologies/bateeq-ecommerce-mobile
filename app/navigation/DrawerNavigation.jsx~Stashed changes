import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';
import BottomNavigation from './BottomNavigation';
import HeaderComponent from '../components/HeaderComponent';

const Drawer = createDrawerNavigator();
function DrawerNavigation() {
  const customDrawer = props => {
    return <CustomDrawer navigation={props.navigation} />;
  };

  return (
    <Drawer.Navigator
      initialRouteName="BottomNavigation"
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={props => customDrawer(props)}
    >
      <Drawer.Screen name="BottomNavigation" component={BottomNavigation} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;

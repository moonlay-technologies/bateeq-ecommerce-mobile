import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';
import BottomNavigation from './BottomNavigation';

const Drawer = createDrawerNavigator();
const DrawerNavigation = props => {
  return (
    <Drawer.Navigator
      initialRouteName="BottomNavigation"
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={props => {
        console.log('props', props.navigation);
        return <CustomDrawer navigation={props.navigation} />;
      }}
    >
      <Drawer.Screen name="BottomNavigation" component={BottomNavigation} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;

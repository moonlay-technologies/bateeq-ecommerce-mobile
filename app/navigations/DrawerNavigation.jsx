import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';
import BottomNavigation from './BottomNavigation';
import HeaderComponent from '../components/HeaderComponent';

const Drawer = createDrawerNavigator();
function DrawerNavigation() {
  const [navigate, setNavigate] = useState({});
  const customDrawer = props => {
    // setNavigate(props);
    return <CustomDrawer navigation={props.navigation} />;
  };
  return (
    <>
      {/* <HeaderComponent navigate={navigate} /> */}
      <Drawer.Navigator
        initialRouteName="BottomNavigation"
        screenOptions={{
          headerShown: false,
        }}
        screenListeners={props => {
          setNavigate(props.navigation);
          console.log('props screenListeners', props);
        }}
        drawerContent={props => customDrawer(props)}
      >
        <Drawer.Screen name="BottomNavigation" component={BottomNavigation} />
      </Drawer.Navigator>
    </>
  );
}

export default DrawerNavigation;

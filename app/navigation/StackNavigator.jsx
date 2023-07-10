import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MenuMasterItem, NotAuthenticatedItem } from './routes/menu-items';

const StackComponent = createNativeStackNavigator();

function StackNavigator({ isAuthenticated }) {
  if (isAuthenticated) {
    return (
      <StackComponent.Navigator
        initialRouteName="Home"
        detachInactiveScreens
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: 'transparent' },
        }}
      >
        {MenuMasterItem?.map(screen => (
          <StackComponent.Screen key={screen.name} name={screen.name} component={screen.component} />
        ))}
      </StackComponent.Navigator>
    );
  }

  return (
    <StackComponent.Navigator
      initialRouteName="Onboarding"
      detachInactiveScreens
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
      }}
    >
      {NotAuthenticatedItem.map(screen => {
        return <StackComponent.Screen key={screen.name} name={screen.name} component={screen.component} />;
      })}
    </StackComponent.Navigator>
  );
}

export default StackNavigator;

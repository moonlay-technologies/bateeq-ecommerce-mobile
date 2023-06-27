import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthScreens, Screens } from './MenuNavigation';

const StackComponent = createNativeStackNavigator();

function StackNavigator({ isAuthenticated }) {
  if (isAuthenticated) {
    return (
      <StackComponent.Navigator
        initialRouteName="DrawerNavigation"
        detachInactiveScreens
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: 'transparent' },
        }}
      >
        {AuthScreens?.map(i => (
          <StackComponent.Screen key={i.name} name={i.name} component={i.component} />
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
      {Screens.map(screen => {
        return <StackComponent.Screen key={screen.name} name={screen.name} component={screen.component} />;
      })}
    </StackComponent.Navigator>
  );
}

export default StackNavigator;

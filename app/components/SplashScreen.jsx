import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Logo from '../assets/images/logo.png';

function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={Logo} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default SplashScreen;

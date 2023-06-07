import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import Loading from '../assets/lotties/Loading.json';
import LoadingCircle from '../assets/lotties/Loading2.json';

function LoadingScreen({ type = '' }) {
  return (
    <View style={styles.container}>
      <LottieView
        source={type === 'circle' ? LoadingCircle : Loading}
        autoPlay
        loop
        speed={1.5}
        style={type === 'circle' ? styles.animation2 : styles.animation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 200,
    height: 200,
  },
  animation2: {
    width: 50,
    height: 50,
  },
});

export default LoadingScreen;

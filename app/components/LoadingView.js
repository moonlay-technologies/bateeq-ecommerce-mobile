import React from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import Loading from '../assets/lotties/Loading.json';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <LottieView source={Loading} autoPlay loop speed={1.5} style={styles.animation} />
    </View>
  );
};

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
});

export default LoadingScreen;

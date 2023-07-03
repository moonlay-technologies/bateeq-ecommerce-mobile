import React from 'react';
import { Dimensions, View, Text, StyleSheet } from 'react-native';

import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS } from '../../../../constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;
function ListItem({ address, simultaneousHandler }) {
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(70);
  const marginVertical = useSharedValue(10);
  const sharedOpacity = useSharedValue(1);
  const panGesture = useAnimatedGestureHandler({
    onActive: e => {
      // store event to translatex
      translateX.value = e.translationX;
      console.log('trasnslatex', translateX.value);
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        sharedOpacity.value = withTiming(0, undefined, isFinished => {
          // check if the animation is finished
          if (isFinished) {
            // ondelete()
            // must add run js
            // runOnJS(onDelete)(*function*)
          }
        });
      } else {
        translateX.value = withTiming(0);
      }

      //   translateX.value = withSpring(0, { damping: 10 });
    },
  });
  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  const rIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0);
    return { opacity };
  });
  const rAddressContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: sharedOpacity.value,
    };
  });

  return (
    <Animated.View style={[styles.addressContainer, rAddressContainerStyle]}>
      <View style={{ width: '100%' }}>
        <Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
          {/* <Text>asd</Text> */}
          <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'blue' }}>
            <FeatherIcon name="edit" size={70 * 0.4} color="yellow" />
            <View style={{ backgroundColor: 'red', justifyContent: 'center', width: 100 }}>
              <FeatherIcon name="trash-2" size={70 * 0.4} color="black" />
            </View>
          </View>
        </Animated.View>
        <GestureHandlerRootView>
          <PanGestureHandler simultaneousHandlers={simultaneousHandler} onGestureEvent={panGesture}>
            <Animated.View style={[styles.address, rStyle]}>
              <Text style={styles.addressTitle}>{address}</Text>
            </Animated.View>
          </PanGestureHandler>
        </GestureHandlerRootView>
      </View>
    </Animated.View>
  );
}

export default ListItem;

const styles = StyleSheet.create({
  addressContainer: {
    width: '100%',
    alignItems: 'center',
    // borderRadius: 10,
    backgroundColor: '#e1e2e3',
  },
  address: {
    width: '100%',
    // width: 300,
    height: 70,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingLeft: 20,
    // borderRadius: 10,
    // shadow for ios
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    // shadow android
    elevation: 5,
  },
  addressTitle: {
    fontSize: 16,
    color: COLORS.title,
  },
  iconContainer: {
    height: 70,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: '10%',
  },
});

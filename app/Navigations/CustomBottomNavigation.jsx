import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, SIZES } from '../constants/theme';
import home from '../assets/images/icons/home.png';
import favourite from '../assets/images/icons/favourite.png';
import search from '../assets/images/icons/search.png';
import user from '../assets/images/icons/user.png';
// import cart from '../assets/images/icons/cart.png';
import receipt from '../assets/images/icons/receipt.png';

function CustomBottomNavigation({ state, descriptors, navigation }) {
  const offset = useSharedValue(0);

  const activeTab = async () => {
    const tabWidth = SIZES.width / state.routes.length;
    offset.value = withTiming(state.index * tabWidth);
  };

  useFocusEffect(
    React.useCallback(() => {
      activeTab();
    }, [state.routes])
  );

  return (
    <View
      style={{
        height: 60,
        borderTopWidth: 1,
        borderColor: COLORS.borderColor,
        backgroundColor: COLORS.white,
        flexDirection: 'row',
        paddingTop: 4,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
          activeTab();
        };

        return (
          <View
            key={index}
            style={{
              width: '20%',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              onPress={onPress}
              style={{
                alignItems: 'center',
                paddingVertical: 9,
              }}
            >
              <Image
                style={{
                  height: 20,
                  width: 20,
                  marginTop: 5,
                  tintColor: isFocused ? COLORS.title : COLORS.dark,
                }}
                source={
                  label === 'Home'
                    ? home
                    : label === 'Favourite'
                    ? favourite
                    : label === 'Search'
                    ? search
                    : label === 'Account'
                    ? user
                    : label === 'Orders' && receipt
                }
              />
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}

export default CustomBottomNavigation;

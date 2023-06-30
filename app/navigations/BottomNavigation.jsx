import React, { useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { useFocusEffect, CommonActions, useNavigation } from '@react-navigation/native';
import { COLORS, SIZES } from '../constants/theme';

import footerMenuItem from './routes/footer-menu-item';

function CustomBottomNavigation() {
  const navigation = useNavigation();
  const offset = useSharedValue(0);
  const [selected, setSelected] = useState('');

  // const activeTab = async () => {
  //   const tabWidth = SIZES.width / state.routes.length;
  //   offset.value = withTiming(state.index * tabWidth);
  // };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     // activeTab();
  //   }, [state.routes])
  // );

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
      {footerMenuItem.map((route, index) => {
        const { icon, name, navigate } = route;

        const isFocused = name === selected;

        const onNavigate = (nav, nm) => {
          setSelected(nm);
          navigation.navigate(`${nav}`);
        };

        //   if (isFocused && route.name === 'Home') {
        //     navigation.dispatch(
        //       CommonActions.reset({
        //         index: 0,
        //         routes: [{ name: 'Home' }],
        //       })
        //     );
        //   } else {
        //     const event = navigation.emit({
        //       type: 'tabPress',
        //       target: route.key,
        //       canPreventDefault: true,
        //     });

        //     if (!isFocused && !event.defaultPrevented) {
        //       navigation.navigate({ name: route.name, merge: true });
        //     }
        //   }
        // };

        return (
          <View
            key={name}
            style={{
              width: '25%',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              onPress={() => onNavigate(navigate, name)}
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
                source={icon}
              />
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}

export default CustomBottomNavigation;

import React, { useEffect } from 'react';

import { Image, Text, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import FeatherIcon from 'react-native-vector-icons/Feather';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { connect, useDispatch } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import { COLORS, FONTS, IMAGES } from '../constants/theme';

import { CartGetList } from '../store/actions';
import { setCartId } from '../store/reducer';

function CustomDrawer({ navigation, customerInfo, options, isOpen, ...props }) {
  const { cartId, CartGetList } = props;
  const sidebarAnimation = new Animated.Value(0);
  const dispatch = useDispatch();
  const AnimatedView = Animated.createAnimatedComponent(View);
  // useEffect(() => {
  //   Animated.timing(sidebarAnimation, {
  //     toValue: isOpen ? 1 : 0,
  //     duration: 300,
  //     useNativeDriver: true,
  //   }).start();
  // }, [isOpen]);

  const navItem = [
    {
      icon: 'home',
      name: 'Home',
      navigate: 'Home',
      onPress: async () => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })
        );
        navigation.closeDrawer();
      },
    },
    // {
    //   icon: 'heart',
    //   name: 'Wishlist',
    //   navigate: 'Favourite',
    // },
    {
      icon: 'repeat',
      name: 'Orders',
      navigate: 'Orders',
    },
    {
      icon: 'shopping-cart',
      name: 'My Cart',
      navigate: 'Cart',
      onPress: () => {
        CartGetList({
          first: 10,
          last: 0,
          id: cartId,
        });
        navigation.navigate('Cart');
        navigation.closeDrawer();
      },
    },
    {
      icon: 'user',
      name: 'Profile',
      navigate: 'Account',
    },
    {
      icon: 'log-out',
      name: 'Logout',
      navigate: 'SignIn',
      onPress: async () => {
        await AsyncStorage.removeItem('accessToken').then(() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'SignIn' }],
            })
          );
          dispatch(setCartId(''));
        });
      },
    },
  ];

  return (
    <AnimatedView
      style={
        isOpen
          ? {
              width: '75%',
              flex: 1,
              backgroundColor: COLORS.white,
              position: 'fixed',
              zIndex: 999,
              transform: [
                {
                  translateX: sidebarAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-300, 0],
                  }),
                },
              ],
              duration: 300,
            }
          : { width: 0 }
      }
    >
      {options?.loading ? (
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 20,
            paddingVertical: 20,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.borderColor,
            marginBottom: 10,
          }}
        >
          <Text>Loading...</Text>
        </View>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 20,
            paddingVertical: 20,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.borderColor,
            marginBottom: 10,
          }}
        >
          <Image
            style={{
              height: 50,
              width: 50,
              marginRight: 10,
              borderRadius: 50,
            }}
            source={IMAGES.user}
          />

          <View style={{ flex: 1 }}>
            <Text
              style={{
                ...FONTS.fontSatoshiBold,
                fontSize: 18,
                color: COLORS.title,
                top: 2,
              }}
            >
              {`${options?.info?.firstName ?? '-'} ${options?.info?.lastName ?? '-'}`}
            </Text>

            <Text style={{ ...FONTS.fontSatoshiRegular, color: 'rgba(0,0,0,.6)' }}>{options?.info?.email ?? '-'}</Text>
          </View>
        </View>
      )}

      <View style={{ flex: 1 }}>
        {navItem.map((data, index) => {
          return (
            <TouchableOpacity
              onPress={
                data?.onPress
                  ? data?.onPress
                  : async () => {
                      if (
                        // data.navigate == 'Home' ||
                        // data.navigate == 'Cart' ||
                        data.navigate === 'Account' ||
                        data.navigate === 'Favourite' ||
                        data.navigate === 'Orders'
                      ) {
                        navigation.navigate('BottomNavigation', {
                          screen: data.navigate,
                        });
                      }
                      // else {
                      //   navigation.navigate(data.navigate);
                      // }

                      navigation.closeDrawer();
                    }
              }
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 20,
                paddingVertical: 12,
              }}
            >
              <View style={{ marginRight: 15 }}>
                <FeatherIcon name={data.icon} color="rgba(0,0,0,.3)" size={20} />
              </View>
              <Text
                style={{
                  ...FONTS.fontSatoshiBold,
                  color: COLORS.title,
                  opacity: 0.8,
                  flex: 1,
                }}
              >
                {data.name}
              </Text>
              <FeatherIcon size={16} color={COLORS.text} name="chevron-right" />
            </TouchableOpacity>
          );
        })}
      </View>

      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 30,
          marginTop: 10,
        }}
      >
        <Text
          style={{
            ...FONTS.fontSatoshiLight,
            fontSize: 20,
            color: COLORS.title,
            marginBottom: 6,
          }}
        >
          bateeq
        </Text>
        <Text style={{ ...FONTS.fontSatoshiRegular, color: 'rgba(0,0,0,.5)' }}>App Version 1.0</Text>
      </View>
    </AnimatedView>
  );
}

export default connect(
  ({ User, Cart }) => {
    const { options } = User;
    const { cartId } = Cart.options;
    return {
      options,
      CustomDrawer: options?.info,
      cartId,
    };
  },
  { CartGetList }
)(CustomDrawer);

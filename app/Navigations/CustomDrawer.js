import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTS, IMAGES} from '../constants/theme';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';

const CustomDrawer = ({navigation}) => {
  const {customerInfo} = useSelector(state => state?.user);

  const navItem = [
    {
      icon: 'home',
      name: 'Home',
      navigate: 'Home',
    },
    {
      icon: 'heart',
      name: 'Wishlist',
      navigate: 'Favourite',
    },
    {
      icon: 'repeat',
      name: 'Orders',
      navigate: 'Orders',
    },
    {
      icon: 'shopping-cart',
      name: 'My Cart',
      navigate: 'Cart',
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
    },
  ];

  return (
    <>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 20,
            paddingVertical: 20,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.borderColor,
            marginBottom: 10,
          }}>
          <Image
            style={{
              height: 50,
              width: 50,
              marginRight: 10,
              borderRadius: 50,
            }}
            source={IMAGES.user}
          />
          <View style={{flex: 1}}>
            <Text
              style={{
                ...FONTS.fontSatoshiBold,
                fontSize: 18,
                color: COLORS.title,
                top: 2,
              }}>
              {customerInfo?.firstName || customerInfo?.first_name} {customerInfo?.lastName || customerInfo?.last_name}
            </Text>
            <Text
              style={{...FONTS.fontSatoshiRegular, color: 'rgba(0,0,0,.6)'}}>
              {customerInfo?.email}
            </Text>
          </View>
        </View>

        <View style={{flex: 1}}>
          {navItem.map((data, index) => {
            return (
              <TouchableOpacity
                onPress={async () => {
                  if (
                    data.navigate == 'Home' ||
                    data.navigate == 'Cart' ||
                    data.navigate == 'Account' ||
                    data.navigate == 'Favourite' ||
                    data.navigate == 'Orders'
                  ) {
                    navigation.navigate('BottomNavigation', {
                      screen: data.navigate,
                    });
                  } else if (data.navigate == 'Logout') {
                    await AsyncStorage.removeItem('accessToken');
                  } else {
                    navigation.navigate(data.navigate);
                  }
                  navigation.closeDrawer();
                }}
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                  paddingVertical: 12,
                }}>
                <View style={{marginRight: 15}}>
                  <FeatherIcon
                    name={data.icon}
                    color={'rgba(0,0,0,.3)'}
                    size={20}
                  />
                </View>
                <Text
                  style={{
                    ...FONTS.fontSatoshiBold,
                    color: COLORS.title,
                    opacity: 0.8,
                    flex: 1,
                  }}>
                  {data.name}
                </Text>
                <FeatherIcon
                  size={16}
                  color={COLORS.text}
                  name="chevron-right"
                />
              </TouchableOpacity>
            );
          })}
        </View>

        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 30,
            marginTop: 10,
          }}>
          <Text
            style={{
              ...FONTS.fontSatoshiLight,
              fontSize: 20,
              color: COLORS.title,
              marginBottom: 6,
            }}>
            bateeq
          </Text>
          <Text style={{...FONTS.fontSatoshiRegular, color: 'rgba(0,0,0,.5)'}}>
            App Version 1.0
          </Text>
        </View>
      </View>
    </>
  );
};

export default CustomDrawer;

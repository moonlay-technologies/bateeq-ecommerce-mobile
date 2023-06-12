import React from 'react';
import {
  SafeAreaView,
  // ScrollView,
  View,
  Text,
} from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';
import Header from '../../components/HeaderComponent';

function Wishlist() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
      }}
    >
      <Header />
      <Text
        style={{
          ...FONTS.fontSatoshiBold,
          fontSize: 24,
          color: COLORS.title,
          padding: 20,
        }}
      >
        Favourite
      </Text>
      <View style={{ justifyContent: 'center', alignItems: 'center', height: '70%' }}>
        <Text
          style={{
            ...FONTS.fontSatoshiBold,
            color: COLORS.title,
            marginTop: 5,
            textAlign: 'center',
          }}
        >
          Under Maintenace, OnProgress . . .
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default Wishlist;

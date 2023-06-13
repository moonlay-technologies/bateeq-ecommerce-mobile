import React from 'react';
import { Image, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { FONTS, IMAGES } from '../constants/theme';

function UserInfo() {
  const { customerInfo } = useSelector(state => state.user);
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
      }}
    >
      <Image
        style={{
          height: 80,
          width: 90,
          borderRadius: 5,
          marginRight: 15,
        }}
        source={IMAGES.user}
      />
      <View
        style={{
          flex: 1,
          marginTop: 20,
        }}
      >
        <Text style={{ ...FONTS.h6 }}>{`${customerInfo?.first_name} ${customerInfo?.last_name}` || ''}</Text>
        <Text style={{ ...FONTS.font }}>{customerInfo?.email || ''}</Text>
        <Text style={{ ...FONTS.font }}>{customerInfo?.phone || ''}</Text>
      </View>
    </View>
  );
}

export default UserInfo;

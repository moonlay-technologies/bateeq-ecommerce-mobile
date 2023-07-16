import React from 'react';
import { Image, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { FONTS, IMAGES } from '../constants/theme';

function UserInfo({ ...props }) {
  let { options } = props;
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
        <Text style={{ ...FONTS.h6 }}>{`${options?.info?.firstName} ${options?.info?.lastName}` || ''}</Text>
        <Text style={{ ...FONTS.font }}>{options?.info?.email || ''}</Text>
        <Text style={{ ...FONTS.font }}>{options?.info?.phone || ''}</Text>
      </View>
    </View>
  );
}

export default connect(({ User }) => {
  let { options, collections } = User;
  return { options, collections };
}, {})(React.memo(UserInfo));

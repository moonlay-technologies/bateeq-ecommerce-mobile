import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {formatWithCommas} from '../utils/helper';
import {COLORS, FONTS} from '../constants/theme';

const ProductCardStyle1 = ({
  imageSrc,
  title,
  price,
  oldPrice,
  offer,
  onPress,
  asset,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={
        {
          // borderWidth: 1,
          // borderColor: COLORS.borderColor,
          // borderRadius: 8,
        }
      }>
      <Image
        style={{
          width: '100%',
          height: undefined,
          aspectRatio: 80 / 120,
          //   borderTopLeftRadius: 6,
          //   borderTopRightRadius: 6,
        }}
        source={{uri: imageSrc}}
      />
      <View
        style={{
          // paddingHorizontal: 10,
          paddingVertical: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          numberOfLines={1}
          style={{
            ...FONTS.font,
            fontSize: 11,
            ...FONTS.fontBold,
            color: COLORS.title,
          }}>
          {title}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: -3,
          }}>
          <Text
            style={{
              ...FONTS.font,
              fontSize: 10,
              ...FONTS.fontSatoshiBold,
              color: COLORS.success,
            }}>
            {offer}
          </Text>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}>
            {oldPrice > 0 && (
              <Text
                style={{
                  ...FONTS.font,
                  fontSize: 10,
                  textDecorationLine: 'line-through',
                  textDecorationStyle: 'solid',
                  marginLeft: 5,
                  marginRight: 5,
                }}>
                Rp {formatWithCommas(Number(oldPrice).toLocaleString())}
              </Text>
            )}
            <Text
              style={{
                ...FONTS.font,
                fontSize: 14,
                ...FONTS.fontSatoshiBold,
                color: COLORS.title,
              }}>
              Rp {formatWithCommas(Number(price).toLocaleString())}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCardStyle1;

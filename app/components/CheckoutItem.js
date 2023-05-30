import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {COLORS, FONTS} from '../constants/theme';

const CheckoutItem = ({
  image,
  title,
  price,
  originalPrice,
  quantity,
  size,
  onPress,
}) => {
  const [itemQuantity, setItemQuantity] = useState(quantity || 1);
  console.log('originalPrice', originalPrice)
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={{
        flexDirection: 'row',
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderColor,
        paddingBottom: 15,
        paddingTop: 15,
      }}
    >
      <Image
        style={{ height: 120, width: 80, marginRight: 12}}
        source={image}
      />
      <View style={{flex: 1, paddingVertical: 7}}>
        <Text
          numberOfLines={1}
          style={{
            ...FONTS.fontSatoshiBold,
            color: COLORS.title,
            marginBottom: 4,
            fontSize: 16,
          }}>
          {title}
        </Text>
        <Text
          numberOfLines={1}
          style={{...FONTS.fontSatoshiRegular, color: '#BCBCBC'}}>
          Size:{' '}
          <Text style={{color: COLORS.title, ...FONTS.fontSatoshiBold}}>
            {size}
          </Text>
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 12,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
            }}>
            <Text style={{...FONTS.h6}}>{price}</Text>
            <Text
              style={{
                ...FONTS.fontSm,
                textDecorationLine: 'line-through',
                marginLeft: 8,
              }}>
              {originalPrice}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() =>
              itemQuantity > 1 && setItemQuantity(itemQuantity - 1)
            }
            style={{
              height: 32,
              width: 30,
              borderWidth: 1,
              // borderRadius:6,
              borderColor: COLORS.borderColor,
              backgroundColor: '#AAAAAA',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FeatherIcon size={14} color={COLORS.white} name="minus" />
          </TouchableOpacity>
          <Text
            style={{
              ...FONTS.fontSatoshiBold,
              color: COLORS.title,
              width: 120,
              textAlign: 'center',
              borderWidth: 1,
              marginHorizontal: 8,
              paddingVertical: 5,
              paddingHorizontal: 50,
            }}>
            {itemQuantity}
          </Text>
          <TouchableOpacity
            onPress={() => setItemQuantity(itemQuantity + 1)}
            style={{
              height: 32,
              width: 30,
              borderWidth: 1,
              // borderRadius:6,
              backgroundColor: '#303030',
              borderColor: COLORS.borderColor,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FeatherIcon size={14} color={COLORS.white} name="plus" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CheckoutItem;

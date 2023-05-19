import React from 'react';
import {Image, Text, View} from 'react-native';
import {COLORS, FONTS} from '../constants/theme';

const CartItem = ({
  productId,
  image,
  title,
  quantity,
  size,
  status,
  // desc,
  date,
}) => {
  return (
    <View style={{flex: 1, paddingHorizontal: 15, marginVertical: 20}}>
      <View
        style={{
          paddingVertical: 20,
          paddingHorizontal: 10,
          borderWidth: 1,
          borderColor: '#AAAAAA',
          borderRadius: 10,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{...FONTS.fontSatoshiBold, color: COLORS.title}}>
            {date}
          </Text>
          <Text style={{...FONTS.fontSatoshiBold, color: COLORS.title}}>
            {productId}
          </Text>
        </View>
        <View
          activeOpacity={0.9}
          style={{
            flexDirection: 'row',
            paddingHorizontal: 15,
            paddingBottom: 15,
            paddingTop: 15,
          }}>
          <Image
            style={{
              height: 120,
              width: 80,
              // borderRadius:8,
              marginRight: 12,
            }}
            source={image}
          />
          <View style={{flex: 1, paddingBottom: 7}}>
            <Text
              numberOfLines={1}
              style={{
                ...FONTS.fontSatoshiBold,
                color: COLORS.title,
                // marginBottom: 4,
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
            <Text style={{...FONTS.fontSatoshiRegular, marginTop: 20}}>
              Qty:{' '}
              <Text style={{color: COLORS.title, ...FONTS.fontSatoshiBold}}>
                {quantity}
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
                <Text style={{...FONTS.fontSatoshiRegular}}>
                  {quantity > 1 ? 'and +1 item more' : null}
                </Text>
                {/*<Text
                style={{
                  ...FONTS.fontSm,
                  textDecorationLine: 'line-through',
                  marginLeft: 8,
                }}>
                {oldPrice}
              </Text> */}
              </View>
            </View>
            {/* <View
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
          </View> */}
            {/* <View style={{flexDirection:'row',alignItems:'center'}}>
                      <Text style={{...FONTS.h6,marginRight:15}}>{price}</Text>
                      <Text style={{...FONTS.fontXs,textDecorationLine:'line-through'}}>{oldPrice}</Text>
                  </View> */}
          </View>
        </View>
        <View
          style={{
            borderWidth: 1,
            paddingVertical: 10,
            borderRadius: 10,
            borderColor:
              status === 'Confirmed'
                ? '#FFE600'
                : status === 'Canceled'
                ? '#FFB8B8'
                : '#659C5C',
            backgroundColor:
              status === 'Confirmed'
                ? '#FFFDE7'
                : status === 'Canceled'
                ? '#FFB8B8'
                : '#EDFFEA',
          }}>
          <Text
            style={{
              textAlign: 'center',
              ...FONTS.fontSatoshiBold,
              fontSize: 16,
              color:
                status === 'Confirmed'
                  ? '#FF8A00'
                  : status === 'Canceled'
                  ? '#FF3544'
                  : '#4F7E48',
            }}>
            {status}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CartItem;

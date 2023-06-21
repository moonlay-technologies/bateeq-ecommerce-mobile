import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';
import moment from 'moment/moment';
import { useNavigation } from '@react-navigation/native';

function CartItem({
  orderId,
  // productId,
  // image,
  orderName,
  // title,
  // quantity,
  // size,
  status,
  // desc,
  date,
}) {
  const dateOrders = moment(date);
  const navigation = useNavigation();
  const formattedDate = dateOrders.format('MMMM Do YYYY');

  const handleClick = () => {
    navigation.navigate('OrderDetail', { orderId: orderId });
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 15, marginVertical: 20 }}>
      <TouchableOpacity
        style={{
          paddingVertical: 20,
          paddingHorizontal: 10,
          borderWidth: 1,
          borderColor: '#AAAAAA',
          borderRadius: 10,
        }}
        onPress={handleClick}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ ...FONTS.fontSatoshiBold, color: COLORS.title }}>{formattedDate}</Text>
          {/* <Text style={{ ...FONTS.fontSatoshiBold, color: COLORS.title }}>{productId || 'NO SKU'}</Text> */}
        </View>
        <View
          style={{
            flex: 1,
            paddingBottom: 15,
            paddingTop: 15,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text>Order: </Text>
          <Text
            numberOfLines={1}
            style={{
              ...FONTS.fontSatoshiBold,
              color: COLORS.title,
              fontSize: 16,
            }}
          >
            {orderName}
          </Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            paddingVertical: 10,
            borderRadius: 10,
            borderColor: status === 'PENDING' ? '#FFE600' : status === 'EXPIRED' ? '#FFB8B8' : '#659C5C',
            backgroundColor: status === 'PENDING' ? '#FFFDE7' : status === 'EXPIRED' ? '#FFB8B8' : '#EDFFEA',
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              ...FONTS.fontSatoshiBold,
              fontSize: 16,
              color: status === 'PENDING' ? '#FF8A00' : status === 'EXPIRED' ? '#FF3544' : '#4F7E48',
            }}
          >
            {status === 'PAID' ? 'COMPLETE' : status === 'PENDING' ? 'CONFIRM' : 'CANCELED'}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default CartItem;

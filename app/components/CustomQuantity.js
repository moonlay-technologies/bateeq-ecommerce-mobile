import React, {useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {COLORS, FONTS} from '../constants/theme';
const Quantity = ({title, textStyle, wrapperQuantity}) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = action => {
    if (action === 'add') {
      setQuantity(quantity + 1);
    } else if (action === 'subtract' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <View
      style={[
        {
          flexDirection: 'column',
          // alignItems: 'left',
        },
        wrapperQuantity,
      ]}>
      <Text
        style={{
          ...FONTS.fontSatoshiBold,
          fontSize: 16,
          marginBottom: 10,
        }}>
        {title || ''}
      </Text>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableOpacity
          onPress={() => handleQuantityChange('subtract')}
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            backgroundColor: 'gray',
            paddingVertical: 10,
            paddingHorizontal: 20,
          }}>
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.fontSatoshiRegular,
            }}>
            -
          </Text>
        </TouchableOpacity>
        <Text
          style={[
            {
              ...FONTS.fontSatoshiBold,
              fontSize: 16,
              marginHorizontal: 10,
              paddingVertical: 10,
              borderColor: COLORS.title,
              borderWidth: 1,
            },
            textStyle,
          ]}>
          {quantity}
        </Text>
        <TouchableOpacity
          onPress={() => handleQuantityChange('add')}
          style={{
            borderWidth: 1,
            borderColor: COLORS.title,
            backgroundColor: COLORS.title,
            paddingVertical: 10,
            paddingHorizontal: 20,
          }}>
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.fontSatoshiRegular,
            }}>
            +
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Quantity;

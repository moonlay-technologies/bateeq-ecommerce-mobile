import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {COLORS, FONTS} from '../constants/theme';
import { useDispatch } from 'react-redux';
import { setCartData } from '../store/reducer';
import { GqlCart } from '../service/graphql/mutation/cart';
import { useMutation } from '@apollo/client';
import { CART_PUT_QTY } from '../graphql/mutation';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const CartList = ({
  image,
  title,
  price,
  originalPrice,
  quantity,
  size,
  onPress,
  lineId,
  cartId,
  attributes,
  addComponent,
  merchandiseId,
  isChange,
  refreshCartData,
  setIsChange,
  withIncrementDecrement=false,
  showQuantity
}) => {
  const dispatch = useDispatch()
  const [cartLinesUpdate] = useMutation(CART_PUT_QTY)
  const [itemQuantity, setItemQuantity] = useState(quantity);
  
  const handleQuantity = async (type) => {
    let qty;
    const body = {
      isChange: true,
      cartId,
      attributes,
      lineId:lineId,
    }
    if(type === 'de' && itemQuantity > 0 ) {
      const decrement = itemQuantity - 1
      setItemQuantity(decrement)
      dispatch(setCartData({
        body,
        quantity: decrement
      }))
      qty = decrement
    } 
    if(type === 'in') {
      const increment = itemQuantity + 1
      setItemQuantity(itemQuantity + 1)
      dispatch(setCartData({
        body,
        quantity: increment
      }))
      qty = increment
    }
    // console.log('variabess', {variables:{
    //   cartId: cartId,
    //   lines: [{
    //     attributes,
    //     id: lineId,
    //     merchandiseId,
    //     quantity: qty
    //   }]
    // }})
    const { data, errors } = await cartLinesUpdate({ variables:{
      cartId: cartId,
      lines: [{
        attributes,
        id: lineId,
        merchandiseId,
        quantity: qty
      }]
    }}) 
    if(data?.cartLinesUpdate) {
      const {cart, userErrors} = data?.cartLinesUpdate 
      if(userErrors && userErrors.length > 0) {
        Toast.show({
          type: 'error',
          text1: 'oops!',
          text2: userErrors[0]?.message || 'something went wrong'
        })
      } else {
        refreshCartData()
      }
      setIsChange(!isChange)
    }
  }

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
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between' ,
        }}>
          <View>
            <Text
              numberOfLines={1}
              style={{...FONTS.fontSatoshiRegular, color: '#BCBCBC',}}>
              Size:{' '}
              <Text style={{color: COLORS.title, ...FONTS.fontSatoshiBold}}>
                {size}
              </Text>
            </Text>
             {showQuantity && <Text
              numberOfLines={1}
              style={{...FONTS.fontSatoshiRegular, color: '#BCBCBC',}}>
              Qty:{' '}
              <Text style={{color: COLORS.title, ...FONTS.fontSatoshiBold}}>
                {quantity}
              </Text>
            </Text> }
          </View>
            {addComponent && (
              <View style={{
                marginRight: 20,
              }}>
                {addComponent}
              </View>)}
         </View>
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
        {withIncrementDecrement && <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => handleQuantity('de' )}
            style={{
              height: 32,
              width: 30,
              borderWidth: 1,
              // borderRadius:6,
              borderColor: COLORS.borderColor,
              backgroundColor: '#AAAAAA',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            disabled={itemQuantity === 0}>
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
            onPress={() => handleQuantity('in')}
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
         </View> }
        </View> 
    </TouchableOpacity>
  );
};

export default CartList;

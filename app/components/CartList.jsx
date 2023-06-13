import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {connect} from 'react-redux';
import { COLORS, FONTS } from '../constants/theme';
import {CartPutQtyItem} from "../store/actions";
import { Toast } from 'react-native-toast-message/lib/src/Toast';

function CartList({
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
  withIncrementDecrement = false,
  showQuantity,
...props}) {
    let { CartPutQtyItem,options,lists } = props
    /**
     * @param {CartLineInput} item
     * @returns {Promise<void>}
     */
  const onQtyUpdate = (item)=> {
      if(item?.quantity > 0){
          CartPutQtyItem({
              variables: {
                  cartId: cartId,
                  lines: [
                      {
                          ...item
                      }
                  ]
              }
          })
      }else{
          Toast.show({
                      type: 'error',
                      text1: 'oops!',
                      text2: 'quantity must be higher than 0',
                    });
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
      <Image style={{ height: 120, width: 80, marginRight: 12 }} source={image} />
      <View style={{ flex: 1, paddingVertical: 7 }}>
        <Text
          numberOfLines={1}
          style={{
            ...FONTS.fontSatoshiBold,
            color: COLORS.title,
            marginBottom: 4,
            fontSize: 16,
          }}
        >
          {title}
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View>
            <Text numberOfLines={1} style={{ ...FONTS.fontSatoshiRegular, color: '#BCBCBC' }}>
              Size: <Text style={{ color: COLORS.title, ...FONTS.fontSatoshiBold }}>{size}</Text>
            </Text>
            {showQuantity && (
              <Text numberOfLines={1} style={{ ...FONTS.fontSatoshiRegular, color: '#BCBCBC' }}>
                Qty: 
{' '}
<Text style={{ color: COLORS.title, ...FONTS.fontSatoshiBold }}>{quantity}</Text>
              </Text>
            )}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 12,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
            }}
          >
            <Text style={{ ...FONTS.h6 }}>{price}</Text>
            <Text
              style={{
                ...FONTS.fontSm,
                textDecorationLine: 'line-through',
                marginLeft: 8,
              }}
            >
              {originalPrice}
            </Text>
          </View>
        </View>
        {withIncrementDecrement && (
            <View
                style={{
                    flex:1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent:'space-between'
                }}
            >
                <View style={{
                    flex:1,
                    flexDirection:'row',
                    alignItems:'center',
                }}>
                    <TouchableOpacity
                        onPress={() => onQtyUpdate({
                            attributes:attributes,
                            merchandiseId,
                            id:lineId,
                            quantity: quantity > 1 ? quantity - 1 : quantity
                        })}
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
                        disabled={quantity === 0}
                    >
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
                        }}
                    >
                        {quantity}
                    </Text>
                    <TouchableOpacity
                        onPress={() =>
                            onQtyUpdate({
                                attributes:attributes,
                                merchandiseId,
                                id:lineId,
                                quantity: quantity > 0 ? quantity + 1 : quantity
                            })}
                        style={{
                            height: 32,
                            width: 30,
                            borderWidth: 1,
                            backgroundColor: '#303030',
                            borderColor: COLORS.borderColor,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <FeatherIcon size={14} color={COLORS.white} name="plus" />
                    </TouchableOpacity>
                </View>
                {addComponent && (
                    <View>
                        {addComponent}
                    </View>
                )}
            </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default connect(({Cart})=> {
    let { options,lists } = Cart
    return {
        cartId: options?.cartId,
        lists,
        options
    }
},{CartPutQtyItem})(React.memo(CartList));

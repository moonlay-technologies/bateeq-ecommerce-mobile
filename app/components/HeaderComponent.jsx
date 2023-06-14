import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import {connect, useSelector} from 'react-redux';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { GET_TOTAL_QUANTITY_CART } from '../graphql/queries';
import { COLORS, FONTS } from '../constants/theme';
import Logo from '../assets/images/logo.png';
import MenuListHeader from './ListMenuHeader';
import {CartPutTotalQty} from "../store/actions";

function HeaderComponent({
  icon = '',
  title,
  backAction,
  withoutCartAndLogo,
  dataPageStory,
  showListMenu,
  dataListMenu,
    options,
    ...props
}) {

    let { CartPutTotalQty } = props


  const navigation = useNavigation();
  const { data: cartData } = useQuery(GET_TOTAL_QUANTITY_CART, {
    variables: {
        id: options?.cartId
    },
  });

    useEffect(()=> {
        if(cartData) {
            CartPutTotalQty({totalQuantity:cartData?.cart?.totalQuantity})
        }
    },[cartData])

  const handlePress = () => {
    navigation.navigate('Home');
  };

  const leftIcon = (i, title) => {
    if (i === 'back') {
      return <MaterialIcons name="keyboard-backspace" leftIcon="back" title="Back" color="#4E4E4E" size={24} />;
    }

    return (
      <View
        style={{
          height: 30,
          width: 30,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 8,
        }}
      >
        <FeatherIcon color={COLORS.title} size={18} name="menu" />
      </View>
    );
  };
  const rightIcon = () => {
    return (
      <View>
        {/*<FeatherIcon color={COLORS.title} size={20} name="shopping-bag" />*/}
          {
              options?.loading ? <Text style={{fontSize:10}}>Loading...</Text> : (
                  <IconButton
                      onPress={() => navigation.navigate('Cart')}
                      icon={() => (
                          <View>
                              <FeatherIcon color={COLORS.title} size={20} name="shopping-bag" />
                              {options?.totalQuantity > 0 && <View
                                  style={{
                                      height: 14,
                                      width: 14,
                                      borderRadius: 14,
                                      backgroundColor: COLORS.primary,
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      position: 'absolute',
                                      top: -4,
                                      right: -6,
                                  }}>
                                  <Text
                                      style={{...FONTS.fontXs, fontSize: 10, color: COLORS.white}}>
                                      {options?.totalQuantity}
                                  </Text>
                              </View> }
                          </View>
                      )}
                      size={25}
                  />
              )
          }
        {/*{cartQuantity > 0 && (*/}
        {/*  <View*/}
        {/*    style={{*/}
        {/*      height: 14,*/}
        {/*      width: 14,*/}
        {/*      borderRadius: 14,*/}
        {/*      backgroundColor: COLORS.primary,*/}
        {/*      alignItems: 'center',*/}
        {/*      justifyContent: 'center',*/}
        {/*      position: 'absolute',*/}
        {/*      top: -4,*/}
        {/*      right: -6,*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    <Text style={{ ...FONTS.fontXs, fontSize: 10, color: COLORS.white }}>{cartQuantity}</Text>*/}
        {/*  </View>*/}
        {/*)}*/}
      </View>
    );
  };

  return (
    <View>
      <View
        style={{
          ...(title ? { marginLeft: -5, marginTop: 5 } : { justifyContent: 'space-between' }),
          flexDirection: 'row',
          alignItems: 'center',
          height: 45,
        }}
      >
        <IconButton
          icon={() => leftIcon(icon, title)}
          size={25}
          onPress={() => (backAction ? navigation.goBack() : navigation.openDrawer())}
        />
        {title && (
          <Text
            style={{
              ...FONTS.fontSatoshiBold,
              color: COLORS.title,
              fontSize: 17,
              ...FONTS.h6,
              top: 1,
              textAlign: 'left',
            }}
          >
            {title}
          </Text>
        )}
        {!withoutCartAndLogo && (
          <>
            <TouchableOpacity onPress={handlePress}>
              <Image style={{ width: 70, height: 35 }} source={Logo} />
            </TouchableOpacity>

            <IconButton onPress={() => navigation.navigate('Cart')} icon={() => rightIcon()} size={25} />
          </>
        )}
      </View>
      {showListMenu && (
        <View>
          <MenuListHeader dataListMenu={dataListMenu} dataStory={dataPageStory} />
        </View>
      )}
    </View>
  );
}

export default connect(({Cart})=> {
    let {options} = Cart
    return { options }
},{CartPutTotalQty})(React.memo(HeaderComponent));

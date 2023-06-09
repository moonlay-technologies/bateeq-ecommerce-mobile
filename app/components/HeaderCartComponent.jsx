import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { GET_TOTAL_QUANTITY_CART } from '../graphql/queries';
import { COLORS, FONTS } from '../constants/theme';

function HeaderCartComponent() {
  const navigation = useNavigation();
  const [cartQuantity, setCartQuantity] = useState(0);
  const cart = useSelector(state => state.cart);
  const { data: cartData } = useQuery(GET_TOTAL_QUANTITY_CART, {
    variables: {
      id: cart?.id,
    },
  });

  useEffect(() => {
    if (cartData) {
      setCartQuantity(cartData?.cart?.totalQuantity);
    }
  }, []);

  const handlePress = () => {
    navigation.navigate('Home');
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 45,
        justifyContent: 'space-between',
      }}
    >
      <IconButton
        icon={() => (
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
        )}
        size={25}
        onPress={() => navigation.openDrawer()}
        // onPress={handleDrawer}
      />
      <TouchableOpacity onPress={handlePress}>
        <Image style={{ width: 70, height: 35 }} source={require('../assets/images/logo.png')} />
      </TouchableOpacity>
      <IconButton
        onPress={() => navigation.navigate('Cart')}
        icon={() => (
          <View>
            <FeatherIcon color={COLORS.title} size={20} name="shopping-bag" />
            {cartQuantity > 0 && (
              <View
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
                }}
              >
                <Text style={{ ...FONTS.fontXs, fontSize: 10, color: COLORS.white }}>{cartQuantity}</Text>
              </View>
            )}
          </View>
        )}
        size={25}
      />
    </View>
  );
}

export default HeaderCartComponent;

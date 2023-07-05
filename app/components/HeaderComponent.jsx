import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { connect } from 'react-redux';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { GET_TOTAL_QUANTITY_CART } from '../graphql/queries';
import { COLORS, FONTS } from '../constants/theme';
import Logo from '../assets/images/logo.png';
import { CartGetList, CartPutTotalQty, DrawerToggle, getAddressList } from '../store/actions';

/**
 * @param {string} icon
 * @param {string} title
 * @param backAction
 * @param {boolean} withoutCartAndLogo
 * @param dataPageStory
 * @param options
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function HeaderComponent({ ...props }) {
  const {
    icon = '',
    title,
    backAction,
    withoutCartAndLogo,
    options,
    CartPutTotalQty: cartPutTotalQty,
    CartGetList: cartGetList,
    DrawerToggle: drawerToggle,
    getAddressList: getAddress,
    token,
    backFunc,
  } = props;
  const navigation = useNavigation();
  const { data: cartData } = useQuery(GET_TOTAL_QUANTITY_CART, {
    variables: {
      id: options?.cartId,
    },
  });

  useEffect(() => {
    if (cartData) {
      cartPutTotalQty({ totalQuantity: cartData?.cart?.totalQuantity });
    }
  }, [cartData, cartPutTotalQty]);

  const handlePress = () => {
    navigation.navigate('Home');
  };

  const onPressLeft = () => {
    if (backAction) {
      navigation.goBack();
    } else {
      drawerToggle();
    }
  };

  const onNavigateCart = () => {
    cartGetList({
      first: 10,
      last: 0,
      id: options?.cartId,
    });
    getAddress({ token, limit: 10, refetch: true });
    navigation.navigate('Cart');
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

  const renderCart = () => {
    return (
      <View>
        <FeatherIcon color={COLORS.title} size={20} name="shopping-bag" />
        {options?.totalQuantity > 0 && (
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
            <Text style={{ ...FONTS.fontXs, fontSize: 10, color: COLORS.white }}>{options?.totalQuantity}</Text>
          </View>
        )}
      </View>
    );
  };

  const rightIcon = () => {
    return (
      <View>
        <IconButton onPress={onNavigateCart} icon={() => renderCart()} size={25} />
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
          backgroundColor: COLORS.white,
        }}
      >
        <IconButton icon={() => leftIcon(icon, title)} size={25} onPress={backFunc || onPressLeft} />
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
              <Image style={{ width: 70, height: 35, backgroundColor: COLORS.transparent }} source={Logo} />
            </TouchableOpacity>
            <IconButton onPress={() => navigation.navigate('Cart')} icon={() => rightIcon()} size={25} />
          </>
        )}
      </View>
    </View>
  );
}

export default connect(
  ({ Cart, User }) => {
    const { options } = Cart;
    const {
      options: { token },
    } = User;
    return { options, token };
  },
  { CartGetList, CartPutTotalQty, DrawerToggle, getAddressList }
)(React.memo(HeaderComponent));

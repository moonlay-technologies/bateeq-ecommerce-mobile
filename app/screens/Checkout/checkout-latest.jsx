import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import DeliveryOption from '../../components/DeliveryOption';
import CustomButton from '../../components/CustomButton';
import { COLORS, FONTS } from '../../constants/theme';
import Header from '../../layout/Header';
import { GET_CART_BY_ID, GET_CUSTOMER_ADDRESS } from '../../graphql/queries';

import LoadingScreen from '../../components/LoadingView';
import NoContent from '../../components/NoContent';
import CartList from '../../components/CartList';
import AuthService from '../../service/auth/auth-service';

function Checkout() {
  const navigation = useNavigation();
  const cart = useSelector(state => state.cart);
  const { userAddress } = useSelector(state => state.user);
  const [cartList, setCartList] = useState([]);
  const [token, setToken] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const {
    data: cartData,
    error,
    loading,
  } = useQuery(GET_CART_BY_ID, {
    fetchPolicy: 'no-cache',
    variables: {
      id: cart?.id,
    },
  });
  const {
    data: address,
    error: errorAddress,
    loading: loadingAddress,
  } = useQuery(GET_CUSTOMER_ADDRESS, {
    variables: {
      fetchPolicy: 'no-cache',
      accessToken: token,
      limit: 1,
    },
  });

  useEffect(() => {
    setCartList(cartData?.cart?.lines?.edges?.map(i => i.node));
    if (userAddress?.address1) {
      setCustomerAddress(userAddress);
    } else {
      setCustomerAddress(address?.customer?.addresses?.edges[0]?.node || '');
    }

    AuthService.getToken()
      .then(result => {
        setToken(result);
      })
      .catch(err => {
        Toast.show({
          type: 'error',
          text1: 'Oops!',
          text2: err.originalError?.message || 'something went wrong',
        });
      });
  }, [cartData, loading, cart, address, errorAddress, loadingAddress]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
      }}
    >
      <View style={{ paddingHorizontal: 20 }}>
        <Header titleLeft leftIcon="back" title="Back" />
      </View>
      <ScrollView>
        {loading ? (
          <LoadingScreen type="circle" />
        ) : cartList?.length > 0 ? (
          cartList.map(data => {
            const {
              quantity,
              attributes,
              id: lineId,
              merchandise: {
                id: merchandiseId,
                image,
                product: { id, title },
              },
              cost: {
                totalAmount: { amount, currencyCode },
                compareAtAmountPerQuantity: { amount: original_price },
              },
            } = data;

            return (
              <View key={`${lineId}-${id}`}>
                <CartList
                  image={{ uri: image?.url }}
                  title={title}
                  size={attributes.find(i => i.key === 'Size')?.value}
                  attributes={attributes.map(({ __typename, ...rest }) => rest)}
                  cartId={cart?.id}
                  quantity={quantity}
                  price={amount}
                  originalPrice={original_price}
                  currencyCode={currencyCode}
                  lineId={lineId}
                  merchandiseId={merchandiseId}
                  showQuantity
                />
              </View>
            );
          })
        ) : (
          <View>
            <NoContent text="Nothing to check out at the moment." to={() => navigation.navigate('Home')} />
          </View>
        )}
        <View style={{ paddingHorizontal: 20 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                ...FONTS.fontSatoshiBold,
                marginBottom: 12,
                color: COLORS.title,
              }}
            >
              Deliver To
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Address')}>
              <Text
                style={{
                  color: 'grey',
                  marginBottom: 12,
                  ...FONTS.fontSatoshiRegular,
                }}
              >
                Change
              </Text>
            </TouchableOpacity>
          </View>
          <TextInput
            underlineColorAndroid="transparent"
            placeholder="Write Instruction Here..."
            placeholderTextColor="gray"
            numberOfLines={5}
            multiline
            value={customerAddress?.address1}
            style={{
              borderWidth: 1,
              textAlignVertical: 'top',
              padding: 15,
              borderRadius: 6,
              backgroundColor: '#D8D8D8',
              ...FONTS.fontSatoshiRegular,
            }}
          />

          <DeliveryOption
            title="Delivery Option"
            items={[
              { label: 'Cash on Delivery', value: 'cashondelivery' },
              { label: 'Credit Card', value: 'creditcard' },
              { label: 'Not Banking', value: 'notbanking' },
            ]}
            showChangeButton
          />
          {/* <DeliveryOption
              title="Rewards"
              items={[
                {label: 'No Reward Applied', value: 'norewardapplied'},
              ]}
            /> */}
          <View style={styles.wrapperTotal}>
            <View style={styles.subtotal}>
              <Text
                style={{
                  color: COLORS.title,
                  ...FONTS.fontSatoshiBold,
                }}
              >
                Subtotal
              </Text>
              <Text
                style={{
                  color: COLORS.title,
                  ...FONTS.fontSatoshiBold,
                }}
              >
                1123123
              </Text>
            </View>
            <View style={styles.deliveryfee}>
              <Text>Delivery Fee</Text>
              <Text>Rp0</Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 100,
            }}
          >
            <CustomButton
              // btnSm
              // onPress={() => navigation.navigate('AddAddress')}
              onPress={() => navigation.navigate('Payment')}
              title="Proceed to Payment"
              customWidth={250}
              arrowIcon
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Checkout;

const styles = StyleSheet.create({
  cardImage: {
    width: 100,
    height: 170,
  },
  wrapperTotal: {
    flexDirection: 'column',
    marginTop: 20,
  },
  subtotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deliveryfee: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

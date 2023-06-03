import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DeliveryOption from '../../components/DeliveryOption';
import CustomButton from '../../components/CustomButton';
import {COLORS, FONTS} from '../../constants/theme';
import Header from '../../layout/Header';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import { GET_CART_BY_ID } from '../../graphql/queries';
import { useEffect } from 'react';
import { useState } from 'react';
import LoadingScreen from '../../components/LoadingView';
import NoContent from '../../components/NoContent';
import CartList from '../../components/CartList';

const Checkout = () => {
  const navigation = useNavigation();
  const cart = useSelector(state=> state.cart)
  const [cartList, setCartList] = useState([])
  const { data: cartData, error, loading } = useQuery(GET_CART_BY_ID, {
    fetchPolicy: 'no-cache',
    variables: {
      id: cart?.id
    }
  })

  useEffect(() => {
      setCartList(cartData?.cart?.lines?.edges?.map(i => i.node))
  }, [cartData, loading, cart])

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
      }}>
      <View style={{paddingHorizontal: 20}}>
        <Header titleLeft leftIcon={'back'} title={'Back'} />
      </View>
      <ScrollView>
      {loading 
        ? <LoadingScreen Loading2 /> 
        : cartList?.length > 0 
        ? cartList.map((data) => {
            const { 
              quantity,
              attributes,
              id: lineId,
              merchandise: { id: merchandiseId, image, product: { id, title }}, 
              cost: { 
                totalAmount: {amount, currencyCode}, 
                compareAtAmountPerQuantity: {amount: original_price} 
              },
            } = data

            return (
            <View key={`${lineId}-${id}`}>
                <CartList
                  image={{uri: image?.url}}
                  title={title}
                  size={attributes.find(i=> i.key === 'Size')?.value}
                  attributes={attributes.map(({__typename, ...rest}) => rest)}
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
          )}) 
        : (
          <View>
            <NoContent text="Nothing to check out at the moment." to={() => navigation.navigate('Home')} />
          </View>
          )}
          <View style={{paddingHorizontal: 20}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  ...FONTS.fontSatoshiBold,
                  marginBottom: 12,
                  color: COLORS.title,
                }}>
                Deliver To
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Address')}>
                <Text
                  style={{
                    color: 'grey',
                    marginBottom: 12,
                    ...FONTS.fontSatoshiRegular,
                  }}>
                  Change
                </Text>
              </TouchableOpacity>
            </View>
            <TextInput
              underlineColorAndroid="transparent"
              placeholder="Write Instruction Here..."
              placeholderTextColor="gray"
              numberOfLines={5}
              multiline={true}
              value={
                'PT Moonlay Technologies\n\nSCBD, Equity Tower 25th Floor, Suite H.\nJl. Jend. Sudirman Kav. 52-53, South Jakarta,\nIndonesia 12190'
              }
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
                {label: 'Cash on Delivery', value: 'cashondelivery'},
                {label: 'Credit Card', value: 'creditcard'},
                {label: 'Not Banking', value: 'notbanking'},
              ]}
              showChangeButton={true}
            />
            <DeliveryOption
              title="Rewards"
              items={[
                {label: 'No Reward Applied', value: 'norewardapplied'},
              ]}
            />
            <View style={styles.wrapperTotal}>
              <View style={styles.subtotal}>
                <Text
                  style={{
                    color: COLORS.title,
                    ...FONTS.fontSatoshiBold,
                  }}>
                  Subtotal
                </Text>
                <Text
                  style={{
                    color: COLORS.title,
                    ...FONTS.fontSatoshiBold,
                  }}>
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
              }}>
              <CustomButton
                // btnSm
                // onPress={() => navigation.navigate('AddDeliveryAddress')}
                onPress={() => navigation.navigate('Payment')}
                title="Proceed to Payment"
                customWidth={250}
                arrowIcon={true}
              />
            </View>
          </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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

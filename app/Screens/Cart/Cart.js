import React from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import { GET_CART_BY_ID } from '../../graphql/queries';
import { COLORS, FONTS } from '../../constants/theme';
import CheckoutItem from '../../components/CheckoutItem';
import Header from '../../layout/Header';
import CustomButton from '../../components/CustomButton';

const Cart = ({navigation}) => {
  let cartList = []
  const cart = useSelector(state => state.cart)
  const { data } = useQuery(GET_CART_BY_ID, {
    variables: {
      id: cart.id
    }
  })
 
  try {
    cartList = data?.cart.lines.edges.map(i => i.node)
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'oops!',
      text2: error?.originalError?.message || 'something went wrong'
    })
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
      }}>
      <View style={{paddingHorizontal: 20}}>
        <Header
          backAction={() => navigation.goBack()}
          titleLeft
          title={'back'}
          leftIcon={'back'}
        />
      </View>
      <Text
        style={{
          color: COLORS.title,
          fontSize: 24,
          ...FONTS.fontSatoshiBold,
          paddingHorizontal: 20,
          paddingTop: 20,
        }}>
        My Cart
      </Text>

      <View style={{flex: 1, padding: 10}}>
        <ScrollView>
          {cartList?.length > 0 && cartList.map((data, index) => {
            console.log('cartList', data)
            const { 
              quantity,
              attributes,
              merchandise: { image, product: { id, title }}, 
              cost: { 
                totalAmount: {amount, currencyCode}, 
                compareAtAmountPerQuantity: {amount: original_price} 
              },
            } = data
       
            return (
            <CheckoutItem
              onPress={() =>
                navigation.navigate('ProductDetail', {
                  item: { product_id: id }
                })
              }
              key={index}
              image={{uri: image?.url}}
              title={title}
              size={attributes.find(i=> i.key === 'Size')?.value}
              quantity={quantity}
              price={amount}
              originalPrice={original_price}
              currencyCode={currencyCode}
            />
          )})}
     
          <View style={{padding: 20}}>
            <Text style={{...FONTS.fontSatoshiBold, marginBottom: 12}}>
              Special Instruction
            </Text>
            <TextInput
              underlineColorAndroid="transparent"
              placeholder="Write Instruction Here..."
              placeholderTextColor="gray"
              numberOfLines={5}
              multiline={true}
              // onChangeText={handleInstructionChange}
              // value={instruction}
              style={{
                borderWidth: 1,
                textAlignVertical: 'top',
                padding: 15,
                ...FONTS.fontSatoshiRegular,
              }}
            />
         
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 100,
            }}>
            <CustomButton
              onPress={() => navigation.navigate('Checkout')}
              title="Checkout"
              customWidth={200}
              arrowIcon={true}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Cart;

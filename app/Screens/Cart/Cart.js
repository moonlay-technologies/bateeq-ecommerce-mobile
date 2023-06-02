import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CART_BY_ID } from '../../graphql/queries';
import { COLORS, FONTS } from '../../constants/theme';
import CheckoutItem from '../../components/CheckoutItem';
import CustomButton from '../../components/CustomButton';
import LoadingScreen from '../../components/LoadingView';
import OptionBar from '../../components/Modal/OptionBar';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { CART_REMOVE_ITEM } from '../../graphql/mutation';
import ButtonSm from '../../components/Button/ButtonSm';;
import Header from '../../layout/Header';

const Cart = ({navigation}) => {
  const cart = useSelector(state => state.cart)
  const dispacth = useDispatch()
  const [cartList, setCartList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isChange, setIsChange] = useState(false)
  const [showModal, setShowModal] = useState({
    show: false,
    data: ''
  })
  const { data: cartData, error, loading } = useQuery(GET_CART_BY_ID, {
    fetchPolicy: 'no-cache',
    variables: {
      id: cart?.id
    }
  })

  const [cartLinesRemove, {error: mutationERror, loading: mutationLoad}] = useMutation(CART_REMOVE_ITEM, {
    variables : {
      cartId: cart?.id,
      lineIds: showModal?.data?.lineId
    }
  })

  useEffect(() => {
    setCartList(cartData?.cart?.lines?.edges?.map(i => i.node))

    // } else {
    //     setCartList(prev => {
    //       if (lineIndex !== -1) 
    //       return prev.map((item, index) => {
    //         if(index === lineIndex) {
    //           return {
    //             ...item,
    //             quantity: cart?.cartData?.quantity
    //           }
    //         }
    //         return item
    //       })
    //     })
    // }

    if(error) {
      Toast.show({
        type: 'error',
        text1: 'oops!',
        text2: error?.originalError?.message || 'something went wrong'
      })
    }
  }, [loading, error, isLoading, cart, isChange])

  const handleDelete = async () => {
    console.log('showModal?.data?.lineIds', showModal?.data?.lineIds)
    const {data, errors} = await cartLinesRemove({
      variables: {
        cartId: cart?.id,
        lineIds: showModal?.data?.lineIds
      }
    })
    console.log('data', [data, errors])
    setIsChange(!isChange)
    setIsLoading(mutationLoad)
    setShowModal(prev => ({
      ...prev,
      show: !prev.show
    }))
  }
  console.log('mutationERror', [mutationERror, mutationLoad])
  console.log("isChange", isChange)
  console.log('CARTLIST', cartList)
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
      }}>
      {showModal.show && <OptionBar 
        text={`${showModal?.data?.title || '' } will be deleted from your cart`} 
        onOpen={showModal.show}
        toggle={()=>setShowModal(prev => ({
          ...prev,
          show: !prev.show
        }))}
        submitText={isLoading ? 'Loading ...' : 'Delete'}
        disabled={isLoading}
        onContinue={handleDelete}
        />}
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
      {loading || isLoading && <LoadingScreen Loading2 />}
        <ScrollView>
          {cartList?.length > 0 && cartList.map((data) => {
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
                  <CheckoutItem
                  // onPress={() =>
                  //   navigation.navigate('ProductDetail', {
                  //     item: { product_id: id }
                  //   })
                  // }
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
                  setIsChange={setIsChange}
                  isChange={isChange}
                  merchandiseId={merchandiseId}
                  addComponent={<ButtonSm 
                    title={`Delete`} 
                    color={'#704FFE'} 
                    style={{
                      width: 100
                    }}
                    onPress={() => setShowModal(prev =>({
                      data: { lineIds: [lineId], title },
                      show: !prev.show
                    }))} 
                  />}
                />
            </View>
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
              // onPress={onChange}
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

import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSelector,connect } from 'react-redux';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CART_BY_ID } from '../../graphql/queries';
import { COLORS, FONTS } from '../../constants/theme';
import CartList from '../../components/CartList';
import CustomButton from '../../components/CustomButton';
import LoadingScreen from '../../components/LoadingView';
import Modal from '../../components/Modal/OptionBar';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { CART_REMOVE_ITEM } from '../../graphql/mutation';
import ButtonSm from '../../components/Button/ButtonSm';;
import Header from '../../layout/Header';
import NoContent from '../../components/NoContent';
import {GqlCart} from "../../service/graphql/mutation/cart";

const Cart = ({navigation,...props}) => {
    let { cartId } = props
  const cart = useSelector(state => state.cart)
  const [cartList, setCartList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isChange, setIsChange] = useState(false)
  const [showModal, setShowModal] = useState({
    show: false,
    data: ''
  })
  const { data: cartData, error, loading, refetch } = useQuery(GET_CART_BY_ID, {
    fetchPolicy: 'no-cache',
    variables: {
      id: cartId
    }
  })

  const [cartLinesRemove, {error: mutationERror, loading: mutationLoad, data: mutationData}] = useMutation(CART_REMOVE_ITEM, {
    variables : {
      cartId: cartId,
      lineIds: showModal?.data?.lineId
    }
  })

  useEffect(() => {

    setCartList(cartData?.cart?.lines?.edges?.map(i => i.node))
      console.log({cartData})
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
  }, [loading, error, isLoading, cart, isChange, mutationData, cartData])

  const refreshCartData = () => {
    refetch();
  };

  const handleDelete = async () => {
    setIsLoading(true)
    await cartLinesRemove({
      variables: {
        cartId: cart?.id,
        lineIds: showModal?.data?.lineIds
      }
    })
    refreshCartData()
    setShowModal(prev => ({
      ...prev,
      show: !prev.show
    }))
    setIsChange(!isChange)
    setIsLoading(false)
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
      }}>
      <Modal 
        text={`${showModal?.data?.title || '' } will be deleted from your cart`} 
        onOpen={showModal.show}
        visible={showModal.show}
        toggle={()=>setShowModal(prev => ({
          ...prev,
          show: !prev.show
        }))}
        submitText={isLoading ? 'Deleting ...' : 'Delete'}
        disabled={isLoading}
        onContinue={handleDelete}
        />
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
          {loading ? 
              <LoadingScreen Loading2 /> : cartList?.length > 0 ? cartList.map((data) => {
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
                  // onPress={() =>
                  //   navigation.navigate('ProductDetail', {
                  //     item: { product_id: id }
                  //   })
                  // }
                  withIncrementDecrement
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
                  refreshCartData={refreshCartData}
                  merchandiseId={merchandiseId}
                  addComponent={<ButtonSm 
                    title={`Delete`} 
                    color={'#e63f31'} 
                    style={{
                      width: 80,
                      backgroundColor: '#fbfbfb',
                      borderColor: '#c42b1c',
                      borderWidth: 1,
                    }}
                    textStyle={{
                      color: '#c42b1c',
                      fontWeight: '900'
                    }}
                    onPress={() => setShowModal(prev =>({
                      data: { lineIds: [lineId], title },
                      show: !prev.show
                    }))} 
                  />}
                />
            </View>
          )}) 
          : (
          <View>
            <NoContent to={() => navigation.navigate('Home')}/>
          </View>
          )
        }
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

export default connect(({Cart})=> {
    let { options } = Cart
    return {cartId:options?.cartId}
},{})(React.memo(Cart));

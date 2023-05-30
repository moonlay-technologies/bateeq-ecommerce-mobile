import React, { useState, useRef } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Swiper from 'react-native-swiper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Toast from 'react-native-toast-message';
import {COLORS, FONTS} from '../../constants/theme';
import Header from '../../layout/Header';
import CustomButton from '../../components/CustomButton';
import LinearGradient from 'react-native-linear-gradient';
import {Snackbar} from 'react-native-paper';
import ProductCardStyle1 from '../../components/ProductCardStyle1';
import HeaderBateeq from '../../components/Headers/HeaderBateeq';
import SelectInput from '../../components/SelectInput';
import {Footer, ShowHideProductDetail} from '../../components/Footer';
import {formatWithCommas} from '../../utils/helper';
import CustomHTML from '../../components/CustomHtml.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as yup from 'yup';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PRODUCT_RECOMMENDATION } from '../../graphql/queries';
import { ADD_TO_CART } from '../../graphql/mutation';
import { GET_PRODUCT_OPTIONS_BY_ID } from '../../graphql/queries';
import { findVariantIdByOptions } from './helper';
import { useSelector } from 'react-redux';

const schema = yup.object().shape({
  product_id: yup.string().required(),
  title: yup.string().required(),
  currentPrice: yup.number().required(),
  oldPrice: yup.number(),
  image: yup.array().required(),
  quantity: yup.number().required(),
  size: yup.string().required(),
  color: yup.string().required(),
});

const ProductDetail = ({ navigation, route }) => {
  const { item } = route.params;
  const cart = useSelector(state => state.cart)
  const scrollViewRef = useRef(null);
  const { data, error: errorGetProduct } = useQuery(GET_PRODUCT_RECOMMENDATION, {
    variables: {
      productId: item.product_id
    }
  })
  const {data: optionData, error: getOptionsError} = useQuery(GET_PRODUCT_OPTIONS_BY_ID, {
    variables: {
      id: item.product_id
    }
  })
console.log('cart', cart)
  const [cartLinesAdd]= useMutation(ADD_TO_CART)
  const [isSnackbar, setIsSnackbar] = useState(false);
  const [snackText] = useState('Loading...');
  const [errors, setErrors] = useState({})
  const [qty, setQty] = useState(1);
  const [variants, setVariants] = useState({
    size: '',
    color: ''
  })

  let productRecommendations = []
 
    if(data?.productRecommendations.length > 0) {
      productRecommendations = data?.productRecommendations.map(d => ({
        id: d.id,
        title: d.title,
        image: d.images.edges.find(i => i)?.node.url,
        compareAtPrice: d.variants.edges.find(i => i)?.node.compareAtPrice,
        price: d.variants.edges.find(i => i)?.node.price.amount
      }))
    } else {
      if(!data?.productRecommendations || errorGetProduct) {
        Toast.show({
          type: 'error',
          text1: 'oops! somehing went wrong',
          text2: 'cannot show recomendation for you'
        })
      }
    }


  let colorOptions = []
  let sizeOptions = []

    const { options } = optionData?.product

    if(options.length > 0 ) {
      options.find(option => {
        if(option.name.toLowerCase() === 'color') {
          colorOptions.push(...option.values.map(i => ({
            label: i,
            value: i
          })))
        }
        if(option.name.toLowerCase() === 'size') { 
          sizeOptions.push(...option.values.map(i => ({
            label: i,
            value: i
          })))
        }
      })
    } else {
      if(!optionData || getOptionsError) {
        Toast.show({
          type: 'error',
          text1: 'oops! somehing went wrong',
          text2: 'cannot show option for you'
        })
      }
    }


  const onSelectValue = (type, value) => {
    if(type === 'size') {
      setVariants(prev => ({
        ...prev,
        size: value
      }));
    } else {
      setVariants(prev => ({
        ...prev,
        color: value
      }));
    }
  };

  const variantId = findVariantIdByOptions(item, variants);
  

 const onSubmit = () => {
 const body = { 
    product_id: item.product_id,
    title: item.title,
    currentPrice: item.price,
    oldPrice: item.oldPrice,
    image: item.images,
    quantity: qty,
    size: variants.size,
    color: variants.color,
    variant_id : variantId
  }
  schema.validate(body, { abortEarly: false })
  .then(async result => {
    console.log('result', result)
    console.log('variantId', result.variant_id)
    
    const { data } = await cartLinesAdd({
      variables: {
        cartId: cart?.id,
        lines: [
          {
            merchandiseId: result.variant_id,
            quantity: result.quantity,
            attributes: [  // Updated field name
              {
                key: 'Color',
                value: result.size
              },
              {
                key: 'Size',
                value: result.size
              }
            ]
          }
        ]
      }
    });
    
    console.log('data create line add', data)
    setErrors({})
    colorOptions = null
    sizeOptions = null
    setVariants({
      size: '',
      color: ''
    })
    navigation.navigate('Cart')
  }).
  catch(validationError => { 
    console.log('validation error',  validationError)
    const errorsVal = validationError.inner.reduce((acc, error) => {
      const { path, message } = error;
      acc[path] = message;
      return acc;
    }, {});
    setErrors(errorsVal)
  })
 }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.backgroundColor}}>
      <ScrollView ref={scrollViewRef}>
        <HeaderBateeq />
        <View style={{paddingHorizontal: 20}}>
          <Header titleLeft leftIcon={'back'} title={'back'} />
        </View>
        <View style={{paddingHorizontal: 20}}>
          <Swiper
            style={{height: 500}}
            dotStyle={{
              height: 10,
              width: 10,
              borderWidth: 2,
              borderColor: COLORS.white,
              borderRadius: 10,
            }}
            activeDotStyle={{
              height: 10,
              width: 10,
              backgroundColor: COLORS.white,
              borderRadius: 10,
            }}>
            {item?.images?.map((data, index) => {
              return (
                <View key={index}>
                  <Image
                    source={item.imagePath ? item.imagePath : {uri: data.node.url}}
                    style={{
                      width: '100%',
                      height: undefined,
                      aspectRatio: 200 / 300,
                    }}
                  />
                  <LinearGradient
                    style={{
                      position: 'absolute',
                      height: '100%',
                      width: '100%',
                      top: 0,
                      left: 0,
                    }}
                    colors={[
                      'rgba(0,0,0,.3)',
                      'rgba(0,0,0,0)',
                      'rgba(0,0,0,0)',
                    ]}></LinearGradient>
                </View>
              );
            })}
          </Swiper>

        </View>
        <View style={{paddingHorizontal: 20}}>
          <View
            style={{ alignItems: 'flex-start', paddingBottom: 12 }}> 
            <Text
              style={{
                ...FONTS.fontSatoshiBold,
                fontSize: 24,
                color: COLORS.title,
                marginBottom: 3,
              }}>
              {item.title}
            </Text>
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              {item.oldPrice && (
                <Text
                  style={{
                    ...FONTS.fontSatoshiRegular,
                    textDecorationLine: 'line-through',
                    fontSize: 16,
                  }}>
                  Rp {formatWithCommas(Number(item.oldPrice).toLocaleString())}
                </Text>
              )}
              <Text
                style={{
                  ...FONTS.fontSatoshiBold,
                  color: COLORS.title,
                  fontSize: 20,
                }}>
                Rp {formatWithCommas(Number(item.price).toLocaleString())}
              </Text>
            </View>
            {item.desc && <CustomHTML htmlContent={item.desc} />}
          
            <View style={{width: '100%', marginTop: 20}}>
              <SelectInput
                label="Choose Size"
                name="size"
                options={sizeOptions}
                onSelect={(val)=> onSelectValue('size', val)}
                placeholder="Choose Size"
                customDetail
                errors={errors}
              />
              {colorOptions.length > 0 && <SelectInput
                label="Choose Color"
                name="color"
                options={colorOptions}
                onSelect={(val)=> onSelectValue('color', val)}
                placeholder="Choose Color"
                customDetail
                errors={errors}
              /> }
              <View>
                <Text
                  style={{
                    marginBottom: 8,
                    ...FONTS.fontSatoshiBold,
                    color: COLORS.title,
                  }}>
                  Quantity 
                  <Text style={{color: COLORS.danger}}>*</Text>
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      qty > 1 && setQty(qty - 1)
                    }
                    style={{
                      height: 32,
                      width: 30,
                      borderWidth: 1,
                      borderColor: COLORS.borderColor,
                      backgroundColor: '#AAAAAA',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <FeatherIcon size={14} color={COLORS.white} name="minus" />
                  </TouchableOpacity>
                  <Text
                    style={{
                      ...FONTS.fontSatoshiBold,
                      color: COLORS.title,
                      width: '79%',
                      textAlign: 'center',
                      borderWidth: 1,
                      marginHorizontal: 8,
                      paddingVertical: 5,
                      paddingHorizontal: 50,
                    }}>
                    {qty}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setQty(qty + 1)}
                    style={{
                      height: 32,
                      width: 30,
                      borderWidth: 1,
                      backgroundColor: '#303030',
                      borderColor: COLORS.borderColor,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <FeatherIcon size={14} color={COLORS.white} name="plus" />
                  </TouchableOpacity>
                </View>
                <ShowHideProductDetail />
              </View>
            </View>
          </View>
          <View
            style={{
              marginTop: 20,
              paddingTop: 12,
              borderTopWidth: 1,
              borderColor: COLORS.borderColor,
            }}>
            <Text
              style={{
                ...FONTS.fontSatoshiBold,
                color: COLORS.title,
                fontSize: 20,
                marginBottom: 20,
              }}>
              You May Like
            </Text>
            <View style={{marginBottom: 10}}>
              <View
                style={{
                  marginBottom: 25,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}>
                {productRecommendations.length > 0 && productRecommendations.map(({image, title, price, compareAtPrice}, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        width: 150,
                        marginRight: 10,
                        marginBottom: 20,
                      }}>
                      <ProductCardStyle1
                        onPress={() =>
                          navigation.navigate('ProductDetail', {
                            item: {
                              title: title,
                              image: image,
                              oldPrice: compareAtPrice,
                              price: price,
                            },
                          })
                        }
                        imageSrc={image}
                        title={title}
                        price={price}
                        oldPrice={compareAtPrice}
                      />
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </View>
        <Footer />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 15,
            paddingVertical: 12,
          }}>
          <View style={{marginRight: 20, paddingVertical: 20}}>
            <CustomButton
              onPress={() => navigation.navigate('Wishlist')}
              outline
              customWidth={150}
              title="Wishlist"
              wishlistIcon
            />
          </View>
          <View>
            <CustomButton
              onPress={onSubmit}
              customWidth={150}
              title="Add To Cart"
              bagIcon
            />
          </View>
        </View>
      </ScrollView>
      <Snackbar
        visible={isSnackbar}
        duration={3000}
        onDismiss={() => setIsSnackbar(false)}
        action={{
          label: 'Wishlist',
          onPress: () => {
            navigation.navigate('Wishlist');
          },
        }}>
        {snackText}
      </Snackbar>
    </SafeAreaView>
  );
};

export default ProductDetail;

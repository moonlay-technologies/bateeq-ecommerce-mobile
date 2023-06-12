import React, { useState, useRef, useEffect } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import * as yup from 'yup';
import { useMutation, useQuery } from '@apollo/client';
import { Snackbar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import Swiper from 'react-native-swiper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';
import { Footer, ShowHideProductDetail } from '../../components/Footer';
import ProductCardStyle1 from '../../components/ProductCardStyle';
import Button from '../../components/CustomButton';
import SelectInput from '../../components/SelectInput';
import CustomHTML from '../../components/CustomHtml';
import Header from '../../layout/Header';
import { COLORS, FONTS } from '../../constants/theme';
import { formatWithCommas } from '../../utils/helper';
import { findVariantIdByOptions } from './helper';
import { ADD_TO_CART } from '../../graphql/mutation';
import { GET_PRODUCT_BY_ID, GET_PRODUCT_RECOMMENDATION, GET_PRODUCT_OPTIONS_BY_ID } from '../../graphql/queries';
import { setCartId } from '../../store/reducer';
import LoadingScreen from '../../components/LoadingView';
import HeaderCartComponent from '../../components/HeaderComponent';

function ProductDetail({ navigation, route }) {
  const [options, setOptions] = useState({
    color: [],
    size: [],
  });
  const schema = yup.object().shape({
    quantity: yup.number().required(),
    size: yup.string().required(),
    color: yup.string().test('color', 'color is required', value => {
      const pass = true;
      if (options.color.length > 0) {
        if (value) {
          return pass;
        }
        return !pass;
      }
      return pass;
    }),
    cartId: yup.string().required(),
  });

  const { id } = route.params;
  const cartStore = useSelector(state => state.cart);
  const scrollViewRef = useRef(null);
  const [cartLinesAdd] = useMutation(ADD_TO_CART);
  const [isSnackbar, setIsSnackbar] = useState(false);
  const [productRecommendations, setProductRecommendations] = useState([]);
  const [snackText] = useState('Loading...');
  const [errors, setErrors] = useState({});
  const [qty, setQty] = useState(1);
  const cart = useSelector(state => state.cart);
  const [onSubmitLoading, setOnSubmitLoading] = useState(false);
  const [product, setProduct] = useState({
    id: '',
    descriptionHtml: '',
    title: '',
    images: [],
    variants: [],
  });

  const [amount, setAmount] = useState({
    currencyCode: '',
    original_price: '',
    discounted_price: '',
  });
  const [variants, setVariants] = useState({
    size: '',
    color: '',
  });

  const {
    data: productData,
    error: productDataError,
    loading: productDataLoad,
  } = useQuery(GET_PRODUCT_BY_ID, {
    fetchPolicy: 'no-cache',
    variables: {
      id,
    },
  });
  const {
    data: optionData,
    error: getOptionsError,
    loading: optionDataLoad,
  } = useQuery(GET_PRODUCT_OPTIONS_BY_ID, {
    fetchPolicy: 'no-cache',
    variables: {
      id,
    },
  });
  const {
    data,
    error: productRecommendationError,
    loading: productRecommendationLoad,
  } = useQuery(GET_PRODUCT_RECOMMENDATION, {
    variables: {
      prodcutId: id,
    },
  });

  const isLoading = [productDataLoad, optionDataLoad, productRecommendationLoad].some(i => i === true);
  const isError = [productRecommendationError, productDataError, getOptionsError].some(i => i);

  useEffect(() => {
    if (!isLoading) {
      const colorOptions = [];
      const sizeOptions = [];

      const {
        id: productID,
        descriptionHtml,
        title,
        images: { edges },
        variants: { edges: variantEdge },
      } = productData.product;

      const [
        {
          node: { compareAtPrice, price },
        },
      ] = variantEdge;

      setAmount({
        currencyCode: price?.currencyCode,
        original_price: price?.amount,
        discounted_price: compareAtPrice?.amount,
      });
      setProduct({ id: productID, descriptionHtml, title, images: edges, variants: variantEdge });
      const productRecommendation = data?.productRecommendations.map(d => ({
        id: d.id,
        title: d.title,
        image: d.images.edges.find(i => i)?.node.url,
        compareAtPrice: d.variants.edges.find(i => i)?.node.compareAtPrice,
        price: d.variants.edges.find(i => i)?.node.price.amount,
      }));

      setProductRecommendations(productRecommendation || []);

      const optionsVariant = optionData?.product?.options || [];

      optionsVariant.forEach(option => {
        if (option.name.toLowerCase() === 'color') {
          colorOptions.push(
            ...option.values.map(i => ({
              label: i,
              value: i,
            }))
          );
        }
        if (option.name.toLowerCase() === 'size') {
          sizeOptions.push(
            ...option.values.map(i => ({
              label: i,
              value: i,
            }))
          );
        }
      });
      setOptions({
        color: colorOptions || [],
        size: sizeOptions || [],
      });
      if (cart) {
        setCartId(cart?.id);
      }
    } else if (isError) {
      Toast.show({
        type: 'error',
        text1: 'oops!',
        text2:
          productRecommendationError?.message ||
          productDataError?.message ||
          getOptionsError?.message ||
          'something went wrong',
      });
    }
  }, [isLoading, isError, cart]);
  console.log('productRecommendations', productRecommendations);

  const onSelectValue = (type, value) => {
    if (type === 'size') {
      setVariants(prev => ({
        ...prev,
        size: value,
      }));
    } else if (type === 'color') {
      setVariants(prev => ({
        ...prev,
        color: value,
      }));
    }
  };

  const variantId = product?.variants.length > 0 ? findVariantIdByOptions(product?.variants, variants) : '';

  const onSubmit = () => {
    setOnSubmitLoading(true);
    const body = {
      quantity: qty,
      size: variants.size,
      color: variants.color,
      variant_id: variantId,
      cartId: cartStore?.id || '',
    };
    schema
      .validate(body, { abortEarly: false })
      .then(async result => {
        console.log('result', result);

        const { data: addLine } = await cartLinesAdd({
          variables: {
            cartId: result.cartId,
            lines: [
              {
                merchandiseId: result.variant_id,
                quantity: result.quantity,
                attributes: [
                  {
                    key: 'Color',
                    value: result?.color || 'white',
                  },
                  {
                    key: 'Size',
                    value: result?.size,
                  },
                ],
              },
            ],
          },
        });
        if (addLine?.cartLinesAdd?.cart.id) {
          setErrors({});
          setOptions({
            color: [],
            size: [],
          });
          setVariants({
            size: '',
            color: '',
          });
          navigation.navigate('Cart');
        } else {
          Toast.show({
            type: 'error',
            text1: 'oops! something went wrong',
            text2: errors?.originalError?.message,
          });
        }
        setOnSubmitLoading(false);
      })
      .catch(error => {
        if (error.name === 'ValidationError') {
          const errorsVal = error.inner.reduce((acc, error) => {
            const { path, message } = error;
            acc[path] = message;
            return acc;
          }, {});
          setErrors(errorsVal);
        } else {
          Toast.show({
            type: 'error',
            text1: 'oops!',
            text2: error?.originalError?.message || 'something went wrong',
          });
        }
        setOnSubmitLoading(false);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.backgroundColor }}>
      <ScrollView ref={scrollViewRef}>
        <HeaderCartComponent />
        <View style={{ paddingHorizontal: 20 }}>
          <Header titleLeft leftIcon="back" title="back" />
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          {isLoading ? (
            <LoadingScreen type="circle" />
          ) : (
            <Swiper
              style={{ height: 500 }}
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
              }}
            >
              {product.images.length > 0 &&
                product?.images?.map((dt, index) => {
                  return (
                    <View key={index}>
                      <Image
                        source={{ uri: dt.node.url }}
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
                        colors={['rgba(0,0,0,.3)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)']}
                      />
                    </View>
                  );
                })}
            </Swiper>
          )}
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <View style={{ alignItems: 'flex-start', paddingBottom: 12 }}>
            <Text
              style={{
                ...FONTS.fontSatoshiBold,
                fontSize: 24,
                color: COLORS.title,
                marginBottom: 3,
              }}
            >
              {product?.title || ''}
            </Text>
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              {amount.original_price && (
                <Text
                  style={{
                    ...FONTS.fontSatoshiRegular,
                    textDecorationLine: 'line-through',
                    fontSize: 16,
                  }}
                >
                  {amount.currencyCode} {formatWithCommas((Number(amount.original_price) * qty).toLocaleString())}
                </Text>
              )}
              <Text
                style={{
                  ...FONTS.fontSatoshiBold,
                  color: COLORS.title,
                  fontSize: 20,
                }}
              >
                {amount.currencyCode}

                {formatWithCommas(Number(amount.discounted_price * qty).toLocaleString())}
              </Text>
            </View>
            {product && <CustomHTML htmlContent={product.descriptionHtml} />}

            <View style={{ width: '100%', marginTop: 20 }}>
              <SelectInput
                label="Choose Size"
                name="size"
                options={options.size}
                onSelect={val => onSelectValue('size', val)}
                placeholder="Choose Size"
                customDetail
                errors={errors}
              />
              {options.color.length > 0 && (
                <SelectInput
                  label="Choose Color"
                  name="color"
                  options={options.color}
                  onSelect={val => onSelectValue('color', val)}
                  placeholder="Choose Color"
                  customDetail
                  errors={errors}
                />
              )}
              <View>
                <Text
                  style={{
                    marginBottom: 8,
                    ...FONTS.fontSatoshiBold,
                    color: COLORS.title,
                  }}
                >
                  Quantity
                  <Text style={{ color: COLORS.danger }}>*</Text>
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <TouchableOpacity
                    onPress={() => qty > 1 && setQty(qty - 1)}
                    style={{
                      height: 32,
                      width: 30,
                      borderWidth: 1,
                      borderColor: COLORS.borderColor,
                      backgroundColor: '#AAAAAA',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
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
                    }}
                  >
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
                    }}
                  >
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
            }}
          >
            <Text
              style={{
                ...FONTS.fontSatoshiBold,
                color: COLORS.title,
                fontSize: 20,
                marginBottom: 20,
              }}
            >
              You May Like
            </Text>
            <View style={{ marginBottom: 10 }}>
              <View
                style={{
                  marginBottom: 25,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}
              >
                {productRecommendations.length > 0 &&
                  productRecommendations.map(({ image, title, price, compareAtPrice, id }) => {
                    return (
                      <View
                        key={id}
                        style={{
                          width: 150,
                          marginRight: 10,
                          marginBottom: 20,
                        }}
                      >
                        <ProductCardStyle1
                          onPress={() => navigation.navigate('ProductDetail', { id })}
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
          }}
        >
          <View style={{ marginRight: 20, paddingVertical: 20 }}>
            <Button
              onPress={() => navigation.navigate('Wishlist')}
              outline
              customWidth={150}
              title="Wishlist"
              wishlistIcon
            />
          </View>
          <View>
            <Button
              disabled={onSubmitLoading}
              onPress={onSubmit}
              customWidth={150}
              title={onSubmitLoading ? 'Loading ...' : 'Add To Cart'}
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
        }}
      >
        {snackText}
      </Snackbar>
    </SafeAreaView>
  );
}

export default ProductDetail;

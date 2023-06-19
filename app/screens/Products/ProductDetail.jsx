import React, { useState, useRef, useEffect } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { Snackbar } from 'react-native-paper';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';
import { Footer, ShowHideProductDetail } from '../../components/Footer';
import HeaderComponent from '../../components/HeaderComponent';
import ProductCardStyle1 from '../../components/ProductCardStyle';
import LoadingScreen from '../../components/LoadingView';
import SelectInput from '../../components/SelectInput';
import Button from '../../components/ButtonComponent';
import CustomHTML from '../../components/CustomHtml';

import { COLORS, FONTS } from '../../constants/theme';
import { formatWithCommas } from '../../utils/helper';
import { findVariantIdByOptions } from './helper';
import { ADD_ITEM_TO_CART } from '../../graphql/mutation';

import { CartGetList, getProductById, getProductRecommendation } from '../../store/actions';
import Notification from '../../components/NotificationComponent';

function ProductDetail(props) {
  const {
    navigation,
    route,
    cartId,
    CartGetList: cartGetList,
    getProductById: getProductId,
    getProductRecommendation: getRecommendation,
    productData,
    loading,
    recommendationProducts,
    recommendationLoading,
  } = props;

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
  const scrollViewRef = useRef(null);
  const [cartLinesAdd] = useMutation(ADD_ITEM_TO_CART);
  const [isSnackbar, setIsSnackbar] = useState(false);
  const [snackText] = useState('Loading...');
  const [errors, setErrors] = useState({});
  const [qty, setQty] = useState(1);
  const [onSubmitLoading, setOnSubmitLoading] = useState(false);
  const [randomProductsRecommendation, setRandomProductsRecommendation] = useState([]);
  const [notifState, setNotifState] = useState(false);
  const [onWishList, setOnWishList] = useState(false);

  const [amount, setAmount] = useState({
    currencyCode: '',
    original_price: '',
    discounted_price: '',
  });

  const [variantOptions, setvariantOptions] = useState({
    size: '',
    color: '',
  });

  useEffect(() => {
    getProductId({ id });
    getRecommendation({ id });
  }, []);

  useEffect(() => {
    const colorOptions = [];
    const sizeOptions = [];
    if (productData.options && productData.variants) {
      const optionsVariant = productData?.options || [];

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

      const variantData = productData.variants[0];
      setvariantOptions({
        size: variantData?.selectedOptions?.find(i => i.name.toLowerCase() === 'size')?.value,
        color: variantData?.selectedOptions?.find(i => i.name.toLowerCase() === 'color')?.value,
      });
      setAmount({
        currencyCode: variantData?.node?.price?.currencyCode,
        original_price: variantData?.node?.price?.amount,
        discounted_price: variantData?.node?.compareAtPrice?.amount,
      });
      setOptions({
        color: colorOptions || [],
        size: sizeOptions || [],
      });
    }
  }, [productData]);

  const onSelectValue = (type, value) => {
    if (type === 'size') {
      setvariantOptions(prev => ({
        ...prev,
        size: value,
      }));
    } else if (type === 'color') {
      setvariantOptions(prev => ({
        ...prev,
        color: value,
      }));
    }
  };

  const variantId =
    productData?.variants.length > 0 ? findVariantIdByOptions(productData?.variants, variantOptions) : '';
  console.log('variantid', variantId);
  const onSubmit = () => {
    setOnSubmitLoading(true);
    if (variantId) {
      const body = {
        quantity: qty,
        size: variantOptions.size,
        color: variantOptions.color,
        variant_id: variantId,
        cartId: cartId || '',
      };
      schema
        .validate(body, { abortEarly: false })
        .then(async result => {
          const payload = {
            cartId: result.cartId,
            lines: [
              {
                merchandiseId: result.variant_id,
                quantity: result.quantity,
                attributes: [
                  ...(result?.color ? [{ key: 'Color', value: result.color }] : []),
                  {
                    key: 'Size',
                    value: result?.size,
                  },
                ],
              },
            ],
          };
          console.log('payload', payload);
          const { data: addLine } = await cartLinesAdd({
            variables: payload,
          });
          console.log('addLine', addLine);

          if (addLine?.cartLinesAdd?.cart.id) {
            setNotifState(true);
            setTimeout(() => {
              setNotifState(false);
            }, 5000);
            setErrors({});
            setOptions({
              color: [],
              size: [],
            });
            setvariantOptions({
              size: '',
              color: '',
            });
            cartGetList({
              first: 10,
              last: 0,
              id: cartId,
            });
          } else {
            console.log('errors', errors);
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
            const errorsVal = error.inner.reduce((acc, err) => {
              const { path, message } = err;
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
    } else {
      Toast.show({
        type: 'error',
        text1: 'oops!',
        text2: 'invalid variant ID',
      });
    }
  };

  const handleQuantity = type => {
    if (type === 'de') {
      if (qty > 1) {
        setQty(qty - 1);
      }
    }
    if (type === 'in') {
      if (productData?.totalInventory <= 0) {
        setQty(qty);
      }
      if (qty < productData?.totalInventory) {
        setQty(qty + 1);
      }
    }
  };

  useEffect(() => {
    if (recommendationProducts.length > 0) {
      const shuffledProductsRecommendations = recommendationProducts.sort(() => 0.5 - Math.random());
      const selectedProducts = shuffledProductsRecommendations.slice(0, 2);
      setRandomProductsRecommendation(selectedProducts);
    }
  }, [recommendationProducts]);
  // <View>
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.backgroundColor }}>
      <ScrollView ref={scrollViewRef}>
        <HeaderComponent />
        <View style={{ paddingHorizontal: 20 }}>
          <HeaderComponent withoutCartAndLogo backAction icon="back" title="back" />
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          {loading ? (
            <LoadingScreen type="circle" />
          ) : (
            <Swiper style={{ height: 500 }} dotStyle={styles.dotStyle} activeDotStyle={styles.activeDotStyle}>
              {productData?.images?.length > 0 &&
                productData?.images?.map(dt => {
                  return (
                    <View key={dt.id}>
                      <Image
                        source={{ uri: dt.node.url }}
                        style={{
                          width: '100%',
                          height: undefined,
                          aspectRatio: 200 / 300,
                        }}
                      />
                      <LinearGradient
                        style={styles.linear}
                        colors={['rgba(0,0,0,.3)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)']}
                      />
                    </View>
                  );
                })}
            </Swiper>
          )}
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <View style={styles.section}>
            <Text style={styles.title}>{productData?.title || ''}</Text>
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              {amount.original_price && (
                <Text style={styles.lineAmount}>
                  {`${amount.currencyCode} ${formatWithCommas((Number(amount.original_price) * qty).toLocaleString())}`}
                </Text>
              )}
              {amount.discounted_price && (
                <Text style={styles.amount}>
                  {`${amount.currencyCode} ${formatWithCommas(Number(amount.discounted_price * qty).toLocaleString())}`}
                </Text>
              )}
            </View>
            {productData && <CustomHTML htmlContent={productData.descriptionHtml} />}

            <View style={{ width: '100%', marginTop: 10 }}>
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
                <View style={{ marginTop: -30, marginBottom: 10 }}>
                  {productData?.totalInventory <= 0 ? (
                    <View style={styles.container}>
                      <Text style={{ ...styles.text, color: COLORS.danger }}>
                        * Temporarily out of stock: Please check back later
                      </Text>
                    </View>
                  ) : productData?.totalInventory <= 5 && productData?.totalInventory > 0 ? (
                    <View style={styles.container}>
                      <Text style={{ ...styles.text, color: COLORS.orangeWarning }}>
                        {`Grab yours now! Limited quantity: ${productData?.totalInventory} left.`}
                      </Text>
                    </View>
                  ) : null}
                </View>
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
                    //
                    onPress={() => handleQuantity('de')}
                    style={{ ...styles.icon, backgroundColor: COLORS.mediumGray }}
                  >
                    <FeatherIcon size={14} color={COLORS.white} name="minus" />
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{qty}</Text>
                  <TouchableOpacity
                    // (
                    onPress={() => handleQuantity('in')}
                    style={{ ...styles.icon, backgroundColor: COLORS.black }}
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
                {recommendationLoading ? (
                  <LoadingScreen type="circle" />
                ) : (
                  randomProductsRecommendation.length > 0 &&
                  randomProductsRecommendation.map(
                    ({ image, title, price, compareAtPrice, id: productRecommendationId }) => {
                      return (
                        <View
                          key={productRecommendationId}
                          style={{
                            width: 150,
                            marginRight: 10,
                            marginBottom: 20,
                          }}
                        >
                          <ProductCardStyle1
                            onPress={() => navigation.navigate('ProductDetail', { productRecommendationId })}
                            imageSrc={image}
                            title={title}
                            price={price}
                            oldPrice={compareAtPrice}
                          />
                        </View>
                      );
                    }
                  )
                )}
              </View>
            </View>
          </View>
        </View>

        <Footer />
      </ScrollView>

      <Notification visible={notifState} />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 15,
          paddingVertical: 12,
        }}
      >
        <View style={{ marginRight: 20, paddingVertical: 10 }}>
          <Button
            onPress={() => navigation.navigate('Wishlist')}
            title="Wishlist"
            outline
            size="xs"
            iconStyles={{ marginLeft: 18 }}
            icon={FeatherIcon}
            iconName="heart"
          />
        </View>
        <View>
          <Button
            onPress={onSubmit}
            title={onSubmitLoading ? 'Loading ...' : 'Add To Cart'}
            size="xs"
            iconStyles={{ marginLeft: 18 }}
            icon={FeatherIcon}
            iconName="shopping-bag"
            disabled={onSubmitLoading || productData?.totalInventory <= 0}
          />
        </View>
      </View>
      <Snackbar
        visible={isSnackbar}
        duration={3000}
        onDismiss={() => setIsSnackbar(false)}
        action={{
          label: 'Wishlist',
          onPress: () => {
            setOnWishList(prev => !prev);
          },
        }}
      >
        {snackText}
      </Snackbar>
    </SafeAreaView>
  );
}
export default connect(
  ({ Cart, Product }) => {
    console.log('product', Product);
    const { options } = Cart;
    const {
      collections: {
        detail: { data: productData, loading },
        recommendations: { data: recommendationProducts, loading: recommendationLoading },
      },
    } = Product;
    return { cartId: options?.cartId, productData, loading, recommendationProducts, recommendationLoading };
  },
  { CartGetList, getProductById, getProductRecommendation }
)(React.memo(ProductDetail));

const styles = StyleSheet.create({
  icon: {
    height: 32,
    width: 30,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...FONTS.fontSatoshiBold,
    fontSize: 24,
    color: COLORS.title,
    marginBottom: 3,
  },
  lineAmount: {
    ...FONTS.fontSatoshiRegular,
    textDecorationLine: 'line-through',
    fontSize: 16,
  },
  amount: {
    ...FONTS.fontSatoshiBold,
    color: COLORS.title,
    fontSize: 20,
  },
  dotStyle: {
    height: 10,
    width: 10,
    borderWidth: 2,
    borderColor: COLORS.white,
    borderRadius: 10,
  },
  activeDotStyle: {
    height: 10,
    width: 10,
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },
  linear: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
  },
  section: { alignItems: 'flex-start', paddingBottom: 12 },
  quantity: {
    ...FONTS.fontSatoshiBold,
    color: COLORS.title,
    width: '79%',
    textAlign: 'center',
    borderWidth: 1,
    marginHorizontal: 8,
    paddingVertical: 5,
    paddingHorizontal: 50,
  },
  container: {
    backgroundColor: COLORS.LIGHT, // Customize the background color
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
  },
});

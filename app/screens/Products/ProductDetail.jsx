import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import * as yup from 'yup';
import { connect } from 'react-redux';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Toast from 'react-native-toast-message';
import { CartGetList, CartLineItemAdd, getProductById, getProductRecommendation } from '../../store/actions';
import { findVariantIdByOptions } from '../../utils/helper';
import { Footer, ShowHideProductDetail } from '../../components/Footer';
import ProductCardStyle1 from '../../components/ProductCardStyle';
import Notification from '../../components/NotificationComponent';
import HeaderComponent from '../../components/HeaderComponent';
import LoadingScreen from '../../components/LoadingView';
import SelectInput from '../../components/SelectInput';
import Button from '../../components/ButtonComponent';
import { COLORS, FONTS } from '../../constants/theme';
import { SUCCESS } from '../../store/actions/action.type';
import { CART_LINE_ITEM_ADD } from '../../store/constants';
import Sliders from '../../components/shared-components/sliders';
import SummaryDetail from '../../components/screens/product/summary.detail';
import ContentDetail from '../../components/screens/product/content.detail';

function ProductDetail(props) {
  const {
    navigation,
    route,
    cartId,
    CartGetList: cartGetList,
    getProductById: getProductId,
    getProductRecommendation: getRecommendation,
    CartLineItemAdd: cartLineItemAdd,
    cartLoading,
    type,
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
    variant_id: yup.string().required(),
    cartId: yup.string().required(),
  });

  const { id } = route.params;
  const screen = useWindowDimensions();
  const scrollViewRef = useRef(null);
  const [state, setState] = useState('idle');
  const [qty, setQty] = useState(1);
  const [errors, setErrors] = useState({});
  const [variantId, setVariantId] = useState('');
  const [onSubmitLoading, setOnSubmitLoading] = useState(false);
  const [isChangeId, setIsChangeId] = useState(false);
  const [randomProductsRecommendation, setRandomProductsRecommendation] = useState([]);
  const [notifState, setNotifState] = useState({
    show: false,
    text: '',
    navText: '',
    to: '',
  });
  const [selectedValue, setSelectedValue] = useState('');

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
  }, [isChangeId]);

  useEffect(() => {
    if (state === 'processing' && type === SUCCESS(CART_LINE_ITEM_ADD)) {
      setNotifState({
        show: true,
      });

      setTimeout(() => {
        setNotifState({ show: false, text: '', navText: '', to: '' });
      }, 5000);
      setErrors({});

      setvariantOptions({
        size: '',
        color: '',
      });

      cartGetList({
        first: 10,
        last: 0,
        id: cartId,
      });
      setState('idle');
    }
  }, [cartLoading, type]);

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
    setvariantOptions(prev => ({
      ...prev,
      [type]: value,
    }));
  };

  useEffect(() => {
    if (productData?.variants?.length > 0) {
      const varId = findVariantIdByOptions(productData?.variants, variantOptions);

      if (varId) {
        setVariantId(varId);
      } else {
        setVariantId('');
      }
    }
  }, [variantOptions]);

  const onSubmit = () => {
    setOnSubmitLoading(true);
    setState('processing');
    const body = {
      quantity: qty,
      size: variantOptions.size,
      color: variantOptions.color,
      variant_id: variantId || '',
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
        cartLineItemAdd(payload);
        setOnSubmitLoading(false);
      })
      .catch(error => {
        if (error.name === 'ValidationError') {
          if (error.inner.find(i => i.path === 'variant_id') || error.inner.find(i => i.path === 'cartId')) {
            if (error.inner.find(i => i.path === 'variant_id')) {
              Toast.show({
                type: 'error',
                text1: 'Variant not available for the selected options.',
                text2: 'Please choose different options.',
              });
            }
            if (error.inner.find(i => i.path === 'cartId')) {
              Toast.show({
                type: 'error',
                text1: 'The cart id is missing',
                text2: 'Please provide the valid ID',
              });
            }
          }
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.backgroundColor }}>
      <HeaderComponent
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 60,
          backgroundColor: COLORS.white,
        }}
        withoutCartAndLogo={false}
        backAction
        icon="back"
      />
      <ScrollView ref={scrollViewRef}>
        <View>
          {loading ? (
            <LoadingScreen type="circle" />
          ) : (
            <Sliders
              data={productData?.images.map(item => ({
                ...item,
                url: item?.node?.url ?? null,
              }))}
              keyUri={['url']}
              keyUnique={['id']}
              swiper={{
                height: 300,
              }}
            />
          )}
        </View>

        <View>
          <View style={styles.section}>
            <SummaryDetail
              data={productData}
              title={productData?.title ?? '-'}
              price={{
                regular: Number(amount.original_price) ?? 0,
                prefix: amount.currencyCode ?? '-',
                discount: amount.discounted_price
                  ? amount.original_price !== amount.discounted_price
                    ? Number(amount.discounted_price)
                    : false
                  : false,
                discount_prefix: '%',
              }}
            />

            <View style={{ height: 3, marginBottom: 15, width: '100%', backgroundColor: 'rgba(211,211,211,0.25)' }} />

            <ContentDetail data={productData} />

            <View style={{ width: '100%', marginTop: 10, paddingHorizontal: 15 }}>
              {Object.entries(options).map(([key, value]) => {
                return (
                  Array.isArray(value) &&
                  value.length > 0 && (
                    <View style={{ flex: 1 }} key={`product-detail-options-${key}`}>
                      <SelectInput
                        label={`Choose ${key}`}
                        name={key}
                        onSelect={val => onSelectValue(key, val)}
                        placeholder={`Choose ${key}`}
                        customDetail
                        errors={errors}
                        options={Array.isArray(value) && value.length > 0 ? value : []}
                        selectedValue={selectedValue}
                      />
                    </View>
                  )
                );
              })}

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
                  {`Quantity`}
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
              paddingHorizontal: 15,
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
              You May Also Like
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
                            width: screen.width / 2 - 25,
                            marginBottom: 20,
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                          }}
                        >
                          <ProductCardStyle1
                            onPress={() => {
                              setIsChangeId(prev => !prev);
                              setSelectedValue('');
                              navigation.navigate('ProductDetail', {
                                id: productRecommendationId,
                              });
                              scrollViewRef.current.scrollTo({ y: 0, animated: false });
                            }}
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

      <Notification visible={notifState.show} text={notifState.text} navText={notifState.navText} to={notifState.to} />

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          paddingHorizontal: 15,
          paddingVertical: 12,
        }}
      >
        <View style={{ width: '100%' }}>
          <Button
            onPress={onSubmit}
            title={onSubmitLoading || cartLoading ? 'Loading ...' : 'Add to Cart'}
            iconSize={20}
            iconName="shopping-bag"
            icon={FeatherIcon}
            disabled={onSubmitLoading || cartLoading}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default connect(
  ({ Cart, Product, User }) => {
    const { options } = Cart;
    const {
      collections: {
        detail: { data: productData, loading },
        recommendations: { data: recommendationProducts, loading: recommendationLoading },
      },
    } = Product;

    return {
      Product,
      cartId: options?.cartId,
      productData,
      loading,
      recommendationProducts,
      recommendationLoading,
      cartLoading: options?.loading,
      type: Cart?.type || '',
    };
  },
  { CartGetList, getProductById, getProductRecommendation, CartLineItemAdd }
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
    backgroundColor: COLORS.light, // Customize the background color
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
  },
});

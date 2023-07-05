import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { COLORS, FONTS } from '../../constants/theme';
import CartList from '../../components/CartList';
import LoadingScreen from '../../components/LoadingView';
import Modal from '../../components/ActionModalComponent';
import Header from '../../layout/Header';
import NoContent from '../../components/NoContent';
import { CartDeleteListOfItem, CartGetList, LoadUsers, CreateCheckout, resetNavigation } from '../../store/actions';
import Button from '../../components/ButtonComponent';

function CartScreen({ navigation, route, ...props }) {
  const { cartId, CartGetList, lists, CartDeleteListOfItem, CreateCheckout: createCheckout, userInfo, loading } = props;
  const dispatch = useDispatch();
  const navigationState = useSelector(state => state.Navigation.navigationState);
  const [isLoading, setIsLoading] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [note, setNote] = useState('');

  const [params] = useState({
    first: 0,
    id: cartId,
  });
  const [showModal, setShowModal] = useState({
    show: false,
    data: null,
  });

  useEffect(() => {
    if (navigationState.navigation) {
      setNote('');
      navigation.navigate(`${navigationState?.navigation}`);
      dispatch(resetNavigation());
    }
  }, [navigationState]);

  const handleDelete = async () => {
    setIsLoading(true);
    CartDeleteListOfItem({
      cartId,
      lineIds: showModal?.data?.lineIds ?? [],
    });

    setShowModal(prev => ({
      ...prev,
      data: null,
      show: !prev.show,
    }));
    setIsChange(!isChange);
    setIsLoading(false);
  };

  useEffect(() => {
    CartGetList({
      ...params,
      id: cartId,
    });
  }, [params, cartId]);

  const handleSubmit = () => {
    setIsLoading(true);
    if ([userInfo?.default].every(i => i !== undefined || i !== '')) {
      const body = {
        email: userInfo?.info.email,
        note,
        shippingAddress: {
          address1: userInfo?.default?.address1,
          city: userInfo?.default?.city,
          company: userInfo?.default?.company,
          province: userInfo?.default?.province,
          zip: userInfo?.default?.zip,
          country: userInfo?.default?.country,
          firstName: userInfo?.default?.firstName,
          lastName: userInfo?.default?.lastName,
        },
        lineItems: lists?.data?.map(i => ({
          variantId: i.merchandise.id,
          quantity: i.quantity,
        })),
      };

      createCheckout({
        variables: {
          input: body,
        },
      });
      setIsLoading(false);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Oops! Something Went Wrong',
        text2: 'Please complete the address information',
      });
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
      }}
    >
      <Modal
        text={`${showModal?.data?.title || ''} will be deleted from your cart`}
        onOpen={showModal.show}
        visible={showModal.show}
        toggle={() =>
          setShowModal(prev => ({
            ...prev,
            show: !prev.show,
          }))}
        submitText={isLoading ? 'Deleting ...' : 'Delete'}
        disabled={isLoading}
        onContinue={handleDelete}
      />

      <View style={{ paddingHorizontal: 20 }}>
        <Header backAction={() => navigation.goBack()} titleLeft title="Back" leftIcon="back" />
      </View>

      <Text
        style={{
          color: COLORS.title,
          fontSize: 24,
          ...FONTS.fontSatoshiBold,
          paddingHorizontal: 20,
          paddingTop: 20,
        }}
      >
        My Cart
      </Text>

      <View style={{ flex: 1, padding: 10 }}>
        <ScrollView>
          {lists?.loading ? (
            <LoadingScreen Loading2 />
          ) : lists?.data?.length === 0 ? (
            <View>
              <NoContent to={() => navigation.navigate('Home')} />
            </View>
          ) : (
            lists?.data?.length > 0 &&
            lists?.data?.map(data => {
              const {
                quantity,
                attributes,
                id: lineId,
                merchandise: {
                  id: merchandiseId,
                  image,
                  product: { id, title },
                },
                cost,
              } = data;

              return (
                <View key={`${lineId}-${id}`}>
                  <CartList
                    withIncrementDecrement
                    image={{ uri: image?.url }}
                    title={title}
                    size={
                      attributes.find(i => i.key.toLowerCase() === 'size' || i.key.toLowerCase() === 'sizes')?.value
                    }
                    color={attributes.find(i => i.key.toLowerCase() === 'color')?.value}
                    attributes={attributes.map(({ __typename, ...rest }) => rest)}
                    cartId={cartId}
                    quantity={quantity}
                    price={cost?.totalAmount?.amount}
                    originalPrice={cost?.compareAtAmountPerQuantity?.amount}
                    currencyCode={cost?.totalAmount?.currencyCode}
                    lineId={lineId}
                    setIsChange={setIsChange}
                    isChange={isChange}
                    merchandiseId={merchandiseId}
                    onPress={() => navigation.navigate('ProductDetail', { id })}
                    addComponent={
                      <Button
                        size="sm"
                        disabled={data?.loading ?? false}
                        title={
                          data?.loading ? (
                            <FeatherIcon name="loader" size={16} />
                          ) : (
                            <FeatherIcon name="trash-2" size={16} />
                          )
                        }
                        color={!data?.loading ? '#e63f31' : '#656565'}
                        style={{
                          // width: 60,
                          marginLeft: 10,
                          backgroundColor: !data?.loading ? '#fbfbfb' : 'rgba(101,101,101,0.18)',
                          borderColor: !data?.loading ? '#c42b1c' : '#656565',
                          borderWidth: 1,
                        }}
                        textStyle={{
                          color: !data?.loading ? '#c42b1c' : 'rgba(101,101,101,0.73)',
                          fontWeight: '900',
                        }}
                        onPress={() =>
                          setShowModal(prev => ({
                            data: { lineIds: [lineId], title },
                            show: !prev.show,
                          }))}
                      />
                    }
                  />
                </View>
              );
            })
          )}
          <View style={{ padding: 20 }}>
            <Text style={{ ...FONTS.fontSatoshiBold, marginBottom: 12 }}>Special Instruction</Text>
            <TextInput
              underlineColorAndroid="transparent"
              placeholder="Write Instruction Here..."
              placeholderTextColor="gray"
              numberOfLines={5}
              multiline
              onChangeText={val => setNote(val)}
              value={note}
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
            }}
          >
            <Button
              onPress={() => (lists?.data?.length > 0 ? handleSubmit() : null)}
              title={loading ? 'Loading ...' : 'Checkout'}
              size="xxl"
              icon={Ionicons}
              iconName="md-arrow-forward"
              textColor="#fff"
              disabled={isLoading || lists?.data?.length === 0}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default connect(
  ({ Cart, User, Checkout, Address }) => {
    const { options, lists } = Cart;

    const { options: userOptions } = User;
    const { data: defaultAddress } = Address.defaultAddress;
    const { loading } = Checkout.collections;
    const userInfo = { default: defaultAddress, ...userOptions };

    return {
      cartId: options?.cartId,
      lists,
      userInfo,
      loading,
    };
  },
  { CartDeleteListOfItem, CartGetList, LoadUsers, CreateCheckout }
)(React.memo(CartScreen));

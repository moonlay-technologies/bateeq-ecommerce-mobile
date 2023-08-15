/* eslint-disable react/no-children-prop */
import React, { useCallback, useRef, useState } from 'react';
import WebView from 'react-native-webview';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoadingScreen from '../../components/LoadingView';
import { findKey } from '../../utils/helper';
import Modal from '../../components/ActionModalComponent';
import HeaderComponent from '../../components/HeaderComponent';
import Environment from '../../config/Environment';
import ViewAddressList from '../../components/screens/checkout/address-list';
import { getAddressList, updateDefaultCustomerAddress, CreateCheckout } from '../../store/actions';
import { COLORS } from '../../constants/theme';

function CheckoutScreen({
  checkout,
  getAddressList: getAddress,
  updateDefaultCustomerAddress: updateDefaultAddress,
  token,
  actionLoading,
}) {
  const webViewRef = useRef(null);
  const navigation = useNavigation();
  const [route, setRoute] = useState('');
  const [showModal, setShowModal] = useState({
    show: false,
    data: null,
  });

  const [webViewKey, setWebViewKey] = useState(1);

  if (!checkout.data) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <LoadingScreen loading2 />
      </View>
    );
  }

  const handleClickWebView = useCallback(() => {
    setShowModal(prev => ({
      ...prev,
      show: !prev.show,
    }));
  }, []);

  const handleWebViewMessage = useCallback(
    event => {
      const { data } = event.nativeEvent;
      if (data.includes('ROUTE_NAME')) {
        const routeName = data.split(':')[1];
        const lastSlashIndex = routeName.lastIndexOf('/');
        const name = routeName.substring(lastSlashIndex);
        if (name) {
          setRoute(name);
        }
      }

      if (data === 'SHIPPING_BUTTON_CLICKED') {
        handleClickWebView();
      }
    },
    [handleClickWebView]
  );

  const handleRoute = () => {
    if (route.includes('information')) {
      navigation.navigate('Cart');
    } else if (webViewRef.current.goBack) {
      webViewRef.current.goBack();
    } else if (!webViewRef.current.goBack() && route.includes('shipping')) {
      navigation.navigate('Cart');
    }
  };

  const handleDefaultAddress = async () => {
    if (showModal.data) {
      try {
        await updateDefaultAddress({
          addressId: showModal.data?.id,
          customerAccessToken: token,
        });

        setShowModal({
          show: false,
          data: null,
        });

        webViewRef.current.clearCache(true);
        webViewRef.current.reload();
        setWebViewKey(prevKey => prevKey + 1);

        setTimeout(() => {
          getAddress({ token, limit: 10 });
          navigation.navigate('Cart');
        }, 1000);
      } catch (error) {
        console.error('Error updating default address:', error);
      }
    }
  };

  const handleOnLoadProgress = () => {
    const routeInject = `
    window.ReactNativeWebView.postMessage('ROUTE_NAME:' + window.location.pathname)
  `;
    webViewRef.current.injectJavaScript(routeInject);
  };

  return (
    <View style={{ flex: 1 }}>
      <HeaderComponent withoutCartAndLogo backAction backFunc={handleRoute} icon="back" title="Back" />
      <Modal
        title="Address"
        text={`${showModal?.data?.title ? `${showModal?.data?.title} will be` : 'choose'} your current address`}
        onOpen={showModal.show}
        visible={showModal.show}
        toggle={() =>
          setShowModal(prev => ({
            ...prev,
            show: !prev.show,
          }))}
        style={{
          position: 'relative',
          top: '35%',
        }}
        confirmBtnStyle={{
          backgroundColor: COLORS.info,
        }}
        children={<ViewAddressList setShowModal={setShowModal} />}
        submitText={actionLoading ? 'Loading ...' : 'Submit'}
        disabled={actionLoading}
        onContinue={handleDefaultAddress}
        withoutIcon
        checkoutSide
      />
      <WebView
        key={webViewKey}
        ref={webViewRef}
        cacheMode="LOAD_NO_CACHE"
        onMessage={handleWebViewMessage}
        source={{
          uri: findKey(checkout, ['data', 'webUrl']),

          headers: {
            'X-Shopify-Customer-Access-Token': token ?? null,
            'X-Shopify-Access-Token': Environment.AccessToken,
            'X-Shopify-Storefront-Access-Token': Environment.StorefrontToken,
          },
        }}
        style={{ flex: 1 }}
        onLoadProgress={handleOnLoadProgress}
      />
    </View>
  );
}

export default connect(
  ({ Checkout, User, Address }) => {
    const { options: userOptions } = User;
    const {
      collections: { checkout },
    } = Checkout;

    const { actionLoading } = Address;

    return { checkout, token: userOptions?.token, actionLoading };
  },
  { getAddressList, updateDefaultCustomerAddress, CreateCheckout }
)(CheckoutScreen);

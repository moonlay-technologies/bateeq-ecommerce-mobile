import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  CreateCheckout: createCheckout,
  token,
  actionLoading,
  ...props
}) {
  const webViewRef = useRef(null);
  const navigation = useNavigation();
  const [route, setRoute] = useState('');
  const [isChange, setIsChange] = useState(false);
  const [routeState, setRouteState] = useState('');
  const [showModal, setShowModal] = useState({
    show: false,
    data: null,
  });

  // console.log('checkout', checkout);
  // console.log('showModal', showModal);
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

      if (data.includes('CONTINUE_BUTTON') || data.includes('BACK_BUTTON')) {
        // waiting change the page

        setTimeout(() => {
          setIsChange(true);
        }, 1000);
      }
    },
    [handleClickWebView, route]
  );

  const initialJSInjected = `
  const shippingButton = document.querySelectorAll('a[aria-label="Change shipping address"]')
  
  if (shippingButton) {
      shippingButton.forEach(element => {
        const divElement = document.createElement('div');
        divElement.innerHTML = 'Change';
        divElement.className = 'shipping-button';
        divElement.onclick = () => {
          window.ReactNativeWebView.postMessage('SHIPPING_BUTTON_CLICKED');
        };
        divElement.style.fontSize = '12px'
        element.parentNode.replaceChild(divElement, element);
       });

    }

 window.ReactNativeWebView.postMessage('RENDERED')
  
  
  window.ReactNativeWebView.postMessage('ROUTE_NAME:' + window.location.pathname)`;

  const modifyWebContent = useCallback(() => {
    const script = `
    function handleClick(event) {
      const target = event.target;
      const continueButton = target.closest('.QT4by.rqC98.hodFu.VDIfJ.j6D1f.janiy');
      const backButton = target.closest('.QT4by.eVFmT.j6D1f.janiy.adBMs');

      if (continueButton) {
        window.ReactNativeWebView.postMessage('CONTINUE_BUTTON:');
      } 
      if (backButton) {

        window.ReactNativeWebView.postMessage('BACK_BUTTON:');
      }
    }
    document.addEventListener('click', handleClick);
    `;

    const routeInject = `
      window.ReactNativeWebView.postMessage('ROUTE_NAME:' + window.location.pathname)
    `;
    webViewRef.current.injectJavaScript(script);
    if (isChange) {
      webViewRef.current.injectJavaScript(routeInject);
      setIsChange(false);
    }

    if (route.includes('shipping') || route.includes('payment')) {
      const replaceChangeButton = `
      const shippingButton = document.querySelectorAll('a[aria-label="Change shipping address"]')
      if (shippingButton) {
        shippingButton.forEach(element => {
          const divElement = document.createElement('div');
          divElement.innerHTML = 'Change';
          divElement.className = 'shipping-button';
          divElement.onclick = () => {
            window.ReactNativeWebView.postMessage('SHIPPING_BUTTON_CLICKED');
          };
          divElement.style.fontSize = '12px'
          element.parentNode.replaceChild(divElement, element);
         });
      }

      window.ReactNativeWebView.postMessage('RENDERED' )
      `;
      setTimeout(() => {
        webViewRef?.current?.injectJavaScript(replaceChangeButton);
        setIsChange(false);
      }, 500);
    }
  }, [webViewRef, route, isChange]);

  const handleRoute = () => {
    if (route.includes('information')) {
      navigation.navigate('Cart');
    } else {
      webViewRef.current.goBack();
    }
  };

  useEffect(() => {
    modifyWebContent();
  }, [modifyWebContent, route]);

  const handleDefaultAddress = () => {
    if (showModal.data) {
      updateDefaultAddress({
        addressId: showModal.data?.id,
        customerAccessToken: token,
      });

      setShowModal({
        show: false,
        data: null,
      });
      webViewRef.current.reload();
      setTimeout(() => {
        getAddress({ token, limit: 10 });
        navigation.navigate('Cart');
      }, 1000);
    }
  };

  const handleNavigationStateChange = useCallback(
    navState => {
      setRouteState(navState);
      const replaceChangeButton = `
      const shippingButton = document.querySelectorAll('a[aria-label="Change shipping address"]')
      if (shippingButton) {
        shippingButton.forEach(element => {
          const divElement = document.createElement('div');
          divElement.innerHTML = 'Change';
          divElement.className = 'shipping-button';
          divElement.onclick = () => {
            window.ReactNativeWebView.postMessage('SHIPPING_BUTTON_CLICKED');
          };
          divElement.style.fontSize = '12px'
          element.parentNode.replaceChild(divElement, element);
         });
      }

      window.ReactNativeWebView.postMessage('RENDERED' )
      `;
      if (route.includes('shipping') || route.includes('payment')) {
        webViewRef.current.injectJavaScript(replaceChangeButton);
      }
    },
    [webViewRef, route]
  );

  console.log('checkout data', findKey(checkout, ['data', 'webUrl']));

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
          }))
        }
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
      />
      {/* setToLocalStorage */}
      <WebView
        ref={webViewRef}
        onMessage={handleWebViewMessage}
        injectedJavaScript={initialJSInjected}
        source={{
          uri: findKey(checkout, ['data', 'webUrl']),

          headers: {
            'X-Shopify-Customer-Access-Token': token ?? null,
            'X-Shopify-Access-Token': Environment.AccessToken,
            'X-Shopify-Storefront-Access-Token': Environment.StorefrontToken,
          },
        }}
        style={{ flex: 1 }}
        onLoadStart={() => {
          // console.log('load start');
        }}
        onLoadProgress={e => {
          // console.log('event onload', e);
          setIsChange(true);
        }}
        onNavigationStateChange={handleNavigationStateChange}
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

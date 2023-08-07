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
  const [webContentLoading, setWebContentLoading] = useState(false);
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
  console.log('route name', route);
  const handleWebViewMessage = useCallback(
    event => {
      const { data } = event.nativeEvent;
      console.log('datahandleWebViewMessage', data);
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
        const backOrContinueButton = data?.split('*')[1];
        console.log('dataaaCONTINUE_BUTTONorBACK_BUTTON', data);
        console.log('backOrContinueButton', backOrContinueButton);
        // if (backOrContinueButton) {

        // `);
        webViewRef.current.injectJavaScript(`
        window.location.href = ${backOrContinueButton}`);
        // .current.reload();
        // }
      }
    },
    [handleClickWebView]
  );
  // + window.location.pathname +
  // const submitFunction = button.getAttribute('onclick');
  const modifyWebContent = useCallback(() => {
    const script = `
    function handleClick(event) {
      const target = event.target;
      const continueButton = target.closest('.QT4by.rqC98.hodFu.VDIfJ.j6D1f.janiy');
      const backButton = target.closest('.QT4by.eVFmT.j6D1f.janiy.adBMs');

      if (continueButton) {
        const submitFunction = document.querySelector('button[type="submit"]');
        const href = continueButton.getAttribute('href');
        window.ReactNativeWebView.postMessage('CONTINUE_BUTTON*' + submitFunction.value + ":" + href + ":" + submitFunction);
      } 
      if (backButton) {
        const backButtonHref = backButton.href;
        window.ReactNativeWebView.postMessage('BACK_BUTTON*' + backButtonHref);
      }
    }
    document.addEventListener('click', handleClick);
    `;

    webViewRef.current.injectJavaScript(script);
  }, [webViewRef]);

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

  useEffect(() => {
    console.log('routewebContentLoading', [route, webContentLoading]);
    let replaceChangeButton = '';
    console.log('condition', [route.includes('shipping'), route.includes('payment'), !webContentLoading, isChange]);

    if ((route.includes('shipping') || route.includes('payment')) && !webContentLoading) {
      replaceChangeButton = `
      const shippingButton = document.querySelectorAll('a[aria-label="Change shipping address"]')
      const shippingButton2 = document.querySelectorAll('a[aria-label="Change shipping address"]')
      if (shippingButton) {
        shippingButton.forEach(element => {
          const divElement = document.createElement('div');
          divElement.innerHTML = 'Change';
          divElement.className = 'shipping-button';
          divElement.onclick = () => {
            window.ReactNativeWebView.postMessage('SHIPPING_BUTTON_CLICKED');
          };
          divElement.style.fontSize = '12px'
          divElement.setAttribute('aria-label', 'Change shipping address');
          element.parentNode.replaceChild(divElement, element);
         });
      }
      if (shippingButton2) {
        shippingButton2.forEach(element => {
          const divElement = document.createElement('div');
          divElement.innerHTML = 'Change';
          divElement.className = 'shipping-button';
          divElement.onclick = () => {
            window.ReactNativeWebView.postMessage('SHIPPING_BUTTON_CLICKED');
          };
          divElement.style.fontSize = '12px'
          divElement.setAttribute('aria-label', 'Change shipping address');
          element.parentNode.replaceChild(divElement, element);
         });
      }


      window.ReactNativeWebView.postMessage('RENDERED' )`;
    } else {
      replaceChangeButton = '';
    }
    webViewRef.current.injectJavaScript(replaceChangeButton);
  }, [webViewRef, route, webContentLoading, isChange]);

  const handleOnLoadStart = useCallback(() => {
    // handling load from web content is start loading then set true
    setWebContentLoading(true);
  }, []);

  const handleOnLoadEnd = useCallback(() => {
    // handling load from web content is start loading then set false
    setWebContentLoading(false);
  }, []);

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
      />
      {/* setToLocalStorage */}
      <WebView
        key={webViewKey}
        ref={webViewRef}
        cacheMode="LOAD_NO_CACHE"
        onMessage={handleWebViewMessage}
        // injectedJavaScript={initialJSInjected}
        source={{
          uri: findKey(checkout, ['data', 'webUrl']),

          headers: {
            'X-Shopify-Customer-Access-Token': token ?? null,
            'X-Shopify-Access-Token': Environment.AccessToken,
            'X-Shopify-Storefront-Access-Token': Environment.StorefrontToken,
          },
        }}
        style={{ flex: 1 }}
        onLoadStart={handleOnLoadStart}
        onLoadEnd={handleOnLoadEnd}
        onLoadProgress={handleOnLoadProgress}
        // onNavigationStateChange={handleNavigationStateChange}
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

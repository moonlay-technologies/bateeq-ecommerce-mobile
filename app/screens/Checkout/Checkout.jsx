import React, {useCallback, useEffect, useRef, useState} from 'react';
import WebView from 'react-native-webview';
import { connect } from 'react-redux';
import { View } from 'react-native';
import LoadingScreen from '../../components/LoadingView';
import { findKey } from '../../utils/helper';
import HeaderComponent from '../../components/HeaderComponent';
import Environment from "../../config/Environment";
import {useNavigation} from "@react-navigation/native";

function CheckoutScreen({ checkout,...props }) {
  const webViewRef = useRef(null);
  const navigation = useNavigation();
  const [route, setRoute] = useState('');

  if (!checkout.data) {
    return (
      <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <LoadingScreen loading2 />
      </View>
    );
  }

  const handleWebview = event => {
    const { data } = event.nativeEvent;
    if (data.includes('ROUTE_NAME')) {
      const routeName = data.split(':')[1];
      const lastSlashIndex = routeName.lastIndexOf('/');
      const name = routeName.substring(lastSlashIndex);

      if (name) {
        setRoute(name);
      }
    }
  };

  const routeInject = `
  function handleRouteChange() {
    const routeName = window.location.pathname;
    window.ReactNativeWebView.postMessage('ROUTE_NAME:' + routeName);
  }
  window.addEventListener('popstate', handleRouteChange);
  `;

  const goBack = useCallback(() => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
    }
  }, [navigation, route, webViewRef]);

  useEffect(() => {
    // Cleanup the listener when the component unmounts
    return () => {
      webViewRef.current.injectJavaScript(`
        window.removeEventListener('popstate', handleRouteChange);
      `);
    };
  }, [webViewRef]);

  return (
    <View style={{ flex: 1 }}>
      <HeaderComponent
        withoutCartAndLogo
        backAction
        backFunc={route === '/information' ? false : goBack}
        icon="back"
        title="Back"
      />

      <WebView
        ref={webViewRef}
        
        // startInLoadingState={true}
        // onLoadEnd={() => webviewEl.postPostMessage('red')}
        // onMessage={e => onTest(e)}
        injectedJavaScript={routeInject}
        onMessage={handleWebview}
        source={{
          uri: findKey(checkout, ['data', 'webUrl']),
          headers: {
            "X-Shopify-Customer-Access-Token":props?.User?.options?.token ?? null,
            "X-Shopify-Access-Token":Environment.AccessToken,
            "X-Shopify-Storefront-Access-Token":Environment.StorefrontToken
          }
        }}
        style={{ flex: 1 }}
      />
    </View>
  );
}

export default connect(({ Checkout }) => {
  const {
    collections: { checkout },
  } = Checkout;

  return { checkout };
}, {})(CheckoutScreen);

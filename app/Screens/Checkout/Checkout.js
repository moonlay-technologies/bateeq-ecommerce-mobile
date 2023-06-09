import React from 'react';
import WebView from 'react-native-webview';
import { useSelector } from 'react-redux';

function Checkout() {
  const checkoutStore = useSelector(state => state.checkout);

  return <WebView source={{ uri: checkoutStore?.checkoutData?.webUrl }} style={{ flex: 1 }} />;
}

export default Checkout;
import React from 'react';
import WebView from 'react-native-webview';
import { useSelector } from 'react-redux';

function Checkout() {
  const { webUrl } = useSelector(state => state.checkout);
  console.log('checkoutStore', webUrl);
  return <WebView source={{ uri: webUrl }} style={{ flex: 1 }} />;
}

export default Checkout;

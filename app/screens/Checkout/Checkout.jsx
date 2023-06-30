import React from 'react';
import WebView from 'react-native-webview';
import { connect } from 'react-redux';
import { View } from 'react-native';
import LoadingScreen from '../../components/LoadingView';
import { findKey } from '../../utils/helper';
import HeaderComponent from '../../components/HeaderComponent';

function CheckoutScreen({ checkout }) {
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

  return (
    <View style={{ flex: 1 }}>
      <HeaderComponent withoutCartAndLogo backAction icon="back" title="Back" />
      <WebView source={{ uri: findKey(checkout, ['data', 'webUrl']) }} style={{ flex: 1 }} />
    </View>
  );
}

export default connect(({ Checkout }) => {
  const {
    collections: { checkout },
  } = Checkout;

  return { checkout };
}, {})(CheckoutScreen);

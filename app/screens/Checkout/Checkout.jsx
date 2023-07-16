import React from 'react';
import WebView from 'react-native-webview';
import { connect } from 'react-redux';
import { View } from 'react-native';
import LoadingScreen from '../../components/LoadingView';
import { GetCheckoutId } from '../../store/actions/checkout';

function CheckoutScreen({ loading, checkout }) {
  if (loading) {
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
  return <WebView source={{ uri: checkout?.data?.webUrl }} style={{ flex: 1 }} />;
}

export default connect(
  ({ Checkout }) => {
    const {
      collections: { checkout, loading },
    } = Checkout;
    return { loading, checkout };
  },
  { GetCheckoutId }
)(CheckoutScreen);

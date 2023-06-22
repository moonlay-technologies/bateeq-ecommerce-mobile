import React from 'react';
import WebView from 'react-native-webview';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import LoadingScreen from '../../components/LoadingView';
import { GetCheckoutId } from '../../store/actions';
import {findKey} from "../../utils/helper";

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

    return <WebView source={{ uri: findKey(checkout,['data','webUrl']) }} style={{ flex: 1 }} />
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

import React from 'react';
import WebView from 'react-native-webview';
import {connect, useSelector} from 'react-redux';
import {View,Text} from "react-native";
import LoadingScreen from "../../components/LoadingView";

function Checkout({show,...props}) {

  if(show?.loading){
    return (
        <View style={{
          flex:1,
            justifyContent:'center',
            alignItems:'center',
        }}>
          <LoadingScreen loading2/>
        </View>
    )
  }
  return <WebView source={{ uri: show?.data?.webUrl }} style={{ flex: 1 }} />;
}

export default connect((state)=> {
  let { show } = state.Checkout
  return { show }
},{})(Checkout);

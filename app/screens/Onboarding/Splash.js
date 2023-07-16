import React, {useEffect} from 'react';
import {Image, ImageBackground, Text, View} from 'react-native';
import {COLORS, FONTS, IMAGES} from '../../constants/theme';
import {connect} from "react-redux";


const Splash = ({isAuthenticated,...props}) => {

    let timeout
    useEffect(() => {
        if(isAuthenticated){
            timeout = setTimeout(() => {
                props.navigation.navigate('Home')
            }, 4000);
        }else{
            timeout = setTimeout(() => {
                props.navigation.navigate('Onboarding')
            }, 4000);
        }
        return ()=> clearTimeout(timeout)
    }, [isAuthenticated]);

  return (
    <ImageBackground source={IMAGES.bg1} style={{flex: 1}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image
          style={{
            height: 100,
            resizeMode: 'contain',
          }}
          source={IMAGES.logo}
        />
      </View>
      <View style={{alignItems: 'center', paddingVertical: 15}}>
        <Text style={{...FONTS.h5, color: COLORS.primary}}>Wedo</Text>
        <Text style={{...FONTS.font, marginBottom: 4}}>Fashion Store App</Text>
        <Text style={{...FONTS.font}}>v1.0.0</Text>
      </View>
    </ImageBackground>
  );
};

export default connect(({Auth})=> {
    let { isAuthenticated } = Auth
    return {isAuthenticated}
})(Splash)

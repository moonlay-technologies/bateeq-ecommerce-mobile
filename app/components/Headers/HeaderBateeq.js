import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {COLORS, FONTS} from '../../constants/theme';
import {connect} from "react-redux";

const HeaderBateeq = ({signin,...props}) => {
    let { totalQuantity } = props
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('DrawerNavigation');
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 45,
        justifyContent: signin ? 'center' : 'space-between',
        backgroundColor: COLORS.white,
        // borderBottomWidth:1,
        // borderBottomColor:COLORS.borderColor,
      }}>
      {signin ? null : (
        <IconButton
          icon={() => (
            <View
              style={{
                // borderWidth:1,
                // borderColor:COLORS.borderColor,
                height: 30,
                width: 30,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
              }}>
              <FeatherIcon color={COLORS.title} size={18} name="menu" />
            </View>
          )}
          size={25}
          onPress={() => navigation.openDrawer()}
        />
      )}
      {/* <Text style={{...FONTS.fontSatoshiBold,color:COLORS.title,flex:1, fontSize: 18,justifyContent:'center',alignItems:'center', textAlign: 'center',marginLeft:5}}>bateeq</Text> */}
      <TouchableOpacity onPress={handlePress}>
        <Image
          style={{width: 70, height: 35}}
          source={require('../../assets/images/logo.png')}
        />
      </TouchableOpacity>
      {/* <IconButton
            icon={() => <FeatherIcon color={COLORS.title} size={20} name='search'/>}
            size={25}
            onPress={() => navigation.navigate('Search')}
        /> */}
      {/* <IconButton
            icon={() => <FeatherIcon color={COLORS.title} size={20} name='heart'/>}
            size={25}
            onPress={() => navigation.navigate('Wishlist')}
        /> */}
      {signin ? null : (
        <IconButton
          onPress={() => navigation.navigate('Cart')}
          icon={() => (
            <View>
              <FeatherIcon color={COLORS.title} size={20} name="shopping-bag" />
              <View
                style={{
                  height: 14,
                  width: 14,
                  borderRadius: 14,
                  backgroundColor: COLORS.primary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  top: -4,
                  right: -6,
                }}>
                <Text
                  style={{...FONTS.fontXs, fontSize: 10, color: COLORS.white}}>
                    {totalQuantity}
                </Text>
              </View>
            </View>
          )}
          size={25}
        />
      )}
    </View>
  );
};

export default connect(({Cart})=> {
    let { options } = Cart
    return { options,totalQuantity: options?.totalQuantity  }
},{})(React.memo(HeaderBateeq));

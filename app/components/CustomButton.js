import React from 'react';
import {
  // Image,
  // ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FeatherIcon from "react-native-vector-icons/Feather";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS} from '../constants/theme';

const CustomButton = ({
  disabled,
  btnSm,
  color,
  btnLight,
  outline,
  onPress,
  icon,
  textColor,
  customWidth,
  arrowIcon,
  wishlistIcon,
  bagIcon,
  title,
  logout,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.75}
      style={[
        {...styles.button},
        btnSm && {height: 40},
        color && {backgroundColor: color},
        btnLight && {backgroundColor: '#E6E6E6', elevation: 0},
        disabled && {backgroundColor: '#C9C9C9', elevation: 0},
        outline && {
          backgroundColor: 'transparent',
          elevation: 0,
          borderWidth: 1,
          borderColor: COLORS.title,
        },
        {width: customWidth},
      ]}
      onPress={() => (onPress ? onPress() : '')}>
      {icon ? (
        <View
          style={{
            position: 'absolute',
            left: 20,
          }}>
          {icon}
        </View>
      ) : null}

      <Text
        style={[
          {...FONTS.fontSatoshiBold, fontSize: 14, color: COLORS.white},
          btnLight && {color: '#646464'},
          textColor && {color: textColor},
          outline && {color: COLORS.title},
          logout && {textAlign: 'center', flex: 1},
        ]}>
        {title}
      </Text>
      {arrowIcon && (
        <Ionicons
          name="md-arrow-forward"
          size={12}
          color={COLORS.white}
          style={[{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 4,
            marginLeft: 18,
          }, logout && {paddingRight: 20}
        ]}
        />
      )}
      {wishlistIcon && (
        <FeatherIcon
          name="heart"
          size={16}
          color={COLORS.title}
          style={[{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 4,
            marginLeft: 18,
          }, logout && {paddingRight: 20}
        ]}
        />
      )}
      {bagIcon && (
        <FeatherIcon
          name="shopping-bag"
          size={16}
          color={COLORS.white}
          style={[{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 4,
            marginLeft: 18,
          }, logout && {paddingRight: 20}
        ]}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    flexDirection: 'row',
    // flex:1,
    // borderRadius:SIZES.radius,
    backgroundColor: '#333333',
    alignItems: 'center',
    // paddingHorizontal:28,
    // paddingVertical: 20,
    justifyContent: 'center',
    shadowColor: COLORS.title,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 8,
  },
});

export default CustomButton;

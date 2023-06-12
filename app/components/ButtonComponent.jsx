import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';

function Button(props) {
  const {
    onPress,
    style = {},
    color,
    textStyle,
    title,
    size = '',
    icon: Icon,
    iconName = '',
    iconSize = 18,
    iconColor = '',
    iconStyles = {
      flexDirection: 'row',
      marginLeft: 30,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 4,
    },
    disabled = false,
  } = props;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => (disabled ? null : onPress())}
      style={[
        style,
        size === 'lg' ? styles.lg : size === 'sm' ? styles.sm : size === 'xxl' ? styles.xxl : styles.default,
        {
          backgroundColor: style?.backgroundColor
            ? style.backgroundColor
            : color || (size === 'xxl' ? '#333333' : COLORS.primary),
        },
        { alignItems: 'center' },
        disabled && styles.disabled,
      ]}
      disabled={disabled}
    >
      {/* <FontAwesome5Icon name="circle-notch" color="#d0d0d0" solid /> */}
      <Text
        style={{
          ...(size === 'lg'
            ? styles.lgText
            : size === 'sm'
            ? styles.smText
            : size === 'xxl'
            ? styles.xxlText
            : { ...styles.defaultText }),
          color: textStyle?.color ? textStyle.color : COLORS.white,
          fontWeight: textStyle?.fontWeight ? textStyle.fontWeight : '500',
        }}
      >
        {title}
      </Text>
      {Icon && (
        <View style={iconStyles}>
          <Icon name={iconName} size={iconSize} color={iconColor || COLORS.white} />
        </View>
      )}
    </TouchableOpacity>
  );
}

export default Button;

const styles = StyleSheet.create({
  default: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  defaultText: {
    ...FONTS.h6,
  },
  lg: {
    paddingHorizontal: 10,
    paddingVertical: 16,
    borderRadius: 15,
  },
  lgText: {
    ...FONTS.h5,
    ...FONTS.fontPoppins,
  },
  sm: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: SIZES.radius_sm,
  },
  smText: {
    ...FONTS.fontSm,
    ...FONTS.fontPoppins,
  },
  xxl: {
    height: 50,
    width: 200,
    flexDirection: 'row',
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
  xxlText: {
    fontSize: 14,
    ...FONTS.fontSatoshiBold,
  },
  disabled: {
    opacity: 0.5,
  },
});

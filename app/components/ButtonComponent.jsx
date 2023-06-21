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
    outline,
  } = props;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => (disabled ? null : onPress())}
      style={[
        style,
        size === 'xs'
          ? styles.xs
          : size === 'sm'
          ? styles.sm
          : size === 'lg'
          ? styles.lg
          : size === 'xxl'
          ? styles.xxl
          : styles.default,
        {
          backgroundColor: style?.backgroundColor
            ? style.backgroundColor
            : color || (size === 'xxl' ? '#333333' : COLORS.black),
        },
        { alignItems: 'center' },
        disabled && { opacity: 0.7 },
        outline && { ...styles.outline, ...(style.borderColor && { borderColor: style.borderColor }) },
      ]}
      disabled={disabled}
    >
      {title && (
        <Text
          style={{
            ...(size === 'xs'
              ? styles.xsText
              : size === 'sm'
              ? styles.smText
              : size === 'lg'
              ? styles.lgText
              : size === 'xxl'
              ? styles.xxlText
              : { ...styles.defaultText }),
            color: textStyle?.color ? textStyle.color : outline ? COLORS.title : COLORS.white,
            fontWeight: textStyle?.fontWeight ? textStyle.fontWeight : '500',
          }}
        >
          {title}
        </Text>
      )}
      {Icon && (
        <View style={iconStyles}>
          <Icon name={iconName} size={iconSize} color={outline ? COLORS.title : iconColor || COLORS.white} />
        </View>
      )}
    </TouchableOpacity>
  );
}

export default Button;

const styles = StyleSheet.create({
  default: {
    height: 50,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  defaultText: {
    ...FONTS.fontSatoshiBold,
    fontSize: 14,
  },
  xs: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    width: 150,
    height: 50,
  },
  xsText: {
    ...FONTS.fontXs,
    ...FONTS.fontSatoshiBold,
    fontSize: 15,
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
  lg: {
    paddingHorizontal: 10,
    paddingVertical: 16,
    borderRadius: 15,
  },
  lgText: {
    ...FONTS.h5,
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
  outline: {
    backgroundColor: COLORS.transparent,
    elevation: 0,
    borderWidth: 1,
    borderColor: COLORS.title,
  },
});

import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';

function Button(props) {
  const { onPress, style, color, btnSquare, btnRounded, textColor, title, size = '' } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress && onPress()}
      style={
        (size === 'lg' ? styles.lg : size === 'sm' ? styles.sm : styles.default,
        {
          ...style,
          backgroundColor: color || COLORS.primary,
          alignItems: 'center',
        })
      }
    >
      <Text
        style={
          (size === 'lg' ? styles.lgText : size === 'sm' ? styles.smText : { ...styles.defaultText },
          [{ color: COLORS.white, ...(textColor && { color: textColor }) }])
        }
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default Button;

const styles = StyleSheet.create({
  default: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 30,
  },
  defaultText: {
    ...FONTS.h6,
  },
  lg: {
    paddingHorizontal: 10,
    paddingVertical: 16,
    borderRadius: 40,
  },
  lgText: {
    ...FONTS.h5,
    ...FONTS.fontPoppins,
  },
  sm: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 20,
  },
  smText: {
    ...FONTS.fontSm,
    ...FONTS.fontPoppins,
  },
});

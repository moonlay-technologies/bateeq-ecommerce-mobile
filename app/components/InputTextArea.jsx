import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { GlobalStyleSheet } from '../constants/StyleSheet';
import {COLORS, SIZES} from '../constants/theme';

/**
 *
 * @param placeholder
 * @param secureTextEntry
 * @param onSubmitEditing
 * @param handleInputChange
 * @param keyboardType
 * @param label
 * @param labelStyle
 * @param value
 * @param errors
 * @param numberOfLines
 * @param name
 * @param {object} props
 * @param {boolean} props.multiline
 * @param {boolean} props.editable
 * @returns {JSX.Element}
 * @constructor
 */
function Input({
  placeholder,
  secureTextEntry = false,
  onSubmitEditing,
  handleInputChange,
  keyboardType = 'none',
  label = '',
  labelStyle = {},
  value = '',
  errors = {},
  numberOfLines,
  name,
  ...props
}) {
  let {
    multiline = true,
    editable = true
  } = props
  const currentTheme = useSelector(state => state.Theme.mode);
  return (
    <View>
      <Text style={labelStyle || (currentTheme === 'dark' ? GlobalStyleSheet.label : GlobalStyleSheet.label)}>
        {label}
      </Text>
      <View
        style={{
          borderRadius: SIZES.radius_sm,
          backgroundColor: COLORS.white,
          borderColor: COLORS.title,
          borderWidth: 1
        }}
      >
        <TextInput
          editable={editable}
          multiline={multiline ?? true}
          // maxLength={40}
          keyboardType={keyboardType}
          placeholder={placeholder}
          defaultValue={value}
          secureTextEntry={secureTextEntry}
          onChangeText={handleInputChange}
          onSubmitEditing={onSubmitEditing}
          style={
            currentTheme === 'dark'
              ? { ...GlobalStyleSheet.formControl, ...styles.textArea }
              : { ...GlobalStyleSheet.formControl, ...styles.textArea }
          }
          placeholderTextColor={COLORS.label}
          numberOfLines={numberOfLines}
        />
      </View>
      <Text style={styles.error}>
        {Object.entries(errors).length > 0 && errors[name]?.includes('_')
          ? errors[name].split('_').join(' ')
          : errors[name]}
      </Text>
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  error: {
    color: COLORS.danger,
  },
  textArea: {
    height: 100,
    // backgroundColor:COLORS.danger,
    // borderColor: COLORS.title,
    borderWidth: 0,
    // padding: 10,
    textAlignVertical:"top",
    color: COLORS.title,
  },
});

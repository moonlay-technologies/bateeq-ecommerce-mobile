import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { GlobalStyleSheet } from '../constants/StyleSheet';
import { COLORS } from '../constants/theme';

function Input({
  placeholder,
  secureTextEntry = false,
  onSubmitEditing,
  handleInputChange,
  value = '',
  keyboardType = 'default',
  label = '',
  errors = {},
  numberOfLines,
  name,
}) {
  const currentTheme = useSelector(state => state.Theme.mode);
  return (
    <View style={GlobalStyleSheet.inputGroup}>
      <Text style={currentTheme === 'dark' ? GlobalStyleSheet.label : GlobalStyleSheet.label}>{label}</Text>
      <TextInput
        keyboardType={keyboardType}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        onChangeText={handleInputChange}
        defaultValue={value}
        onSubmitEditing={onSubmitEditing}
        style={[GlobalStyleSheet.formControl, currentTheme === 'dark' && { color: COLORS.black }]}
        placeholderTextColor={COLORS.label}
        numberOfLines={numberOfLines}
      />
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
});

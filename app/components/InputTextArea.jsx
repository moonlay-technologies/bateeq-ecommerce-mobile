import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { GlobalStyleSheet } from '../constants/StyleSheet';
import { COLORS } from '../constants/theme';

function Input({
  placeholder,
  secureTextEntry = false,
  onSubmitEditing,
  handleInputChange,
  keyboardType = 'none',
  label = '',
  value = '',
  errors = {},
  numberOfLines,
  name,
}) {
  return (
    <View style={GlobalStyleSheet.inputGroup}>
      <Text style={GlobalStyleSheet.label}>{label}</Text>
      <TextInput
        keyboardType={keyboardType}
        placeholder={placeholder}
        defaultValue={value}
        secureTextEntry={secureTextEntry}
        onChangeText={handleInputChange}
        onSubmitEditing={onSubmitEditing}
        style={{ ...GlobalStyleSheet.formControl, ...styles.textArea }}
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
  textArea: {
    height: 100,
    borderColor: COLORS.title,
    borderWidth: 1,
    padding: 10,
  },
});

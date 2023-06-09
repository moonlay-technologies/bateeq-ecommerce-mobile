import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {COLORS, FONTS, SIZES} from '../constants/theme';

const SelectInput = ({ 
  label, 
  options, 
  onSelect, 
  placeholder, 
  customDetail, 
  errors = {},
  name,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const handleSelect = option => {
    setSelectedOption(option);
    onSelect(option.value);
    setIsDropdownOpen(false);
  };

  return (
    <View style={styles.inputGroup}>
      <Text style={customDetail ? {color: COLORS.title, marginBottom: 8, ...FONTS.fontSatoshiBold} :styles.label}>{label}</Text>
      <TouchableOpacity
        style={
          customDetail
            ? {
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 12,
                paddingHorizontal: 16,
                backgroundColor: COLORS.input,
                borderWidth: 1,
                borderColor: COLORS.title,
              }
            : styles.select
        }
        onPress={() => setIsDropdownOpen(!isDropdownOpen)}>
        <Text style={styles.selectText}>
          {selectedOption
            ? selectedOption.label
            : placeholder
            ? placeholder
            : 'Select'}
        </Text>
        <AntDesignIcon
          name="caretdown"
          size={16}
          color={customDetail ? COLORS.title : COLORS.text}
        />
      </TouchableOpacity>
      {isDropdownOpen && (
        <View style={styles.optionsContainer}>
          {options?.map((option, idx) => (
            <TouchableOpacity
              key={option.value || idx}
              style={[
                styles.option,
                selectedOption &&
                  option.value === selectedOption.value &&
                  styles.selectedOption,
              ]}
              onPress={() => handleSelect(option)}>
              <Text
                style={[
                  styles.optionLabel,
                  selectedOption &&
                    option.value === selectedOption.value &&
                    styles.selectedOptionLabel,
                ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <Text style={styles.error}>{ Object.entries(errors).length > 0 && errors[name]}</Text>
    </View>
  );
};

export default SelectInput;

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: COLORS.label,
    marginBottom: 8,
  },
  select: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: COLORS.input,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.title,
  },
  selectText: {
    flex: 1,
    color: COLORS.text,
    marginRight: 10,
  },
  optionsContainer: {
    marginTop: 5,
    backgroundColor: COLORS.input,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    shadowColor: COLORS.title,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  optionLabel: {
    color: COLORS.title,
  },
  selectedOption: {
    backgroundColor: COLORS.title,
    color: COLORS.white,
  },
  selectedOptionLabel: {
    color: COLORS.white,
  },
  error: {
    color: 'red'
  },
});

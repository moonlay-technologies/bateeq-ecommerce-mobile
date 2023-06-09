import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { COLORS, FONTS, SIZES } from '../constants/theme';

const AsyncSelectComponent = ({
    label,
    options = [],
    onSelect,
    placeholder,
    onChange=()=>{},
    customDetail,
    errors = {},
    name,
    isEdit= true,
  }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(options);
  
    const handleSelect = option => {
      setSearchValue(option);
      setSelectedOption(option.value)
      onChange(option)
      onSelect(option?.label)
      setIsDropdownOpen(false);
    };

    const handleInputChange = (val) => {
      setSearchValue(val)
      filterOptions(val);
    };
  
    const filterOptions = (val) => {
      const filtered = options.filter((option) =>
        option.label.toLowerCase().includes(val.toLowerCase())
      );
      setFilteredOptions(filtered);
    };

    return (
      <View style={styles.inputGroup}>
        <Text style={customDetail ? { color: COLORS.title, marginBottom: 8, ...FONTS.fontSatoshiBold } : styles.label}>
          {label}
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={isEdit ? styles.select : {...styles.select, backgroundColor: '#aeaeae'}}
            placeholder={placeholder ?? label}
            onChangeText={handleInputChange}
            onTouchStart={() => setIsDropdownOpen(!isDropdownOpen)}
            onTouchCancel={() => setIsDropdownOpen(!isDropdownOpen)}
            value={searchValue?.label ?? searchValue }
            editable={isEdit}
          />
          <AntDesignIcon
            name="caretdown"
            onPress={() => setIsDropdownOpen(!isDropdownOpen)}
            size={16}
            style={styles.icon}
            color={customDetail ? COLORS.title : COLORS.text}
          />
        </View>
        {isDropdownOpen && (
          <View style={styles.optionsContainer}>
            {filteredOptions?.map((option, idx) => (
              <TouchableOpacity
                key={option.value || idx}
                style={[
                  styles.option,
                  selectedOption && option.value === selectedOption.value && styles.selectedOption,
                ]}
                onPress={() => handleSelect(option)}
              >
                <Text
                  style={[
                    styles.optionLabel,
                    selectedOption && option.value === selectedOption.value && styles.selectedOptionLabel,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <Text style={styles.error}>{Object.entries(errors).length > 0 && errors[name]}</Text>
      </View>
    );
  };
  
  export default AsyncSelectComponent;
  

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 20,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  icon: {
    width: '10%',
    padding: 10,
    borderWidth: 0.5,
    marginLeft: 5,
    borderColor: COLORS.title,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.input
  },
  label: {
    color: COLORS.label,
    marginBottom: 8,
  },
  select: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: COLORS.input,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.title,
  },
  selectText: {
    color: COLORS.text,
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
})



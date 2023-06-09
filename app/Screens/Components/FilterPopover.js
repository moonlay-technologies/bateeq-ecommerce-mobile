import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS} from '../../constants/theme';

const FilterPopover = ({onApplyFilters}) => {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [availabilityCheckboxes, setAvailabilityCheckboxes] = useState([
    {label: 'In Stock', checked: false},
    {label: 'Out of Stock', checked: false},
  ]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const togglePopover = () => {
    setIsPopoverVisible(!isPopoverVisible);
  };

  const handleAvailabilityCheckboxChange = index => {
    const updatedCheckboxes = [...availabilityCheckboxes];
    updatedCheckboxes[index].checked = !updatedCheckboxes[index].checked;
    setAvailabilityCheckboxes(updatedCheckboxes);
  };

  const applyFilters = () => {
    onApplyFilters({
      availability: availabilityCheckboxes,
      minPrice,
      maxPrice,
    });

    setIsPopoverVisible(false);
  };

  const closePopover = () => {
    setIsPopoverVisible(false);
  };

  return (
    <>
      <TouchableOpacity onPress={togglePopover} style={styles.button}>
        <Text style={styles.buttonText}>Filter</Text>
        <AntDesignIcon
          color={'#374957'}
          size={20}
          name="filter"
          style={{textAlign: 'center', marginVertical: 3}}
        />
      </TouchableOpacity>

      <Modal visible={isPopoverVisible} transparent animationType="fade">
        <TouchableOpacity style={styles.modalBackdrop} onPress={closePopover} />

        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>Availability</Text>
          {availabilityCheckboxes.map((checkbox, index) => (
            <View key={index} style={styles.checkboxContainer}>
              <CheckBox
                value={checkbox.checked}
                onValueChange={() => handleAvailabilityCheckboxChange(index)}
              />
              <Text style={styles.checkboxLabel}>{checkbox.label}</Text>
            </View>
          ))}

          <Text style={styles.modalHeader}>Price Range</Text>
          <View style={styles.priceRangeContainer}>
            <TextInput
              style={styles.priceInput}
              placeholder="Min Price"
              value={minPrice}
              onChangeText={setMinPrice}
              keyboardType="numeric"
            />
            <Text style={styles.priceSeparator}>-</Text>
            <TextInput
              style={styles.priceInput}
              placeholder="Max Price"
              value={maxPrice}
              onChangeText={setMaxPrice}
              keyboardType="numeric"
            />
          </View>

          {/* <Button title="Apply Filters" onPress={applyFilters} /> */}
          <TouchableOpacity
            style={{
              backgroundColor: '#333333',
              gap: 12,
              paddingVertical: 12,
              paddingHorizontal: 24,
              flexDirection: 'row',
              width: 'auto',
              justifyContent: 'center',
              alignItems: 'center',
              height: 48,
            }}
            onPress={applyFilters}>
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.fontSatoshiBold,
                textAlign: 'center',
                alignItems: 'center',
              }}>
              Apply Filters
            </Text>
            <Ionicons
              name="md-arrow-forward"
              size={12}
              color={COLORS.white}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 4,
                marginLeft: 18,
              }}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '30%',
    marginBottom: 10,
    marginHorizontal: 17,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    marginRight: 10,
    marginVertical: 3,
    color: 'black',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    position: 'absolute',
    top: 115,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  checkboxLabel: {
    marginLeft: 10,
  },
  priceRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  priceInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
    marginRight: 10,
  },
  priceSeparator: {
    fontSize: 18,
    marginRight: 5,
  },
});

export default FilterPopover;

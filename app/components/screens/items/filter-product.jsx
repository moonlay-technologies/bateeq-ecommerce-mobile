import React, { useState } from 'react';
import { Modal, View, Text, Switch, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';
import CheckBox from '@react-native-community/checkbox';

const FilterModal = ({ visible, onClose, onApplyFilter }) => {
  const [availability, setAvailability] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  const handleApplyFilter = () => {
    onApplyFilter({ availability, priceRange });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.modalContainer}>
        <Text style={styles.modalHeaderText}>Select Filter</Text>
        <View style={styles.filterOption1}>
          <Text style={styles.filterOptionText1}>Availability:</Text>
          <View style={{ flexDirection: 'row' }}>
            <CheckBox value={availability} onValueChange={setAvailability} style={styles.checkbox} />
            <Text style={{ marginTop: 6 }}>In Stock</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <CheckBox value={availability} onValueChange={setAvailability} style={styles.checkbox} />
            <Text style={{ marginTop: 6 }}>Out of Stock</Text>
          </View>
        </View>
        <View style={styles.filterOption}>
          <Text style={styles.filterOptionText}>Price Range:</Text>
          <TextInput
            style={styles.input}
            placeholder="Min"
            value={priceRange.min}
            onChangeText={text => setPriceRange(prevRange => ({ ...prevRange, min: text }))}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Max"
            value={priceRange.max}
            onChangeText={text => setPriceRange(prevRange => ({ ...prevRange, max: text }))}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onClose}>
            <Text style={[styles.buttonText, styles.cancelButton]}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleApplyFilter}>
            <Text style={[styles.buttonText, styles.applyButton]}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 120,
    borderColor: 'gray',
    borderWidth: 1,
  },
  modalHeaderText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  filterOption1: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  filterOptionText1: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
  },
  filterOptionText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
    flex: 1,
  },
  input: {
    width: 100,
    height: 36,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  cancelButton: {
    color: '#1f2937',
    fontWeight: 'bold',
  },
  applyButton: {
    backgroundColor: '#1f2937',
    color: '#ffffff',
    borderRadius: 4,
  },
});

export default FilterModal;

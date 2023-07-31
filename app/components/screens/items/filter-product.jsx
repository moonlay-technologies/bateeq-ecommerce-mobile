import React, { useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const FilterModal = ({
  visible,
  onClose,
  dataFilter,
  selectedProductTypes,
  priceRange,
  setPriceRange,
  setSelectedProductTypes,
}) => {
  const handleProductTypeChange = (productType, checked) => {
    if (checked) {
      setSelectedProductTypes(prev => [...prev, productType]);
    } else {
      setSelectedProductTypes(prev => prev.filter(type => type !== productType));
    }
  };

  const handlePressOutsideModal = () => {
    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <TouchableWithoutFeedback onPress={handlePressOutsideModal}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <View style={styles.modalContainer}>
        <Text style={styles.modalHeaderText}>Select Filter</Text>
        <View style={styles.filterOption1}>
          <Text style={styles.filterOptionText1}>Product type:</Text>
          {dataFilter &&
            dataFilter.filters &&
            dataFilter.filters[0].values.map(val => (
              <View style={{ flexDirection: 'row' }}>
                <CheckBox
                  value={selectedProductTypes.includes(val?.label)}
                  onValueChange={checked => handleProductTypeChange(val?.label, checked)}
                  style={styles.checkbox}
                  tintColors={{ true: 'black' }}
                />
                <Text style={{ marginTop: 6, color: 'black' }}>
                  {val?.label}
                  <Text style={{ fontWeight: 'bold' }}>{`(${val?.count})`}</Text>
                </Text>
              </View>
            ))}
          {/* <View style={{ flexDirection: 'row' }}>
            <CheckBox
              value={availability.outStock}
              onValueChange={text => setAvailability(prevRange => ({ ...prevRange, outStock: text }))}
              style={styles.checkbox}
              disabled={dataFilter && dataFilter.filters && dataFilter.filters[0]?.values[1].count < 1}
              tintColors={{ true: 'black' }}
            />
            <Text style={{ marginTop: 6, color: 'black' }}>
              {dataFilter && dataFilter.filters && dataFilter.filters[0]?.values[1].label}
              <Text style={{ fontWeight: 'bold' }}>
                {`(${dataFilter && dataFilter.filters && dataFilter.filters[0]?.values[1].count})`}
              </Text>
            </Text>
          </View> */}
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
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
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
  checkbox: {
    borderRadius: 12,
  },
});

export default FilterModal;

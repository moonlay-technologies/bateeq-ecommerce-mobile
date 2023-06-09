import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { COLORS, FONTS } from '../constants/theme';

const DeliveryOption = ({title, items, showChangeButton}) => {
  const [selectedValue, setSelectedValue] = useState(items[0].value);
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View style={styles.wrapperOption}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.headingOption}>{title}</Text>
        {showChangeButton && (
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <Text
              style={{
                color: 'grey',
                marginBottom: 12,
                ...FONTS.fontSatoshiRegular,
              }}>
              Change
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={itemValue => setSelectedValue(itemValue)}
          dropdownIconColor={'#D8D8D8'}>
          {items.map((item, index) => (
            <Picker.Item key={index} label={item.label} value={item.value} />
          ))}
        </Picker>
      </View>
      <Modal visible={isModalVisible} animationType="fade">
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeaderText}>Select Option</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedValue}
              onValueChange={itemValue => setSelectedValue(itemValue)}
              dropdownIconColor={'#D8D8D8'}>
              {items.map((item, index) => (
                <Picker.Item
                  key={index}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </Picker>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 30,
            }}>
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Text style={styles.modalHeaderCancel}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Text style={styles.modalHeaderDone}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#D8D8D8',
  },
  wrapperOption: {
    marginTop: 20,
  },
  headingOption: {
    marginBottom: 10,
    ...FONTS.fontSatoshiBold,
    color: COLORS.title,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    // backgroundColor: '#fff',
  },
  modalHeaderText: {
    fontSize: 16,
    ...FONTS.fontSatoshiBold,
    color: COLORS.title,
    marginBottom: 20,
  },
  modalHeaderCancel: {
    borderWidth: 1,
    borderColor: COLORS.title,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  modalHeaderDone: {
    borderWidth: 1,
    backgroundColor: COLORS.title,
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: COLORS.white,
  },
});

export default DeliveryOption;

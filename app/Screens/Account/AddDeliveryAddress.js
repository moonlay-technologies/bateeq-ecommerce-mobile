import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  // TouchableOpacity,
  View,
} from 'react-native';
import CustomButton from '../../components/CustomButton';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {COLORS, FONTS} from '../../constants/theme';
import Header from '../../layout/Header';
import SelectInput from '../../components/SelectInput';

const Country = [
  {label: 'indonesia', value: 'indonesia'},
  {label: 'Jepang', value: 'jepang'},
  {label: 'Malaysia', value: 'malaysia'},
];

const Province = [
  {label: 'DKI Jakarta', value: 'jakarta'},
  {label: 'Jawa Barat', value: 'jawabarat'},
  {label: 'Jawa Timur', value: 'jawatimur'},
];

const AddDeliveryAddress = ({navigation}) => {
  const [defaultAddress, setAddress] = useState('Home');
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleCountrySelect = value => {
    setSelectedCountry(value);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
      }}>
      <View style={{paddingHorizontal: 20}}>
        <Header titleLeft leftIcon={'back'} title={'Back'} />
      </View>
      <View style={{flex: 1}}>
        <ScrollView>
          <View style={GlobalStyleSheet.container}>
            <View
              style={{
                // borderBottomWidth:1,
                // borderBottomColor:COLORS.borderColor,
                paddingBottom: 10,
                marginBottom: 20,
              }}>
              <Text
                style={{
                  ...FONTS.fontSatoshiBold,
                  fontSize: 24,
                  color: COLORS.title,
                }}>
                Add Address
              </Text>
            </View>
            <View style={GlobalStyleSheet.inputGroup}>
              <Text style={GlobalStyleSheet.label}>First Name</Text>
              <TextInput
                style={GlobalStyleSheet.formControl}
                placeholder="e.g. John"
                placeholderTextColor={COLORS.label}
              />
            </View>
            <View style={GlobalStyleSheet.inputGroup}>
              <Text style={GlobalStyleSheet.label}>Last Name</Text>
              <TextInput
                style={GlobalStyleSheet.formControl}
                placeholder="e.g. Doe"
                placeholderTextColor={COLORS.label}
              />
            </View>
            <View style={GlobalStyleSheet.inputGroup}>
              <Text style={GlobalStyleSheet.label}>Phone Number</Text>
              <TextInput
                style={GlobalStyleSheet.formControl}
                placeholder="e.g. +628123456789"
                placeholderTextColor={COLORS.label}
              />
            </View>
            <View style={GlobalStyleSheet.inputGroup}>
              <Text style={GlobalStyleSheet.label}>Company</Text>
              <TextInput
                style={GlobalStyleSheet.formControl}
                placeholder="e.g. PT Bateeq"
                placeholderTextColor={COLORS.label}
              />
            </View>
            {/* <View style={GlobalStyleSheet.inputGroup}>
              <Text style={GlobalStyleSheet.label}>Address</Text>
              <TextInput
                style={{
                  backgroundColor: COLORS.input,
                  height: 100,
                  borderRadius: SIZES.radius,
                  borderWidth: 1,
                  borderColor: COLORS.borderColor,
                  padding: 12,
                }}
                placeholder="e.g. Jl. Sisingamangaraja No. 25, RT003 RW012"
                textAlignVertical="top"
                placeholderTextColor={COLORS.label}
                numberOfLines={5}
                multiline={true}
              />
            </View> */}
            <View style={{flex: 1, backgroundColor: COLORS.backgroundColor}}>
              <SelectInput
                label="Country"
                options={Country}
                onSelect={handleCountrySelect}
              />
            </View>
            <View style={{flex: 1, backgroundColor: COLORS.backgroundColor}}>
              <SelectInput
                label="Province"
                options={Province}
                onSelect={handleCountrySelect}
              />
            </View>
            <View style={GlobalStyleSheet.inputGroup}>
              <Text style={GlobalStyleSheet.label}>City</Text>
              <TextInput
                style={GlobalStyleSheet.formControl}
                placeholder="e.g. Jakarta Selatan"
                placeholderTextColor={COLORS.label}
              />
            </View>
            <View style={GlobalStyleSheet.inputGroup}>
              <Text style={GlobalStyleSheet.label}>Postal Code</Text>
              <TextInput
                style={GlobalStyleSheet.formControl}
                placeholder="e.g. 12190"
                placeholderTextColor={COLORS.label}
              />
            </View>
            {/* <View style={GlobalStyleSheet.inputGroup}>
              <Text style={GlobalStyleSheet.label}>Country</Text>
              <TextInput
                style={GlobalStyleSheet.formControl}
                placeholder="Country"
                placeholderTextColor={COLORS.label}
              />
            </View> */}
            {/* <View style={[GlobalStyleSheet.row]}>
              <View style={[GlobalStyleSheet.col50]}>
                <View style={GlobalStyleSheet.inputGroup}>
                  <Text style={GlobalStyleSheet.label}>City/District</Text>
                  <TextInput
                    style={GlobalStyleSheet.formControl}
                    placeholder="City/District"
                    placeholderTextColor={COLORS.label}
                  />
                </View>
              </View>
              <View style={[GlobalStyleSheet.col50]}>
                <View style={GlobalStyleSheet.inputGroup}>
                  <Text style={GlobalStyleSheet.label}>State</Text>
                  <TextInput
                    style={GlobalStyleSheet.formControl}
                    placeholder="State"
                    placeholderTextColor={COLORS.label}
                  />
                </View>
              </View>
            </View> */}
            {/* <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: COLORS.borderColor,
                paddingBottom: 10,
                marginBottom: 20,
              }}>
              <Text
                style={{...FONTS.font, ...FONTS.fontBold, color: COLORS.title}}>
                Save Address As
              </Text>
            </View> */}
            {/* <View
              style={{
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                onPress={() => setAddress('Home')}
                style={[
                  {
                    borderWidth: 1,
                    borderColor: COLORS.borderColor,
                    borderRadius: 30,
                    paddingHorizontal: 10,
                    paddingVertical: 2,
                    marginRight: 10,
                  },
                  defaultAddress === 'Home' && {
                    borderColor: COLORS.primary,
                  },
                ]}>
                <Text
                  style={[
                    {...FONTS.font, color: COLORS.title, paddingBottom: 2},
                    defaultAddress === 'Home' && {color: COLORS.primary},
                  ]}>
                  Home
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setAddress('Work')}
                style={[
                  {
                    borderWidth: 1,
                    borderColor: COLORS.borderColor,
                    borderRadius: 30,
                    paddingHorizontal: 10,
                    paddingVertical: 2,
                  },
                  defaultAddress === 'Work' && {
                    borderColor: COLORS.primary,
                  },
                ]}>
                <Text
                  style={[
                    {...FONTS.font, color: COLORS.title, paddingBottom: 2},
                    defaultAddress === 'Work' && {color: COLORS.primary},
                  ]}>
                  Work
                </Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </ScrollView>
      </View>
      <View
        style={[
          GlobalStyleSheet.container,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
        <CustomButton
          onPress={() => navigation.navigate('Address')}
          title={'Save Address'}
          customWidth={200}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddDeliveryAddress;

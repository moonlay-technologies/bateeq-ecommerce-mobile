import React, {useState, useEffect} from 'react';
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
// import SelectInput from '../../components/SelectInput';
import {gqlError} from '../../utils/error-handling';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {ADD_ADDRESS} from '../../service/graphql/mutation/profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Yup from 'yup';
import {useMutation, useQuery} from '@apollo/client';
import {Formik} from 'formik';
import {useDispatch} from 'react-redux';
import {setCustomerData} from '../../stores/reducers/customerReducer';
import {GET_DETAIL_ACCOUNT} from '../../service/graphql/query/profile/profile';

const ValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('Please input your first name'),
  lastName: Yup.string(),
  phone: Yup.string()
    .matches(
      /^(?:\+?\d{1,3}\s?)?(?:\(\d{1,}\)\s?)?(?:\d+(?:[-.\s]?)\d+)$/,
      'Please enter a valid phone number',
    )
    .required('Phone number is required'),
  company: Yup.string().required('Please input your company'),
  country: Yup.string().required('Please input your country'),
  province: Yup.string().required('Please input your province'),
  city: Yup.string().required('Please input your city'),
  zip: Yup.string().required('Please input your zip'),
  address1: Yup.string().required('Please input your address1'),
});

const AddDeliveryAddress = ({navigation}) => {
  const [isFocused, setIsFocused] = useState(false);
  const dispatch = useDispatch();
  const [accessToken, setAccessToken] = useState('');

  const initialValues = {
    firstName: '',
    lastName: '',
    phone: '',
    company: '',
    country: '',
    province: '',
    city: '',
    address1: '',
    zip: '',
  };

  const onError = err => {
    gqlError({error: err, Toast});
  };

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (token !== null) {
          setAccessToken(token);
        }
      } catch (error) {
        onError(error);
      }
    };

    getAccessToken();
  }, []);

  const [CustomerAddAddress] = useMutation(ADD_ADDRESS, {
    fetchPolicy: 'no-cache',
    variables: {
      address: '',
      customerAccessToken: accessToken,
    },
  });

  const {loading: loadingUpdate, refetch: updateAddressUser} = useQuery(GET_DETAIL_ACCOUNT, {
    fetchPolicy: 'no-cache',
    variables: {
      customerAccessToken: accessToken,
    },
    onCompleted: ({customer}) => {
      if (customer) {
        dispatch(setCustomerData(customer));
      }
    },
    onError: err => {
      onError(err);
    },
  });

  const handleOnSubmit = async values => {
    try {
      const {data} = await CustomerAddAddress({
        fetchPolicy: 'no-cache',
        variables: {
          address: values,
          customerAccessToken: accessToken,
        },
      });
      if (data.customerAddressCreate.customerAddress) {
        await updateAddressUser();
        Toast.show({
          type: 'success',
          text1: 'Create Address success',
          visibilityTime: 3000,
        });
        navigation.navigate('Address', {loading: loadingUpdate});
      } else {
        onError(data.customerAddressCreate.customerUserErrors[0].message);
      }
    } catch (error) {
      onError(error);
    }
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
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          handleOnSubmit(values);
        }}
        validationSchema={ValidationSchema}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          // setFieldValue,
          values,
          errors,
          touched,
        }) => (
          <>
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
                      style={[
                        GlobalStyleSheet.formControl,
                        {...FONTS.font, color: COLORS.title},
                      ]}
                      placeholder="e.g. John"
                      placeholderTextColor={COLORS.label}
                      value={values.firstName}
                      onChangeText={handleChange('firstName')}
                      onFocus={() => setIsFocused(true)}
                      onBlur={handleBlur('firstName')}
                    />
                    {touched.firstName && errors.firstName && (
                      <Text style={GlobalStyleSheet.errorMessage}>
                        {errors.firstName}
                      </Text>
                    )}
                  </View>
                  <View style={GlobalStyleSheet.inputGroup}>
                    <Text style={GlobalStyleSheet.label}>Last Name</Text>
                    <TextInput
                      style={[
                        GlobalStyleSheet.formControl,
                        {...FONTS.font, color: COLORS.title},
                      ]}
                      placeholderTextColor={COLORS.label}
                      value={values.lastName}
                      onChangeText={handleChange('lastName')}
                      onFocus={() => setIsFocused(true)}
                      onBlur={handleBlur('lastName')}
                      placeholder="e.g. Doe"
                    />
                    {touched.lastName && errors.lastName && (
                      <Text style={GlobalStyleSheet.errorMessage}>
                        {errors.lastName}
                      </Text>
                    )}
                  </View>
                  <View style={GlobalStyleSheet.inputGroup}>
                    <Text style={GlobalStyleSheet.label}>Phone Number</Text>
                    <TextInput
                      style={[
                        GlobalStyleSheet.formControl,
                        {...FONTS.font, color: COLORS.title},
                      ]}
                      placeholder="e.g. +628123456789"
                      placeholderTextColor={COLORS.label}
                      value={values.phone || '+628'}
                      onChangeText={handleChange('phone')}
                      onFocus={() => setIsFocused(true)}
                      onBlur={handleBlur('phone')}
                    />
                    {touched.phone && errors.phone && (
                      <Text style={GlobalStyleSheet.errorMessage}>
                        {errors.phone}
                      </Text>
                    )}
                  </View>
                  <View style={GlobalStyleSheet.inputGroup}>
                    <Text style={GlobalStyleSheet.label}>Company</Text>
                    <TextInput
                      style={[
                        GlobalStyleSheet.formControl,
                        {...FONTS.font, color: COLORS.title},
                      ]}
                      placeholder="e.g. PT Bateeq"
                      placeholderTextColor={COLORS.label}
                      value={values.company}
                      onChangeText={handleChange('company')}
                      onFocus={() => setIsFocused(true)}
                      onBlur={handleBlur('company')}
                    />
                    {touched.company && errors.company && (
                      <Text style={GlobalStyleSheet.errorMessage}>
                        {errors.company}
                      </Text>
                    )}
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
                  {/* <View style={{flex: 1, backgroundColor: COLORS.backgroundColor}}> */}
                  <View style={GlobalStyleSheet.inputGroup}>
                    {/* <SelectInput
                label="Country"
                options={Country}
                onSelect={handleCountrySelect}
              /> */}
                    <Text style={GlobalStyleSheet.label}>Country</Text>
                    <TextInput
                      style={[
                        GlobalStyleSheet.formControl,
                        {...FONTS.font, color: COLORS.title},
                      ]}
                      placeholder="e.g. Indonesia"
                      placeholderTextColor={COLORS.label}
                      value={values.country}
                      onChangeText={handleChange('country')}
                      onFocus={() => setIsFocused(true)}
                      onBlur={handleBlur('country')}
                    />
                    {touched.country && errors.country && (
                      <Text style={GlobalStyleSheet.errorMessage}>
                        {errors.country}
                      </Text>
                    )}
                  </View>
                  {/* <View style={{flex: 1, backgroundColor: COLORS.backgroundColor}}> */}
                  <View style={GlobalStyleSheet.inputGroup}>
                    {/* <SelectInput
                label="Province"
                options={Province}
                onSelect={handleCountrySelect}
              /> */}
                    <Text style={GlobalStyleSheet.label}>Province</Text>
                    <TextInput
                      style={[
                        GlobalStyleSheet.formControl,
                        {...FONTS.font, color: COLORS.title},
                      ]}
                      placeholder="e.g. Jawa Barat"
                      placeholderTextColor={COLORS.label}
                      value={values.province}
                      onChangeText={handleChange('province')}
                      onFocus={() => setIsFocused(true)}
                      onBlur={handleBlur('province')}
                    />
                    {touched.province && errors.province && (
                      <Text style={GlobalStyleSheet.errorMessage}>
                        {errors.province}
                      </Text>
                    )}
                  </View>
                  <View style={GlobalStyleSheet.inputGroup}>
                    <Text style={GlobalStyleSheet.label}>City</Text>
                    <TextInput
                      style={[
                        GlobalStyleSheet.formControl,
                        {...FONTS.font, color: COLORS.title},
                      ]}
                      placeholder="e.g. Jakarta Selatan"
                      placeholderTextColor={COLORS.label}
                      value={values.city}
                      onChangeText={handleChange('city')}
                      onFocus={() => setIsFocused(true)}
                      onBlur={handleBlur('city')}
                    />
                    {touched.city && errors.city && (
                      <Text style={GlobalStyleSheet.errorMessage}>
                        {errors.city}
                      </Text>
                    )}
                  </View>
                  <View style={GlobalStyleSheet.inputGroup}>
                    <Text style={GlobalStyleSheet.label}>Address</Text>
                    <TextInput
                      style={[
                        GlobalStyleSheet.formControl,
                        {...FONTS.font, color: COLORS.title},
                      ]}
                      placeholder="e.g. Jalan maung biru"
                      placeholderTextColor={COLORS.label}
                      value={values.address1}
                      onChangeText={handleChange('address1')}
                      onFocus={() => setIsFocused(true)}
                      onBlur={handleBlur('address1')}
                    />
                    {touched.address1 && errors.address1 && (
                      <Text style={GlobalStyleSheet.errorMessage}>
                        {errors.address1}
                      </Text>
                    )}
                  </View>
                  <View style={GlobalStyleSheet.inputGroup}>
                    <Text style={GlobalStyleSheet.label}>Postal Code</Text>
                    <TextInput
                      style={[
                        GlobalStyleSheet.formControl,
                        {...FONTS.font, color: COLORS.title},
                      ]}
                      placeholder="e.g. 12190"
                      placeholderTextColor={COLORS.label}
                      value={values.zip}
                      onChangeText={handleChange('zip')}
                      onFocus={() => setIsFocused(true)}
                      onBlur={handleBlur('zip')}
                    />
                    {touched.zip && errors.zip && (
                      <Text style={GlobalStyleSheet.errorMessage}>
                        {errors.zip}
                      </Text>
                    )}
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
                onPress={handleSubmit}
                title={'Save Address'}
                customWidth={200}
              />
            </View>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default AddDeliveryAddress;

import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { Formik } from 'formik';
import CustomButton from '../../components/CustomButton';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS } from '../../constants/theme';
import Header from '../../layout/Header';
import { AuthenApi } from '../../service/shopify-login';

function EditProfile(props) {
  const [dataAccount, setDataAccount] = useState(null);
  const [isFocused, setisFocused] = useState(false);
  const [isFocused2, setisFocused2] = useState(false);
  const [isFocused3, setisFocused3] = useState(false);
  const [isFocused4, setisFocused4] = useState(false);

  const initialValues = {
    customer: {
      email: '',
      phone: '',
      default_address: {
        name: '',
        address1: '',
      },
    },
  };

  useEffect(() => {
    getDetailAccount();
  }, []);

  const getDetailAccount = async () => {
    const customerId = await AsyncStorage.getItem('customerIdString');
    const token = await AsyncStorage.getItem('tokenAccess');
    console.log('token', token);

    AuthenApi.getDataAccount(customerId)
      .then(res => {
        setDataAccount(res.customer);
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  const validateForm = values => {
    const errors = {};

    if (!values.customer.default_address.name) {
      errors.customer = {
        ...errors.customer,
        default_address: {
          ...errors.customer?.default_address,
          name: 'Required',
        },
      };
    }

    if (!values.customer.default_address.address1) {
      errors.customer = {
        ...errors.customer,
        default_address: {
          ...errors.customer?.default_address,
          address1: 'Required',
        },
      };
    }

    if (!values.customer.default_address.phone) {
      errors.customer = {
        ...errors.customer,
        default_address: {
          ...errors.customer?.default_address,
          phone: 'Required',
        },
      };
    }

    if (!values.customer.email) {
      errors.customer = {
        ...errors.customer,
        email: 'Required',
      };
    }

    return errors;
  };

  // const handleOnSubmit = async(values) => {
  //   const customerId = await AsyncStorage.getItem('customerIdString');
  //   // console.log('Mobile Number:', values.customer.default_address.phone);
  //   // console.log('Full Name:', values.customer.default_address.name);
  //   // console.log('Email:', values.customer.email);
  //   // console.log('Location:', values.customer.default_address.address1);
  //   AuthenApi.update(customerId, {
  //   })
  //   console.log('Values:', values);
  // };

  const handleOnSubmit = async values => {
    const customerId = await AsyncStorage.getItem('customerIdString');

    const changedValues = {};

    // Compare with initial values and extract changed fields
    if (values.customer.email !== initialValues.customer.email) {
      changedValues.customer = {
        ...changedValues.customer,
        phone: values.customer.email,
      };
    }
    if (values.customer.phone !== initialValues.customer.phone) {
      changedValues.customer = {
        ...changedValues.customer,

        phone: values.customer.default_address.phone,
      };
    }

    if (values.customer.default_address.name !== initialValues.customer.default_address.name) {
      changedValues.customer = {
        ...changedValues.customer,
        default_address: {
          ...changedValues.customer?.default_address,
          name: values.customer.default_address.name,
        },
      };
    }

    if (values.customer.default_address.address1 !== initialValues.customer.default_address.address1) {
      changedValues.customer = {
        ...changedValues.customer,
        default_address: {
          ...changedValues.customer?.default_address,
          address1: values.customer.default_address.name,
        },
      };
    }

    AuthenApi.update(customerId, changedValues)
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Save data success',
          visibilityTime: 3000,
        });
        props.navigation.navigate('Profile');
      })
      .catch(e => {
        Toast.show({
          type: 'error',
          text1: e,
          visibilityTime: 3000,
        });
      });

    // Repeat the same process for other fields if needed

    // console.log('changeValue', changedValues)
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
      }}
    >
      <View style={{ paddingHorizontal: 20 }}>
        <Header titleLeft leftIcon="back" title="Manage Profile" />
      </View>
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          handleOnSubmit(values);
        }}
        validate={validateForm}
      >
        {({
          handleChange,
          handleBlur,
          // handleSubmit,
          // setFieldValue,
          values,
          // errors,
          // touched,
        }) => (
          <>
            <View style={{ flex: 1 }}>
              <ScrollView>
                <View style={GlobalStyleSheet.container}>
                  <View style={GlobalStyleSheet.inputGroup}>
                    <Text style={GlobalStyleSheet.label}>Mobile Number</Text>
                    <TextInput
                      style={[GlobalStyleSheet.formControl, isFocused && GlobalStyleSheet.activeInput]}
                      defaultValue={dataAccount?.phone}
                      onChangeText={handleChange('customer.phone')}
                      onFocus={() => setisFocused(true)}
                      onBlur={handleBlur('customer.phone')}
                      placeholder="Type Mobile number"
                      placeholderTextColor={COLORS.label}
                    />
                  </View>
                  <View style={GlobalStyleSheet.inputGroup}>
                    <Text style={GlobalStyleSheet.label}>Full Name</Text>
                    <TextInput
                      style={[GlobalStyleSheet.formControl, isFocused2 && GlobalStyleSheet.activeInput]}
                      defaultValue={dataAccount?.default_address?.name}
                      onChangeText={handleChange('customer.default_address.name')}
                      onFocus={() => setisFocused2(true)}
                      onBlur={handleBlur('customer.default_address.name')}
                      placeholder="Type your name"
                      placeholderTextColor={COLORS.label}
                    />
                  </View>
                  <View style={GlobalStyleSheet.inputGroup}>
                    <Text style={GlobalStyleSheet.label}>Email</Text>
                    <TextInput
                      style={[GlobalStyleSheet.formControl, isFocused3 && GlobalStyleSheet.activeInput]}
                      defaultValue={dataAccount?.email}
                      onChangeText={handleChange('customer.email')}
                      onFocus={() => setisFocused3(true)}
                      onBlur={handleBlur('customer.email')}
                      placeholder="Type your email"
                      placeholderTextColor={COLORS.label}
                    />
                  </View>
                  <View style={GlobalStyleSheet.inputGroup}>
                    <Text style={GlobalStyleSheet.label}>Location</Text>
                    <TextInput
                      style={[
                        GlobalStyleSheet.formControl,
                        isFocused4 && GlobalStyleSheet.activeInput,
                        { height: 80, textAlignVertical: 'top' },
                      ]}
                      defaultValue={`${dataAccount?.default_address?.address1 || ''} ${
                        dataAccount?.default_address?.city || ''
                      } ${dataAccount?.default_address?.province || ''}`}
                      onChangeText={handleChange('customer.default_address.address1')}
                      onFocus={() => setisFocused4(true)}
                      multiline
                      onBlur={handleBlur('customer.default_address.address1')}
                      placeholder="Type your location"
                      placeholderTextColor={COLORS.label}
                    />
                  </View>
                </View>
              </ScrollView>
              <CustomButton title="Save Details" onPress={() => handleOnSubmit(values)} />
            </View>
            {/* <View style={GlobalStyleSheet.container}> */}
            {/* </View> */}
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
}

export default EditProfile;

import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, Text, TextInput, View} from 'react-native';
import CustomButton from '../../components/CustomButton';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {COLORS, FONTS} from '../../constants/theme';
import Header from '../../layout/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {Formik} from 'formik';
import {useMutation} from '@apollo/client';
import {EDIT_DETAIL_ACCOUNT} from '../../service/graphql/mutation/profile';
import {gqlError} from '../../utils/error-handling';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setCustomerData} from '../../stores/reducers/customerReducer';


const EditProfile = ({props, route}) => {
  // const {dataAccount, setDataAccount} = route.params;
  const navigation = useNavigation();
  // const [dataAccount, setDataAccount] = useState(null);
  const [isFocused, setisFocused] = useState(false);
  const [isFocused2, setisFocused2] = useState(false);
  const [isFocused3, setisFocused3] = useState(false);
  const [isFocused4, setisFocused4] = useState(false);
  const dispatch = useDispatch();
  const dataAccount = useSelector(state => state.customer.customerData);

  const [CustomerUpdateDetailAccount] = useMutation(EDIT_DETAIL_ACCOUNT, {
    fetchPolicy: 'no-cache',
    variables: {
      customer: '',
      customerAccessToken: '',
    },
  });

  const initialValues = {
    email: dataAccount?.email || '',
    firstName: dataAccount?.firstName || '',
    lastName: dataAccount?.lastName || '',
    phone: dataAccount?.phone || '',
  };

  const ValidationSchema = Yup.object().shape({
    firstName: Yup.string().required('Please input your first name'),
    lastName: Yup.string(),
    phone: Yup.string()
      .matches(
        /^(?:\+?\d{1,3}\s?)?(?:\(\d{1,}\)\s?)?(?:\d+(?:[-.\s]?)\d+)$/,
        'Please enter a valid phone number',
      )
      .required('Phone number is required'),
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please enter a valid email',
      )
      .required('Email Address is required'),
  });

  const onError = err => {
    gqlError({error: err, Toast});
  };

  const handleOnSubmit = async values => {
    const accessToken = await AsyncStorage.getItem('accessToken');

    try {
      const {data} = await CustomerUpdateDetailAccount({
        fetchPolicy: 'no-cache',
        variables: {
          customer: values,
          customerAccessToken: accessToken,
        },
      });

      if (data.customerUpdate.customer) {
        dispatch(setCustomerData(data.customerUpdate.customer));
        Toast.show({
          type: 'success',
          text1: 'Save data success',
          visibilityTime: 3000,
        });
        navigation.navigate('Profile');
      } else {
        onError(data.customerUpdate.customerUserErrors[0].message);
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
        <Header titleLeft leftIcon={'back'} title={'Manage Profile'} />
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
                  <View style={GlobalStyleSheet.inputGroup}>
                    <Text style={GlobalStyleSheet.label}>Mobile Number</Text>
                    <TextInput
                      style={[
                        GlobalStyleSheet.formControl,
                        isFocused && GlobalStyleSheet.activeInput,
                        {...FONTS.font, color: COLORS.title}
                      ]}
                      value={values.phone || '+628'}
                      onChangeText={handleChange('phone')}
                      onFocus={() => setisFocused(true)}
                      onBlur={handleBlur('phone')}
                      placeholder="Type Mobile number"
                      placeholderTextColor={COLORS.label}
                    />
                    {touched.phone && errors.phone && (
                      <Text style={GlobalStyleSheet.errorMessage}>
                        {errors.phone}
                      </Text>
                    )}
                  </View>
                  <View style={GlobalStyleSheet.inputGroup}>
                    <Text style={GlobalStyleSheet.label}>First Name</Text>
                    <TextInput
                      style={[
                        GlobalStyleSheet.formControl,
                        isFocused2 && GlobalStyleSheet.activeInput,
                        {...FONTS.font, color: COLORS.title}
                      ]}
                      value={values.firstName}
                      onChangeText={handleChange('firstName')}
                      onFocus={() => setisFocused2(true)}
                      onBlur={handleBlur('firstName')}
                      placeholder="Type your firstName"
                      placeholderTextColor={COLORS.label}
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
                        isFocused2 && GlobalStyleSheet.activeInput,
                        {...FONTS.font, color: COLORS.title}
                      ]}
                      value={values.lastName}
                      onChangeText={handleChange('lastName')}
                      onFocus={() => setisFocused2(true)}
                      onBlur={handleBlur('lastName')}
                      placeholder="Type your firstName"
                      placeholderTextColor={COLORS.label}
                    />
                    {touched.lastName && errors.lastName && (
                      <Text style={GlobalStyleSheet.errorMessage}>
                        {errors.lastName}
                      </Text>
                    )}
                  </View>
                  <View style={GlobalStyleSheet.inputGroup}>
                    <Text style={GlobalStyleSheet.label}>Email</Text>
                    <TextInput
                      style={[
                        GlobalStyleSheet.formControl,
                        isFocused3 && GlobalStyleSheet.activeInput,
                        {...FONTS.font, color: COLORS.title}
                      ]}
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onFocus={() => setisFocused3(true)}
                      onBlur={handleBlur('email')}
                      placeholder="Type your email"
                      placeholderTextColor={COLORS.label}
                    />
                    {touched.email && errors.email && (
                      <Text style={GlobalStyleSheet.errorMessage}>
                        {errors.email}
                      </Text>
                    )}
                  </View>
                  <View style={GlobalStyleSheet.inputGroup}>
                    <Text style={GlobalStyleSheet.label}>Location</Text>
                    <TextInput
                      style={[
                        GlobalStyleSheet.formControl,
                        isFocused4 && GlobalStyleSheet.activeInput,
                        {height: 80, textAlignVertical: 'top', ...FONTS.font, color: COLORS.title},
                      ]}
                      value={dataAccount?.defaultAddress?.address1 || ''}
                      onFocus={() => setisFocused4(true)}
                      multiline={true}
                      placeholder=""
                      placeholderTextColor={COLORS.label}
                      editable={false}
                    />
                  </View>
                </View>
              </ScrollView>
              <CustomButton title={'Save Details'} onPress={handleSubmit} />
            </View>
            {/* <View style={GlobalStyleSheet.container}> */}
            {/* </View> */}
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default EditProfile;

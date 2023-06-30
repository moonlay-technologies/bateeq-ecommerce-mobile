import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import Header from '../../layout/Header';
import { gqlError } from '../../utils/eror-handling';
import { UpdateAccount } from '../../store/actions/user';
import Button from '../../components/ButtonComponent';
import { resetNavigation } from '../../store/actions';

function EditProfile({ route, ...props }) {
  const { options, collections, UpdateAccount: updateAccount } = props;
  const navigationState = useSelector(state => state.Navigation.navigationState);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isFocused, setisFocused] = useState(false);
  const [isFocused2, setisFocused2] = useState(false);
  const [isFocused3, setisFocused3] = useState(false);
  const [isFocused4, setisFocused4] = useState(false);

  const initialValues = {
    email: options?.info?.email || '',
    firstName: options?.info?.firstName || options?.info?.first_name || '',
    lastName: options?.info?.lastName || options?.info?.last_name || '',
    phone: options?.info?.phone || '',
  };

  const ValidationSchema = Yup.object().shape({
    firstName: Yup.string().required('Please input your first name'),
    lastName: Yup.string(),
    phone: Yup.string()
      .matches(/^(?:\+?\d{1,3}\s?)?(?:\(\d{1,}\)\s?)?(?:\d+(?:[-.\s]?)\d+)$/, 'Please enter a valid phone number')
      .required('Phone number is required'),
    email: Yup.string()
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email')
      .required('Email Address is required'),
  });

  const onError = err => {
    gqlError({ error: err, Toast });
  };

  useEffect(() => {
    if (navigationState.navigation) {
      navigation.navigate(`${navigationState?.navigation}`);

      dispatch(resetNavigation());
    }
  }, [navigationState]);

  const handleOnSubmit = async values => {
    try {
      // setIsLoading(true);
      updateAccount({
        customer: values,
        accessToken: options?.token,
      });
    } catch (error) {
      onError(error);
    }
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
        validationSchema={ValidationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View
            style={{
              flex: 1,
            }}
          >
            <ScrollView>
              <View style={GlobalStyleSheet.container}>
                <View style={GlobalStyleSheet.inputGroup}>
                  <Text style={GlobalStyleSheet.label}>Mobile Number</Text>
                  <TextInput
                    style={[
                      GlobalStyleSheet.formControl,
                      isFocused && GlobalStyleSheet.activeInput,
                      { ...FONTS.font, color: COLORS.title },
                    ]}
                    value={values.phone || '+628'}
                    onChangeText={handleChange('phone')}
                    onFocus={() => setisFocused(true)}
                    onBlur={handleBlur('phone')}
                    placeholder="Type Mobile number"
                    placeholderTextColor={COLORS.label}
                  />
                  {touched.phone && errors.phone && <Text style={GlobalStyleSheet.errorMessage}>{errors.phone}</Text>}
                </View>
                <View style={GlobalStyleSheet.inputGroup}>
                  <Text style={GlobalStyleSheet.label}>First Name</Text>
                  <TextInput
                    style={[
                      GlobalStyleSheet.formControl,
                      isFocused2 && GlobalStyleSheet.activeInput,
                      { ...FONTS.font, color: COLORS.title },
                    ]}
                    value={values.firstName}
                    onChangeText={handleChange('firstName')}
                    onFocus={() => setisFocused2(true)}
                    onBlur={handleBlur('firstName')}
                    placeholder="Type your firstName"
                    placeholderTextColor={COLORS.label}
                  />
                  {touched.firstName && errors.firstName && (
                    <Text style={GlobalStyleSheet.errorMessage}>{errors.firstName}</Text>
                  )}
                </View>
                <View style={GlobalStyleSheet.inputGroup}>
                  <Text style={GlobalStyleSheet.label}>Last Name</Text>
                  <TextInput
                    style={[
                      GlobalStyleSheet.formControl,
                      isFocused2 && GlobalStyleSheet.activeInput,
                      { ...FONTS.font, color: COLORS.title },
                    ]}
                    value={values.lastName}
                    onChangeText={handleChange('lastName')}
                    onFocus={() => setisFocused2(true)}
                    onBlur={handleBlur('lastName')}
                    placeholder="Type your firstName"
                    placeholderTextColor={COLORS.label}
                  />
                  {touched.lastName && errors.lastName && (
                    <Text style={GlobalStyleSheet.errorMessage}>{errors.lastName}</Text>
                  )}
                </View>
                <View style={GlobalStyleSheet.inputGroup}>
                  <Text style={GlobalStyleSheet.label}>Email</Text>
                  <TextInput
                    style={[
                      GlobalStyleSheet.formControl,
                      isFocused3 && GlobalStyleSheet.activeInput,
                      { ...FONTS.font, color: COLORS.title },
                    ]}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onFocus={() => setisFocused3(true)}
                    onBlur={handleBlur('email')}
                    placeholder="Type your email"
                    placeholderTextColor={COLORS.label}
                  />
                  {touched.email && errors.email && <Text style={GlobalStyleSheet.errorMessage}>{errors.email}</Text>}
                </View>
                <View style={GlobalStyleSheet.inputGroup}>
                  <Text style={GlobalStyleSheet.label}>Location</Text>
                  <TextInput
                    style={[
                      GlobalStyleSheet.formControl,
                      isFocused4 && GlobalStyleSheet.activeInput,
                      {
                        height: 80,
                        textAlignVertical: 'top',
                        ...FONTS.font,
                        color: COLORS.title,
                        backgroundColor: '#ccc',
                      },
                    ]}
                    value={collections?.address?.used?.data?.address1 || ''}
                    onFocus={() => setisFocused4(true)}
                    multiline
                    placeholder={values.location ? values.location : 'Please update your address in Address list'}
                    placeholderTextColor={COLORS.label}
                    editable={false}
                  />
                </View>
              </View>
            </ScrollView>
            <View style={[GlobalStyleSheet.container, { alignItems: 'center' }]}>
              <Button
                title={`${options?.loading ? 'Saving ...' : 'Save Details'}`}
                size="xxl"
                onPress={handleSubmit}
                disabled={options?.loading}
              />
            </View>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}

export default connect(
  ({ User }) => {
    const { options, collections } = User;
    return { options, collections };
  },
  { UpdateAccount }
)(React.memo(EditProfile));

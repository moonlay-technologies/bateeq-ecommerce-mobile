import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Formik } from 'formik';
import CustomButton from '../../components/CustomButton';
import { RECOVER_ACCOUNT_CUSTOMER } from '../../graphql/mutation';
import { gqlError } from '../../utils/eror-handling';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import * as Yup from 'yup';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { FONTS, COLORS } from '../../constants/theme';
import { useMutation } from '@apollo/client';
import LoadingScreen from '../../components/LoadingView';
import Header from '../../layout/Header';
import { useNavigation } from '@react-navigation/native';

const ValidateSchema = Yup.object().shape({
  email: Yup.string()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email')
    .required('Email Address is required'),
});

const ResetPassword = () => {
  const [CustomerResetPassword] = useMutation(RECOVER_ACCOUNT_CUSTOMER);
  const navigation = useNavigation();

  const onError = err => {
    gqlError({ error: err, Toast });
  };

  const handleOnSubmit = async values => {
    try {
      const { data, loading } = await CustomerResetPassword({
        fetchPolicy: 'no-cache',
        variables: {
          email: values.email,
        },
      });

      if (loading) {
        return (
          <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <LoadingScreen Loading2 />
          </View>
        );
      }

      if (data.customerRecover.customerUserErrors.length === 0) {
        Toast.show({
          type: 'success',
          text1: 'Please check your email to reset your password',
          visibilityTime: 2000,
        });
        navigation.navigate('SignIn');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error to reset password, please try again',
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      onError(error);
    }
  };
  return (
    <View style={{ ...GlobalStyleSheet.container, flex: 1, backgroundColor: COLORS.white }}>
      <Header titleLeft leftIcon="back" title="Reset Password" />
      <Formik
        initialValues={{
          email: '',
        }}
        onSubmit={values => {
          handleOnSubmit(values);
        }}
        validationSchema={ValidateSchema}
      >
        {({ values, handleChange, handleSubmit, handleBlur, errors, touched }) => {
          return (
            <View style={GlobalStyleSheet.inputGroup}>
              <Text
                style={{
                  ...FONTS.fontSatoshiBold,
                  color: COLORS.title,
                  marginBottom: 8,
                }}
              >
                Email
              </Text>
              <TextInput
                style={[
                  GlobalStyleSheet.formControl,
                  GlobalStyleSheet.activeInput,
                  { ...FONTS.font, color: COLORS.title },
                ]}
                onBlur={handleBlur('email')}
                placeholder="e.g. bateeq@gmail.com"
                placeholderTextColor={COLORS.label}
                value={values.email}
                onChangeText={handleChange('email')}
              />
              {errors?.email && touched?.email && <Text style={GlobalStyleSheet.errorMessage}>{errors.email}</Text>}
              <View style={{ marginTop: 10 }}>
                <CustomButton onPress={handleSubmit} title="Reset Password" arrowIcon={true} logout />
              </View>
            </View>
          );
        }}
      </Formik>
    </View>
  );
};

export default ResetPassword;

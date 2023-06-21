import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../components/CustomButton';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import HeaderBateeq from '../../components/HeaderBateeq';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import LoadingScreen from '../../components/LoadingView';
import { useMutation } from '@apollo/client';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { AUTH_LOGIN } from '../../graphql/mutation';
import { connect } from 'react-redux';
import { CartGenerateId } from '../../store/actions';
import {AuthUser} from "../../store/actions/auth";

const ValidateSchema = Yup.object().shape({
  customer: Yup.object().shape({
    email: Yup.string()
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email')
      .required('Email Address is required'),
    password: Yup.string().required('Password is required'),
  }),
});

const SignIn = props => {
  let { CartGenerateId, cartId, AuthUser } = props;
  const [isFocused, setisFocused] = useState(false);
  const [isFocused2, setisFocused2] = useState(false);
  const [handlePassword, setHandlePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const [CustomerAccessTokenCreateMutation] = useMutation(AUTH_LOGIN);

  const handleOnSubmit = async values => {
    try {
      setIsLoading(true);
      AuthUser({
        email:values.customer.email,
        password:values.customer.password
      })

      // const { data } = await CustomerAccessTokenCreateMutation({
      //   fetchPolicy: 'no-cache',
      //   variables: {
      //     email: values.customer.email,
      //     password: values.customer.password,
      //   },
      // });
      //
      // const accessToken = data?.customerAccessTokenCreate?.customerAccessToken?.accessToken;
      //
      // if (accessToken) {
      //   Toast.show({
      //     type: 'success',
      //     text1: 'Login Success',
      //     visibilityTime: 2000,
      //   });
      //   if (!cartId) {
      //   //   // await AsyncStorage.setItem('cart',)
      //     CartGenerateId({
      //       token: accessToken,
      //     });
      //   }
        // CartGenerateId({
        //   token: accessToken,
        // });
        // await AsyncStorage.setItem('accessToken', accessToken);
        // navigation.dispatch(
        //   CommonActions.reset({
        //     index: 0,
        //     routes: [{ name: 'DrawerNavigation' }],
        //   })
        // );
      // } else {
      //   Toast.show({
      //     type: 'error',
      //     text1: 'Incorrect email or password',
      //     visibilityTime: 3000,
      //   });
      // }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error.message,
        visibilityTime: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = () => {
    navigation.navigate('ResetPassword');
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <HeaderBateeq signin />
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <LoadingScreen />
        </View>
      ) : (
        <View
          style={{
            ...GlobalStyleSheet.container,
            flex: 1,
            backgroundColor: COLORS.white,
          }}
        >
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                ...FONTS.fontSatoshiBold,
                color: COLORS.title,
                fontSize: 24,
                marginBottom: 16,
              }}
            >
              Login
            </Text>
            <Text style={{ ...FONTS.fontSatoshiRegular, color: COLORS.title }}>
              Log into your bateeq account to enjoy benefits from our membership.
            </Text>
          </View>
          <Formik
            initialValues={{
              customer: {
                email: '',
                password: '',
              },
            }}
            onSubmit={values => {
              handleOnSubmit(values);
            }}
            validationSchema={ValidateSchema}
          >
            {({ values, handleChange, handleSubmit, handleBlur, errors, touched }) => {
              return (
                <>
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
                        isFocused && GlobalStyleSheet.activeInput,
                        { ...FONTS.font, color: COLORS.title },
                      ]}
                      onFocus={() => setisFocused(true)}
                      onBlur={handleBlur('customer.email')}
                      placeholder="e.g. bateeq@gmail.com"
                      placeholderTextColor={COLORS.label}
                      value={values.customer.email}
                      onChangeText={handleChange('customer.email')}
                    />
                    {errors?.customer?.email && touched?.customer?.email && (
                      <Text style={GlobalStyleSheet.errorMessage}>{errors.customer.email}</Text>
                    )}
                  </View>
                  <View style={GlobalStyleSheet.inputGroup}>
                    <Text
                      style={{
                        ...FONTS.font,
                        color: COLORS.title,
                        marginBottom: 8,
                      }}
                    >
                      Password
                    </Text>
                    <View>
                      <TouchableOpacity
                        onPress={() => setHandlePassword(!handlePassword)}
                        style={{
                          position: 'absolute',
                          zIndex: 1,
                          height: 50,
                          width: 50,
                          alignItems: 'center',
                          justifyContent: 'center',
                          right: 0,
                        }}
                      >
                        {handlePassword ? (
                          <FeatherIcon name="eye-off" color={COLORS.secondary} size={22} />
                        ) : (
                          <FeatherIcon name="eye" color={COLORS.secondary} size={22} />
                        )}
                      </TouchableOpacity>
                      <TextInput
                        style={[
                          GlobalStyleSheet.formControl,
                          isFocused2 && GlobalStyleSheet.activeInput,
                          { ...FONTS.font, color: COLORS.title },
                        ]}
                        onFocus={() => setisFocused2(true)}
                        onBlur={handleBlur('customer.password')}
                        secureTextEntry={handlePassword}
                        placeholder="Enter your password"
                        placeholderTextColor={COLORS.label}
                        value={values.customer.password}
                        onChangeText={handleChange('customer.password')}
                      />
                      {touched?.customer?.password && errors?.customer?.password && (
                        <Text style={GlobalStyleSheet.errorMessage}>{errors.customer.password}</Text>
                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      marginTop: -10,
                      marginBottom: 15,
                      flexDirection: 'row',
                    }}
                  >
                    <Text
                      style={{
                        ...FONTS.font,
                        color: COLORS.title,
                        textAlign: 'center',
                        marginBottom: 12,
                        marginRight: 5,
                      }}
                    >
                      Forgot password?
                    </Text>
                    <TouchableOpacity onPress={handleResetPassword}>
                      <Text
                        style={{
                          ...FONTS.font,
                          color: COLORS.title,
                          textDecorationLine: 'underline',
                        }}
                      >
                        Reset here
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <CustomButton onPress={handleSubmit} title="Login" arrowIcon={true} logout />
                </>
              );
            }}
          </Formik>
          <View style={{ marginTop: 8, flexDirection: 'row' }}>
            <Text
              style={{
                ...FONTS.font,
                color: COLORS.title,
                textAlign: 'center',
                marginBottom: 12,
                marginRight: 5,
              }}
            >
              Don’t have an account?
            </Text>
            <TouchableOpacity onPress={() => props.navigation.navigate('SignUp')}>
              <Text
                style={{
                  ...FONTS.font,
                  color: COLORS.title,
                  textDecorationLine: 'underline',
                }}
              >
                Register here
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default connect(
  ({ Cart }) => {
    let { options } = Cart;
    let { cartId } = options;
    return { cartId };
  },
  { CartGenerateId,AuthUser }
)(React.memo(SignIn));

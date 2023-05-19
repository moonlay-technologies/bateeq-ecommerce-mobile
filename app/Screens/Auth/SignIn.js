import React, {useEffect, useState} from 'react';
import {
  // Image,
  Button,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../components/CustomButton';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {COLORS, FONTS} from '../../constants/theme';
import HeaderBateeq from '../../components/Headers/HeaderBateeq';
import {Formik} from 'formik';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {AccessApi, AuthenApi} from '../../service/shopify-login';
import LoadingScreen from '../../components/LoadingView';
// import { createShopifyAuth } from 'simple-koa-shopify-auth';
// import FeatherIcon from 'react-native-vector-icons/Feather';

const SignIn = props => {
  const [isFocused, setisFocused] = useState(false);
  const [dataEmail, setDataEmail] = useState(null);
  const [dataId, setDataId] = useState(null);
  const [fetchData, setFetchData] = useState(false);
  // const [isFocused2, setisFocused2] = useState(false);
  // const [handlePassword, setHandlePassword] = useState(true);
  // const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const [errorMessage, setErrorMessage] = useState('');

  // const showToastError = () => {
  //   Toast.show({
  //     type: 'error',
  //     text1: 'Incorrect e-mail format',
  //     visibilityTime: 2000,
  //   });
  // };

  useEffect(() => {
    getDataCustomers();
  }, [fetchData]);

  const getDataCustomers = () => {
    setIsLoading(true);
    AuthenApi.get()
      .then(res => {
        setIsLoading(false);
        const dataCompileEmail = res.customers.map(customer => customer.email);
        const dataCompileId = res.customers.map(customer => customer.id);
        setDataEmail(dataCompileEmail);
        setDataId(dataCompileId);
        // setFetchData(false);
      })
      .catch(error => {
        setIsLoading(false);
        console.log('error', error);
      });
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  // const validateForm = values => {
  //   const errors = {};
  //   if (!values.customer.email) {
  //     Toast.show({
  //       type: 'error',
  //       text1: 'username is required',
  //       visibilityTime: 2000,
  //     });
  //   }
  // else if (!/\S+@\S+\.\S+/.test(values.customer.email)) {
  //   errors.customer = {...errors.customer, email: 'Invalid email address'};
  // }

  // if (!values.customer.password) {
  //   errors.customer = {...errors.customer, password: 'Required'};
  // } else if (values.customer.password.length < 8) {
  //   errors.customer = {
  //     ...errors.customer,
  //     password: 'Password must be at least 8 characters long',
  //   };
  // }

  //   return errors;
  // };

  const handleOnSubmit = values => {
    setIsLoading(true);
    setFetchData(true);
    const formEmail = values.customer.email;
    const customerIndex = dataEmail?.findIndex(email => email === formEmail);
    if (customerIndex !== -1) {
      AccessApi.store({
        storefront_access_token: {
          title: 'tokenAccess',
        },
      })
        .then(res => {
          console.log('resss token', res.data.storefront_access_token);
          AsyncStorage.setItem(
            res.data.storefront_access_token.title,
            res.data.storefront_access_token.access_token,
          );
        })
        .catch(error => console.log('error', error));
      const customerId = dataId[customerIndex];
      const customerIdString = JSON.stringify(customerId);
      AsyncStorage.setItem('customerIdString', customerIdString)
        .then(() => {
          setIsLoading(false);
          Toast.show({
            type: 'success',
            text1: 'Login success',
            visibilityTime: 3000,
          });
          props.navigation.reset({
            index: 0,
            routes: [{name: 'DrawerNavigation'}],
          });
        })
        .catch(error => {
          console.log('Error saving customer ID in local storage:', error);
        });
    } else if (formEmail === '') {
      setIsLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Username is required',
        visibilityTime: 3000,
      });
    } else if (!/\S+@\S+\.\S+/.test(formEmail)) {
      setIsLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Invalid email address',
        visibilityTime: 3000,
      });
    } else {
      setIsLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Email not registered',
        visibilityTime: 3000,
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <HeaderBateeq signin />
      <View
        style={{
          ...GlobalStyleSheet.container,
          flex: 1,
          backgroundColor: COLORS.white,
        }}>
        <View style={{marginBottom: 20}}>
          <Text
            style={{
              ...FONTS.fontSatoshiBold,
              color: COLORS.title,
              fontSize: 24,
              marginBottom: 16,
            }}>
            Login
          </Text>
          <Text style={{...FONTS.fontSatoshiRegular}}>
            Log into your bateeq account to enjoy benefits from our membership.
          </Text>
        </View>
        {/* <View style={GlobalStyleSheet.inputGroup}>
          <Text
            style={{
              ...FONTS.fontSatoshiBold,
              color: COLORS.title,
              marginBottom: 8,
            }}>
            Username
          </Text>
          <TextInput
            style={[
              GlobalStyleSheet.formControl,
              isFocused && GlobalStyleSheet.activeInput,
              {...FONTS.fontSatoshiRegular},
            ]}
            onFocus={() => setisFocused(true)}
            onBlur={() => setisFocused(false)}
            placeholder="e.g. bateeq_foryou"
            placeholderTextColor={COLORS.label}
          />
        </View>
        <View style={GlobalStyleSheet.inputGroup}>
          <Text
            style={{
              ...FONTS.fontSatoshiBold,
              color: COLORS.title,
              marginBottom: 8,
            }}>
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
              }}>
              {handlePassword ?
                                <FeatherIcon name='eye' color={COLORS.secondary} size={22}/>
                                :
                                <FeatherIcon name='eye-off' color={COLORS.secondary} size={22}/>
                            }
            </TouchableOpacity>
            <TextInput
              style={[
                GlobalStyleSheet.formControl,
                isFocused2 && GlobalStyleSheet.activeInput,
                {...FONTS.fontSatoshiRegular},
              ]}
              onFocus={() => setisFocused2(true)}
              onBlur={() => setisFocused2(false)}
              secureTextEntry={handlePassword}
              placeholder="Enter your password"
              placeholderTextColor={COLORS.label}
            />
          </View>
        </View> */}
        <Formik
          initialValues={{
            customer: {
              email: '',
            },
          }}
          onSubmit={values => {
            handleOnSubmit(values);
          }}
          // validate={validateForm}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            handleBlur,
            errors,
            touched,
          }) => {
            return (
              <>
                <View style={GlobalStyleSheet.inputGroup}>
                  <Text
                    style={{
                      ...FONTS.fontSatoshiBold,
                      color: COLORS.title,
                      marginBottom: 8,
                    }}>
                    Username
                  </Text>
                  <TextInput
                    style={[
                      GlobalStyleSheet.formControl,
                      isFocused && GlobalStyleSheet.activeInput,
                      {...FONTS.fontSatoshiRegular},
                    ]}
                    onFocus={() => setisFocused(true)}
                    onBlur={handleBlur('customer.email')}
                    placeholder="e.g. bateeq_foryou"
                    placeholderTextColor={COLORS.label}
                    value={values.customer.email}
                    onChangeText={handleChange('customer.email')}
                  />
                  {!isFocused &&
                    !values.customer.email &&
                    touched?.customer?.email &&
                    errors?.customer?.email && (
                      <Text style={GlobalStyleSheet.errorMessage}>
                        {errors.customer.email}
                      </Text>
                    )}
                </View>
                {/* <View style={GlobalStyleSheet.inputGroup}>
                  <Text
                    style={{
                      ...FONTS.fontSatoshiBold,
                      color: COLORS.title,
                      marginBottom: 8,
                    }}>
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
                      }}> */}
                {/* {handlePassword ?
                                  <FeatherIcon name='eye' color={COLORS.secondary} size={22}/>
                                  :
                                  <FeatherIcon name='eye-off' color={COLORS.secondary} size={22}/>
                              } */}
                {/* </TouchableOpacity>
                    <TextInput
                      style={[
                        GlobalStyleSheet.formControl,
                        isFocused2 && GlobalStyleSheet.activeInput,
                        {...FONTS.fontSatoshiRegular},
                      ]}
                      onFocus={() => setisFocused2(true)}
                      onBlur={handleBlur('customer.password')}
                      secureTextEntry={handlePassword}
                      placeholder="Enter your password"
                      placeholderTextColor={COLORS.label}
                      value={values.customer.password}
                      onChangeText={handleChange('customer.password')}
                    />
                    {touched?.customer?.password &&
                      errors?.customer?.password && (
                        <Text style={GlobalStyleSheet.errorMessage}>
                          {errors.customer.password}
                        </Text>
                      )}
                  </View>
                </View> */}
                {/* {errorMessage && !isFocused && <Text>{errorMessage}</Text>} */}
                {/* <Button
                  title="Login"
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                /> */}
                {/* <View style={{marginTop: 20}}> */}
                <CustomButton
                  // onPress={() => props.navigation.navigate('DrawerNavigation')}
                  onPress={handleSubmit}
                  title="Login"
                  arrowIcon={true}
                  logout
                />
                {/* </View> */}
              </>
            );
          }}
        </Formik>
        {/* <View
                    style={{
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'space-between',
                        marginTop:15,
                    }}
                >
                    <Text style={{...FONTS.font}}>Forgot password?</Text>
                    <TouchableOpacity>
                        <Text style={{...FONTS.fontLg,color:COLORS.primary}}>Reset here</Text>
                    </TouchableOpacity>
                </View> */}
        <View style={{marginTop: 20, flexDirection: 'row'}}>
          <Text
            style={{
              ...FONTS.fontSatoshiRegular,
              color: COLORS.title,
              textAlign: 'center',
              marginBottom: 12,
              marginRight: 5,
            }}>
            Don’t have an account?
          </Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('SignUp')}>
            <Text style={{...FONTS.fontSatoshiBold, color: COLORS.title}}>
              Register here
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;

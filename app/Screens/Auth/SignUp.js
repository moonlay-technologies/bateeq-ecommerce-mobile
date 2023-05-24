import React, {useState, useEffect} from 'react';
import {
  // Image,
  ScrollView,
  Text,
  TextInput,
  //   TouchableOpacity,
  // TouchableOpacity,
  View,
} from 'react-native';
import {Formik} from 'formik';
import Toast from 'react-native-toast-message';
import HeaderBateeq from '../../components/Headers/HeaderBateeq';
import CustomButton from '../../components/CustomButton';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {COLORS, FONTS} from '../../constants/theme';
import CheckBox from '@react-native-community/checkbox';
import {AuthenApi} from '../../service/shopify-login';
import LoadingScreen from '../../components/LoadingView';

const SignUp = props => {
  const [isFocused, setisFocused] = useState(false);
  const [isFocused2, setisFocused2] = useState(false);
  const [isFocused3, setisFocused3] = useState(false);
  const [handlePassword, setHandlePassword] = useState(true);
  const [handlePassword2, setHandlePassword2] = useState(true);
  const [handleErrorMessage, setHandleErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordsMatched, setPasswordsMatched] = useState(false);
  // const [inputEmail, setInputEmail] = useState(null);
  // const [inputName, setInputName] = useState(null);
  // const [inputPhoneNumber, setInputPhoneNumber] = useState(null);
  // const [inputPassword, setInputPassword] = useState(null);
  // const [inputPasswordConfirmation, setInputPasswordConfirmation] =
  //   useState(null);

  const validateForm = values => {
    const errors = {};

    if (!values.customer.first_name) {
      errors.customer = {...errors.customer, first_name: 'Required'};
    }

    if (!values.customer.phone) {
      errors.customer = {...errors.customer, phone: 'Required'};
    }

    if (!values.customer.email) {
      errors.customer = {...errors.customer, email: 'Required'};
    } else if (!/\S+@\S+\.\S+/.test(values.customer.email)) {
      errors.customer = {...errors.customer, email: 'Invalid email address'};
    }

    if (!values.customer.password) {
      errors.customer = {...errors.customer, password: 'Required'};
    } else if (values.customer.password.length < 8) {
      errors.customer = {
        ...errors.customer,
        password: 'Password must be at least 8 characters long',
      };
    }

    if (!values.customer.password_confirmation) {
      errors.customer = {...errors.customer, password_confirmation: 'Required'};
    } else if (
      values?.customer?.password_confirmation === values?.customer?.password
    ) {
      if (!passwordsMatched) {
        Toast.show({
          type: 'success',
          text1: 'Passwords match',
          visibilityTime: 2000,
        });
        setPasswordsMatched(true);
      }
    } else {
      if (passwordsMatched) {
        Toast.show({
          type: 'error',
          text1: 'Passwords do not match',
          visibilityTime: 2000,
        });
        setPasswordsMatched(false);
      }
      errors.customer = {
        ...errors.customer,
        password_confirmation: 'Passwords do not match',
      };
    }

    if (!values.customer.agreement) {
      errors.customer = {
        ...errors.customer,
        agreement: 'Please accept the terms and conditions',
      };
    }

    return errors;
  };

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Register success',
      text2: 'Please check your email for verification',
      visibilityTime: 5000,
    });
  };

  const handleOnSubmit = values => {
    setIsLoading(true);
    AuthenApi.store(values)
      .then(res => {
        if (res.status === 201) {
          setIsLoading(false);
          showToast();
          props.navigation.navigate('SignIn');
        }

        if (res?.data?.errors?.email) {
          setIsLoading(false);
          setHandleErrorMessage(`email has already been registered`);
        } else if (res?.errors?.phone) {
          setIsLoading(false);
          setHandleErrorMessage(`phone has already been registered`);
        } else if (res?.data?.errors?.email && res?.data?.errors?.phone) {
          setIsLoading(false);
          setHandleErrorMessage('email & phone has already been registered');
        } else {
          setIsLoading(false);
          return res;
        }
      })
      .catch(err => {
        setIsLoading(false);
        Toast.show({
          type: 'error',
          text1: err,
          visibilityTime: 5000,
        });
      });
  };

  useEffect(() => {
    if (handleErrorMessage) {
      setTimeout(() => {
        setHandleErrorMessage(null);
      }, 3000);
    }
  }, [handleErrorMessage]);

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View
        style={{
          ...GlobalStyleSheet.container,
          flex: 1,
          backgroundColor: COLORS.white,
        }}>
        {/* <View
                    style={{
                        alignItems:'center',
                        paddingVertical:30,
                    }}
                >
                    <Image
                        style={{height:70,resizeMode:'contain'}}
                        source={IMAGES.logo}
                    />
                </View> */}
        <HeaderBateeq signin />
        <View style={{marginVertical: 20}}>
          {isLoading && <LoadingScreen Loading2 />}
          {handleErrorMessage && (
            <Text style={{color: 'red', fontSize: 16}}>
              {handleErrorMessage}
            </Text>
          )}
          <Text
            style={{
              ...FONTS.fontSatoshiBold,
              fontSize: 24,
              color: COLORS.title,
              marginBottom: 16,
            }}>
            Register
          </Text>
          <Text style={{...FONTS.fontSatoshiRegular}}>
            Register your bateeq account to enjoy benefits from our membership.{' '}
          </Text>
        </View>

        <Formik
          initialValues={{
            customer: {
              first_name: '',
              email: '',
              phone: '',
              password: '',
              password_confirmation: '',
              verified_email: true,
              send_email_welcome: true,
              agreement: false,
            },
          }}
          onSubmit={values => {
            handleOnSubmit(values);
          }}
          validate={validateForm}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <>
              <View style={GlobalStyleSheet.inputGroup}>
                <Text
                  style={{
                    ...FONTS.fontSatoshiBold,
                    fontSize: 14,
                    color: COLORS.title,
                    marginBottom: 8,
                  }}>
                  Your Name*
                </Text>
                <TextInput
                  style={[
                    GlobalStyleSheet.formControl,
                    isFocused && GlobalStyleSheet.activeInput,
                  ]}
                  value={values.customer.first_name}
                  onChangeText={handleChange('customer.first_name')}
                  onFocus={() => setisFocused(true)}
                  onBlur={handleBlur('customer.first_name')}
                  placeholder="Type Username Here"
                  placeholderTextColor={COLORS.label}
                />
                {!isFocused &&
                  !values.customer?.first_name &&
                  touched.customer?.first_name &&
                  errors.customer?.first_name && (
                    <Text style={GlobalStyleSheet.errorMessage}>
                      {errors.customer?.first_name}
                    </Text>
                  )}
              </View>
              <View style={GlobalStyleSheet.inputGroup}>
                <Text
                  style={{
                    ...FONTS.fontSatoshiBold,
                    fontSize: 14,
                    color: COLORS.title,
                    marginBottom: 8,
                  }}>
                  E-mail Address*
                </Text>
                <TextInput
                  style={[
                    GlobalStyleSheet.formControl,
                    isFocused && GlobalStyleSheet.activeInput,
                  ]}
                  value={values.customer.email}
                  onChangeText={handleChange('customer.email')}
                  onFocus={() => setisFocused(true)}
                  onBlur={() => {
                    setisFocused(false);
                    handleBlur('customer.email');
                  }}
                  placeholder="Type Username Here"
                  placeholderTextColor={COLORS.label}
                />
                {!isFocused &&
                  !values.customer?.email &&
                  touched.customer?.email &&
                  errors.customer?.email && (
                    <Text style={GlobalStyleSheet.errorMessage}>
                      {errors.customer?.email}
                    </Text>
                  )}
              </View>
              <View style={GlobalStyleSheet.inputGroup}>
                <Text
                  style={{
                    ...FONTS.fontSatoshiBold,
                    fontSize: 14,
                    color: COLORS.title,
                    marginBottom: 8,
                  }}>
                  Phone Number*
                </Text>
                <TextInput
                  style={[
                    GlobalStyleSheet.formControl,
                    isFocused && GlobalStyleSheet.activeInput,
                  ]}
                  value={values.customer.phone}
                  onChangeText={handleChange('customer.phone')}
                  onFocus={() => setisFocused(true)}
                  onBlur={() => {
                    setisFocused(false);
                    handleBlur('customer.phone');
                  }}
                  placeholder="Type Username Here"
                  placeholderTextColor={COLORS.label}
                />
                {!isFocused &&
                  !values.customer?.phone &&
                  touched.customer?.phone &&
                  errors.customer?.phone && (
                    <Text style={GlobalStyleSheet.errorMessage}>
                      {errors.customer?.phone}
                    </Text>
                  )}
              </View>
              <View style={GlobalStyleSheet.inputGroup}>
                <Text
                  style={{
                    ...FONTS.fontSatoshiBold,
                    fontSize: 14,
                    color: COLORS.title,
                    marginBottom: 8,
                  }}>
                  Password*
                </Text>
                <View>
                  {/* <TouchableOpacity
                              onPress={() => setHandlePassword(!handlePassword)}
                              style={{
                                  position:'absolute',
                                  zIndex:1,
                                  height:50,
                                  width:50,
                                  alignItems:'center',
                                  justifyContent:'center',
                                  right:0,
                              }}
                          >
                              {handlePassword ?
                                  <FeatherIcon name='eye' color={COLORS.secondary} size={22}/>
                                  :
                                  <FeatherIcon name='eye-off' color={COLORS.secondary} size={22}/>
                              }
                          </TouchableOpacity> */}
                  <TextInput
                    style={[
                      GlobalStyleSheet.formControl,
                      isFocused2 && GlobalStyleSheet.activeInput,
                    ]}
                    value={values.customer.password}
                    onChangeText={handleChange('customer.password')}
                    onFocus={() => setisFocused2(true)}
                    onBlur={() => {
                      setisFocused2(false);
                      handleBlur('customer.password');
                    }}
                    secureTextEntry={handlePassword}
                    placeholder="Enter your password"
                    placeholderTextColor={COLORS.label}
                  />
                  {touched.customer?.password && errors?.customer?.password && (
                    <Text style={GlobalStyleSheet.errorMessage}>
                      {errors.customer?.password}
                    </Text>
                  )}
                </View>
              </View>
              <View style={GlobalStyleSheet.inputGroup}>
                <Text
                  style={{
                    ...FONTS.fontSatoshiBold,
                    fontSize: 14,
                    color: COLORS.title,
                    marginBottom: 8,
                  }}>
                  Confirm Password*
                </Text>
                <View>
                  {/* <TouchableOpacity
                              onPress={() => setHandlePassword2(!handlePassword2)}
                              style={{
                                  position:'absolute',
                                  zIndex:1,
                                  height:50,
                                  width:50,
                                  alignItems:'center',
                                  justifyContent:'center',
                                  right:0,
                              }}
                          >
                              {handlePassword2 ?
                                  <FeatherIcon name='eye' color={COLORS.secondary} size={22}/>
                                  :
                                  <FeatherIcon name='eye-off' color={COLORS.secondary} size={22}/>
                              }
                          </TouchableOpacity> */}
                  <TextInput
                    style={[
                      GlobalStyleSheet.formControl,
                      isFocused3 && GlobalStyleSheet.activeInput,
                    ]}
                    value={values.customer.password_confirmation}
                    onChangeText={handleChange(
                      'customer.password_confirmation',
                    )}
                    onFocus={() => setisFocused3(true)}
                    onBlur={() => {
                      handleBlur('customer.password_confirmation');
                    }}
                    secureTextEntry={handlePassword2}
                    placeholder="Confirm Password"
                    placeholderTextColor={COLORS.label}
                  />
                  {!isFocused &&
                    !values.customer?.password_confirmation &&
                    touched.customer?.password_confirmation &&
                    errors.customer?.password_confirmation && (
                      <Text style={GlobalStyleSheet.errorMessage}>
                        {errors.customer?.password_confirmation}
                      </Text>
                    )}
                </View>
              </View>
              <View>
                <View style={{flexDirection: 'row'}}>
                  <CheckBox
                    value={values.customer.agreement}
                    onValueChange={value => {
                      setFieldValue('customer.agreement', value);
                    }}
                  />
                  <Text
                    style={{
                      ...FONTS.fontSatoshiRegular,
                      marginBottom: 15,
                      marginTop: 5,
                      marginLeft: 10,
                    }}>
                    I agree with{' '}
                    <Text
                      style={{
                        ...FONTS.fontSatoshiBold,
                        color: COLORS.title,
                        textAlign: 'center',
                        fontSize: 12,
                      }}>
                      Terms and Conditions
                    </Text>{' '}
                    by bateeq.
                  </Text>
                </View>
                {touched?.customer?.agreement &&
                  errors?.customer?.agreement && (
                    <View>
                      <Text style={GlobalStyleSheet.errorMessage}>
                        {errors?.customer?.agreement}
                      </Text>
                    </View>
                  )}
                <CustomButton
                  onPress={handleSubmit}
                  title="Register"
                  arrowIcon={true}
                  logout={true}
                />
              </View>
            </>
          )}
        </Formik>

        {/* <View style={{marginTop: 20}}>
          <Text
            style={{
              ...FONTS.font,
              color: COLORS.title,
              textAlign: 'center',
              marginBottom: 12,
            }}>
            Already have an account?
          </Text>
          <CustomButton outline title="Continue with email" arrowIcon={true} /> */}

        {/* <View
                        style={{
                            flexDirection:'row',
                            marginVertical:15,
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                borderWidth:1,
                                height:50,
                                borderRadius:SIZES.radius,
                                borderColor:COLORS.borderColor,
                                alignItems:'center',
                                justifyContent:'center',
                                flex:1,
                                marginRight:10,
                            }}
                        >
                            <Image style={{height:22,width:22}} source={IMAGES.google}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                height:50,
                                borderRadius:SIZES.radius,
                                alignItems:'center',
                                justifyContent:'center',
                                backgroundColor: '#305CCD',
                                flex:1,
                                marginLeft:10,
                            }}
                        >
                            <FontAwesome5Brands color={'#fff'} name='facebook' size={22}/>
                        </TouchableOpacity>
                    </View> */}
        {/* </View> */}
      </View>
    </ScrollView>
  );
};

export default SignUp;

import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
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
import * as Yup from 'yup';
import FeatherIcon from 'react-native-vector-icons/Feather';

const SignUp = props => {
  const [isFocused, setisFocused] = useState(false);
  const [isFocused2, setisFocused2] = useState(false);
  const [isFocused3, setisFocused3] = useState(false);
  const [handlePassword, setHandlePassword] = useState(true);
  const [handlePassword2, setHandlePassword2] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const ValidationSchema = Yup.object().shape({
    customer: Yup.object().shape({
      first_name: Yup.string().required('Please input your first name'),
      last_name: Yup.string(),
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
      password: Yup.string().required('Password is required'),
      password_confirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Password confirmation is required'),
      agreement: Yup.boolean()
        .oneOf([true], 'Please accept the Terms and Conditions')
        .required('Please accept the Terms and Conditions'),
    }),
  });

  const showToastSuccess = () => {
    Toast.show({
      type: 'success',
      text1: 'Register success',
      text2: 'Please check your email for verification',
      visibilityTime: 3000,
    });
  };
  const showToastErrors = error => {
    Toast.show({
      type: 'error',
      text1: error.email
        ? 'email has already been registered'
        : error.phone
        ? 'phone has already been registered'
        : 'email & phone has already been registered',
      visibilityTime: 3000,
    });
  };

  const handleOnSubmit = values => {
    setIsLoading(true);
    AuthenApi.store(values)
      .then(res => {
        if (res.status === 201) {
          setIsLoading(false);
          showToastSuccess();
          props.navigation.navigate('SignIn');
        }

        if (res.data.errors) {
          setIsLoading(false);
          showToastErrors(res.data.errors);
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

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View
        style={{
          ...GlobalStyleSheet.container,
          flex: 1,
          backgroundColor: COLORS.white,
        }}>
        <HeaderBateeq signin />
        <View style={{marginVertical: 20}}>
          {isLoading && <LoadingScreen Loading2 />}
          <Text
            style={{
              ...FONTS.font,
              fontSize: 24,
              color: COLORS.title,
              marginBottom: 16,
            }}>
            Register
          </Text>
          <Text style={{...FONTS.font}}>
            Register your bateeq account to enjoy benefits from our membership.{' '}
          </Text>
        </View>

        <Formik
          initialValues={{
            customer: {
              first_name: '',
              last_name: '',
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
          validationSchema={ValidationSchema}>
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
                    ...FONTS.font,
                    fontSize: 14,
                    color: COLORS.title,
                    marginBottom: 8,
                  }}>
                  First Name*
                </Text>
                <TextInput
                  style={[
                    GlobalStyleSheet.formControl,
                    isFocused && GlobalStyleSheet.activeInput,
                    {...FONTS.font, color: COLORS.title},
                  ]}
                  value={values.customer.first_name}
                  onChangeText={handleChange('customer.first_name')}
                  onFocus={() => setisFocused(true)}
                  onBlur={handleBlur('customer.first_name')}
                  placeholder="Type Username Here"
                  placeholderTextColor={COLORS.label}
                />
                {touched.customer?.first_name &&
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
                  Last Name*
                </Text>
                <TextInput
                  style={[
                    GlobalStyleSheet.formControl,
                    isFocused && GlobalStyleSheet.activeInput,
                    {...FONTS.font, color: COLORS.title},
                  ]}
                  value={values.customer.last_name}
                  onChangeText={handleChange('customer.last_name')}
                  onFocus={() => setisFocused(true)}
                  onBlur={handleBlur('customer.last_name')}
                  placeholder="Type last name Here"
                  placeholderTextColor={COLORS.label}
                />
                {touched.customer?.last_name && errors.customer?.last_name && (
                  <Text style={GlobalStyleSheet.errorMessage}>
                    {errors.customer.last_name}
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
                    {...FONTS.font, color: COLORS.title},
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
                {touched.customer?.email && errors.customer?.email && (
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
                    {...FONTS.font, color: COLORS.title},
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
                {touched.customer?.phone && errors.customer?.phone && (
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
                    {handlePassword ? (
                      <FeatherIcon
                        name="eye-off"
                        color={COLORS.secondary}
                        size={22}
                      />
                    ) : (
                      <FeatherIcon
                        name="eye"
                        color={COLORS.secondary}
                        size={22}
                      />
                    )}
                  </TouchableOpacity>
                  <TextInput
                    style={[
                      GlobalStyleSheet.formControl,
                      isFocused2 && GlobalStyleSheet.activeInput,
                      {...FONTS.font, color: COLORS.title},
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
                    ...FONTS.font,
                    fontSize: 14,
                    color: COLORS.title,
                    marginBottom: 8,
                  }}>
                  Confirm Password*
                </Text>
                <View>
                  <TouchableOpacity
                    onPress={() => setHandlePassword2(!handlePassword2)}
                    style={{
                      position: 'absolute',
                      zIndex: 1,
                      height: 50,
                      width: 50,
                      alignItems: 'center',
                      justifyContent: 'center',
                      right: 0,
                    }}>
                    {handlePassword2 ? (
                      <FeatherIcon
                        name="eye-off"
                        color={COLORS.secondary}
                        size={22}
                      />
                    ) : (
                      <FeatherIcon
                        name="eye"
                        color={COLORS.secondary}
                        size={22}
                      />
                    )}
                  </TouchableOpacity>
                  <TextInput
                    style={[
                      GlobalStyleSheet.formControl,
                      isFocused3 && GlobalStyleSheet.activeInput,
                      {...FONTS.font, color: COLORS.title},
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
                  {touched.customer?.password_confirmation &&
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
                      ...FONTS.font,
                      marginBottom: 15,
                      marginTop: 5,
                      marginLeft: 10,
                    }}>
                    I agree with{' '}
                    <Text
                      style={{
                        ...FONTS.font,
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

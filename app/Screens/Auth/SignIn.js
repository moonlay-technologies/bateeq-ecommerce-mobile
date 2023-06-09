import React, {useState} from 'react';
import {
  // Image,
  // Button,
  Linking,
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
import FeatherIcon from 'react-native-vector-icons/Feather';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import LoadingScreen from '../../components/LoadingView';
import {gql, useMutation} from '@apollo/client';
import {useNavigation, CommonActions} from '@react-navigation/native';
import { CREATE_CART } from '../../graphql/mutation';
import { setCartId } from '../../store/reducer';
import {batch, connect, useDispatch} from 'react-redux';
import { setIsLogin } from '../../store/reducer';
import {SignInUser} from "../../store/constants/Auth";
import {Authentication} from "../../service/graphql/mutation/authentication";
import {CartGenerateId} from "../../store/actions";

const SignIn = props => {
  let { CartGenerateId } = props
  const [isFocused, setisFocused] = useState(false);
  const [isFocused2, setisFocused2] = useState(false);
  const [handlePassword, setHandlePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch()
  const [cartCreate, { error, loading }] = useMutation(CREATE_CART)
  const navigation = useNavigation();
  const validateForm = values => {
    const errors = {};

    if (!values.customer.email) {
      errors.customer = {...errors.customer, email: 'Required'};
    }

    if (!values.customer.password) {
      errors.customer = {...errors.customer, password: 'Required'};
    }

    return errors;
  };

  const [ err,callback ] = new Authentication({
    keyName:['customerAccessTokenCreate','customerAccessToken','accessToken']
  }).signIn()
  const handleOnSubmit = async values => {
    try{
      const data = await callback({variables: {
          email: values.customer.email,
          password: values.customer.password,
        },})

      if (data) {
        Toast.show({
          type: 'success',
          text1: 'Login Success',
          visibilityTime: 2000,
        })
        const cartCreated = await cartCreate({
          variables: {
            input: {
              note: ""
            }
          }
        })
        const { id } = cartCreated?.data?.cartCreate?.cart
        batch(() => {
          dispatch(setIsLogin(!!data))
          CartGenerateId({id})
          dispatch(setCartId(id))
        })
        await AsyncStorage.setItem('accessToken', data);
        navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'DrawerNavigation'}],
            }),
        );
      } else {
        Toast.show({
          type: 'error',
          text1: 'Username or Email is not registered',
          visibilityTime: 3000,
        });
      }
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

  return (
    <>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <LoadingScreen />
        </View>
      ) : (
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
                Log into your bateeq account to enjoy benefits from our
                membership.
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
              validate={validateForm}>
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
                    </View>
                    <View
                      style={{
                        marginTop: -10,
                        marginBottom: 15,
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          ...FONTS.fontSatoshiRegular,
                          color: COLORS.title,
                          textAlign: 'center',
                          marginBottom: 12,
                          marginRight: 5,
                        }}>
                        Forgot password?
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          Linking.openURL(
                            'https://bateeqshop.myshopify.com/account/login#',
                          )
                        }>
                        <Text
                          style={{
                            ...FONTS.fontSatoshiBold,
                            color: COLORS.title,
                          }}>
                          Reset here
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <CustomButton
                      onPress={handleSubmit}
                      title="Login"
                      arrowIcon={true}
                      logout
                    />
                  </>
                );
              }}
            </Formik>
            <View style={{marginTop: 8, flexDirection: 'row'}}>
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
              <TouchableOpacity
                onPress={() => props.navigation.navigate('SignUp')}>
                <Text style={{...FONTS.fontSatoshiBold, color: COLORS.title}}>
                  Register here
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default connect(()=> {
  return {}
},{SignInUser,CartGenerateId})(React.memo(SignIn));

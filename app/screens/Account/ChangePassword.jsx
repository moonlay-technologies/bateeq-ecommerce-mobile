import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Header from '../../layout/Header';
import { gqlError } from '../../utils/eror-handling';
import { UpdateAccount } from '../../store/actions/user';
import { resetNavigation } from '../../store/actions';
import Button from '../../components/ButtonComponent';

function ChangePasswordScreen({ ...props }) {
  const { options, UpdateAccount: updateAccount } = props;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const navigationState = useSelector(state => state.Navigation.navigationState);
  const [handlePassword, setHandlePassword] = useState(false);

  const initialValues = {
    password: '',
  };

  const ValidationSchema = Yup.object().shape({
    password: Yup.string().required('Please input your new password'),
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

  const handleUpdatePassword = async values => {
    try {
      updateAccount({
        customer: values,
        accessToken: options?.token,
      });
    } catch (error) {
      onError(error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Header titleLeft leftIcon="back" title="Change Password" />
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          handleUpdatePassword(values);
        }}
        validationSchema={ValidationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={GlobalStyleSheet.inputGroup}>
            <Text style={{ marginBottom: 10, fontSize: 16, ...FONTS.fontBold, color: 'black' }}>Update Password</Text>

            <View>
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
                  secureTextEntry={!handlePassword}
                  placeholder="New Password"
                  placeholderTextColor={`${COLORS.label}`}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  style={[
                    GlobalStyleSheet.formControl,
                    GlobalStyleSheet.activeInput,
                    { ...FONTS.font, color: COLORS.title },
                  ]}
                />
                {touched.password && errors.password && (
                  <Text style={GlobalStyleSheet.errorMessage}>{errors.password}</Text>
                )}
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <Button
                title={`${options?.loading ? 'Loading ...' : 'Update Password'}`}
                onPress={handleSubmit}
                style={{ marginTop: 10 }}
                disabled={options?.loading}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}

export default connect(
  ({ User }) => {
    const { options, collections } = User;
    return { options, collections };
  },
  { UpdateAccount }
)(React.memo(ChangePasswordScreen));

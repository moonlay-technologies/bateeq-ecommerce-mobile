import React, { useState } from 'react';
import {View, TextInput, Text, Alert, TouchableOpacity} from 'react-native';
import CustomButton from '../../components/CustomButton';
import { COLORS, FONTS } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Header from '../../layout/Header';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { Formik } from 'formik';
import { gqlError } from '../../utils/eror-handling';
import * as Yup from 'yup';
import { UpdateAccount } from '../../store/actions/user';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import FeatherIcon from "react-native-vector-icons/Feather";

function AppSetting({ ...props }) {
  const navigation = useNavigation();
  let { options, UpdateAccount } = props;

  const [visible,setVisible] = useState(false)
  const initialValues = {
    password: '',
  };

  const ValidationSchema = Yup.object().shape({
    password: Yup.string().required('Please input your new password'),
  });

  const onError = err => {
    gqlError({ error: err, Toast });
  };

  const handleUpdatePassword = async values => {
    try {
      UpdateAccount({
        customer: values,
        accessToken: options?.token,
      });
      navigation.navigate('Account');
    } catch (error) {
      onError(error);
    }
  };



  return (
    <View style={{ padding: 20 }}>
      <Header titleLeft leftIcon="back" title="App Setting" />
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
                    <TextInput
                        secureTextEntry={!visible}
                        placeholder="New Password"
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
                <TouchableOpacity
                    onPress={() => setVisible(!visible)}
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
                    {visible ? (
                        <FeatherIcon name="eye-off" color={COLORS.secondary} size={22} />
                    ) : (
                        <FeatherIcon name="eye" color={COLORS.secondary} size={22} />
                    )}
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 10 }}>
              <CustomButton title={'Update Password'} onPress={handleSubmit} />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}

export default connect(
  ({ User }) => {
    let { options, collections } = User;
    return { options, collections };
  },
  { UpdateAccount }
)(React.memo(AppSetting));

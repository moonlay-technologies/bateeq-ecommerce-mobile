import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import * as yup from 'yup';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { connect, useDispatch, useSelector } from 'react-redux';

import { CountriesApi, CustomerApi } from '../../../service/shopify-api';
import { GlobalStyleSheet } from '../../../constants/StyleSheet';
import { COLORS, FONTS } from '../../../constants/theme';
import AsyncSelectComponent from '../../../components/SelectAsyncComponent';
import HeaderComponent from '../../../components/HeaderComponent';
import InputTextArea from '../../../components/InputTextArea';
import Button from '../../../components/ButtonComponent';
import Input from '../../../components/InputComponent';
import { updateAddress, getAddressList, resetNavigation } from '../../../store/actions';
import LoadingScreen from '../../../components/LoadingView';

const schema = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string(),
  phone_number: yup.string().required(),
  company: yup.string().required(),
  first_address: yup.string().required(),
  second_address: yup.string().required(),
  country: yup.string().required(),
  province: yup.string().required(),
  city: yup.string().required(),
  postal_code: yup
    .string()
    .length(5)
    .matches(/^[0-9]{5}/)
    .required(),
});

function EditAddress({
  navigation,
  route,
  userInfo,
  token,
  updateAddress: updatingAddress,
  getAddressList: getAddress,
}) {
  const { id } = route.params;
  const dispatch = useDispatch();
  const navigationState = useSelector(state => state.Navigation.navigationState);
  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadFetching, setLoadFetching] = useState(false);
  const [countryId, setCountryId] = useState('');
  const [provinces, setProvinces] = useState([]);
  const [customerAddressById, setCustomerAddressById] = useState();
  const [state, setState] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    company: '',
    first_address: '',
    second_address: '',
    country: '',
    province: '',
    city: '',
    postal_code: '',
  });

  useEffect(() => {
    setLoadFetching(true);
    const addressId = id.match(/\/(\d+)\?/)[1];
    const customerId = userInfo?.id.match(/\/(\d+)$/)[1];
    const params = {
      addressId,
      customerId,
    };
    CustomerApi.getAddressByCustomerAndAddressId(params)
      .then(result => {
        setCustomerAddressById(result?.customer_address);
        setState({
          first_name: result?.customer_address?.first_name || '',
          last_name: result?.customer_address?.last_name || '',
          phone_number: result?.customer_address?.phone || '',
          company: result?.customer_address?.company || '',
          first_address: result?.customer_address?.address1 || '',
          second_address: result?.customer_address?.address2 || '',
          country: result?.customer_address?.country || '',
          province: result?.customer_address?.province || '',
          city: result?.customer_address?.city || '',
          postal_code: result?.customer_address?.zip || '',
        });
        setLoadFetching(false);
      })
      .catch(err => {
        Toast.show({ type: 'error', text1: 'Oops!', text2: err?.message });
        setLoadFetching(false);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (countryId !== '') {
      CountriesApi.getProvinceByCountryId(countryId)
        .then(result => {
          setProvinces(
            result.provinces.map(d => ({
              label: d.name,
              value: d.id,
            }))
          );
          setIsLoading(false);
          setCountryId('');
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: 'Oops!',
            text2: err?.originalError?.message || err?.message || 'something went wrong',
          });
          setIsLoading(false);
        });
    } else {
      CountriesApi.get()
        .then(res => {
          setCountries(
            res?.countries?.map(i => ({
              label: i.name,
              value: i.id,
            }))
          );
          setIsLoading(false);
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: 'Oops!',
            text2: err?.originalError?.message || 'something went wrong',
          });
          setIsLoading(false);
        });
    }
  }, [countryId]);

  useEffect(() => {
    if (navigationState.navigation) {
      setErrors({});
      setState({
        first_name: '',
        last_name: '',
        phone_number: '',
        company: '',
        first_address: '',
        second_address: '',
        country: '',
        province: '',
        city: '',
        postal_code: '',
      });
      navigation.navigate(`${navigationState?.navigation}`, { editedId: id });
      dispatch(resetNavigation());
    }
  }, [navigationState]);

  const handleFieldChange = (value, name) => {
    setState(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeCountry = (value, name) => {
    if (name === 'country') {
      setCountryId(value.value);
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);

    const body = {
      first_name: state.first_name,
      last_name: state.last_name,
      phone_number: state.phone_number,
      company: state.company,
      first_address: state.first_address,
      second_address: state.second_address,
      country: state.country,
      province: state.province,
      city: state.city,
      postal_code: state.postal_code,
    };
    schema
      .validate(body, { abortEarly: false })
      .then(async result => {
        const payloadBody = {
          address: {
            address1: result.first_address,
            address2: result.second_address,
            phone: result.phone_number,
            city: result.city,
            province: result.province,
            country: result.country,
            company: result.company,
            zip: result.postal_code,
            firstName: result.first_name,
            lastName: result.last_name,
          },
          customerAccessToken: token,
          id,
        };
        updatingAddress({
          ...payloadBody,
        });
        setTimeout(() => {
          setIsLoading(false);
          getAddress({ token, limit: 10 });
        }, 1000);
      })
      .catch(err => {
        if (err.name === 'ValidationError') {
          const errorsVal = err.inner.reduce((acc, error) => {
            const { path, message } = error;
            acc[path] = message;
            return acc;
          }, {});
          setErrors(errorsVal);
        } else {
          Toast.show({
            type: 'error',
            text1: 'oops!',
            text2: err?.originalError?.message || 'something went wrong',
          });
        }
        setIsLoading(false);
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
      }}
    >
      <View style={{ paddingHorizontal: 10 }}>
        <HeaderComponent withoutCartAndLogo backAction icon="back" title="Back" />
      </View>
      <View style={{ flex: 1 }}>
        {isLoadFetching ? (
          <LoadingScreen type="circle" />
        ) : (
          <ScrollView>
            <View style={GlobalStyleSheet.container}>
              <View
                style={{
                  paddingBottom: 10,
                  marginBottom: 20,
                }}
              >
                <Text
                  style={{
                    ...FONTS.fontSatoshiBold,
                    fontSize: 24,
                    color: COLORS.title,
                  }}
                >
                  Edit Address
                </Text>
              </View>
              <Input
                name="first_name"
                label="First Name"
                placeholder="e.g. John"
                value={customerAddressById?.first_name}
                handleInputChange={val => handleFieldChange(val, 'first_name')}
                errors={errors}
              />
              <Input
                name="last_name"
                label="Last Name"
                placeholder="e.g. Doe"
                value={customerAddressById?.last_name}
                handleInputChange={val => handleFieldChange(val, 'last_name')}
                errors={errors}
              />
              <Input
                name="phone_number"
                label="Phone Number"
                placeholder="e.g. +628123456789"
                keyboardType="phone-pad"
                value={customerAddressById?.phone}
                handleInputChange={val => handleFieldChange(val, 'phone_number')}
                errors={errors}
              />
              <Input
                name="company"
                label="Company"
                placeholder="e.g. PT ABC"
                value={customerAddressById?.company}
                handleInputChange={val => handleFieldChange(val, 'company')}
                errors={errors}
              />
              <InputTextArea
                name="first_address"
                label="Address 1"
                placeholder="e.g. Jl. Taman Anggrek"
                numberOfLines={4}
                value={customerAddressById?.address1}
                handleInputChange={val => handleFieldChange(val, 'first_address')}
                errors={errors}
              />
              <InputTextArea
                name="second_address"
                label="Address 2"
                placeholder="e.g. Jl. Taman Anggrek"
                numberOfLines={4}
                value={customerAddressById?.address2}
                handleInputChange={val => handleFieldChange(val, 'second_address')}
                errors={errors}
              />
              <View style={{ flex: 1, backgroundColor: COLORS.backgroundColor }}>
                <AsyncSelectComponent
                  name="country"
                  label="Country"
                  options={countries}
                  value={{ label: customerAddressById?.country }}
                  onChange={val => handleChangeCountry(val, 'country')}
                  onSelect={val => handleFieldChange(val, 'country')}
                  errors={errors}
                />
              </View>
              <View style={{ flex: 1, backgroundColor: COLORS.backgroundColor }}>
                <AsyncSelectComponent
                  name="province"
                  label="Province"
                  options={provinces}
                  value={customerAddressById?.province}
                  onSelect={val => handleFieldChange(val, 'province')}
                  errors={errors}
                />
              </View>
              <Input
                name="city"
                label="City"
                placeholder="e.g. Jakarta Selatan"
                value={customerAddressById?.city}
                handleInputChange={val => handleFieldChange(val, 'city')}
                errors={errors}
              />
              <Input
                name="postal_code"
                label="Postal Code"
                placeholder="e.g. 12190"
                keyboardType="number-pad"
                value={customerAddressById?.zip}
                handleInputChange={val => handleFieldChange(val, 'postal_code')}
                errors={errors}
              />
            </View>
          </ScrollView>
        )}
      </View>
      <View style={[GlobalStyleSheet.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Button
          onPress={handleSubmit}
          size="xxl"
          title={isLoading ? 'Loading ...' : 'Save Address'}
          disabled={isLoading}
        />
      </View>
    </SafeAreaView>
  );
}

export default connect(
  ({ User }) => {
    const {
      options: { info: userInfo, token },
    } = User;

    return {
      userInfo,
      token,
    };
  },
  { updateAddress, getAddressList }
)(EditAddress);

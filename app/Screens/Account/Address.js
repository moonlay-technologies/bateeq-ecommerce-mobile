import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {COLORS, FONTS} from '../../constants/theme';
import Header from '../../layout/Header';
import { useEffect } from 'react';
import { GET_CUSTOMER_ADDRESS } from '../../graphql/queries';
import AuthService from '../../service/auth/auth-service';
import { useQuery } from '@apollo/client';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const Address = ({navigation, route}) => {
  let { params } = route
  const [token, setToken]=useState('')
  const [customerAddress, setCustomerAddress] = useState([])
  const {data: address, error: errorAddress, loading: loadingAddress, refetch: refetchAdress} = useQuery(GET_CUSTOMER_ADDRESS, {
    variables: {
      fetchPolicy: 'no-cache',
      accessToken: token,
      limit: 20
    }
  })

  useEffect(()=>{
    if(params?.refetch) {
      refetchAdress()
    }
    AuthService?.getToken()
      .then(result => {
        setToken(result|| '')
      })
      .catch(err => {
        Toast.show({
          type: 'error', 
          text1: 'Oops!',
          text2: err?.originalError?.message || 'something went wrong'
        })
      })
    setCustomerAddress(address?.customer?.addresses?.edges.map(i=>i.node) || [])
  },[address, errorAddress, loadingAddress, params])

  console.log('customerAddress', [customerAddress, token])
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
      }}>
      <View style={{paddingHorizontal: 20}}>
        <Header titleLeft leftIcon={'back'} title={'Back'} />
      </View>
      <ScrollView>
        <View style={GlobalStyleSheet.container}>
          <Text
            style={[
              FONTS.fontSatoshiBold,
              {color: COLORS.title, marginBottom: 10, fontSize: 24},
            ]}>
            Select Address
          </Text>
          {customerAddress?.length > 0 && customerAddress?.map(({address1, address2, status=true}, index) => (
            <TouchableOpacity
              style={{
                padding: 12,
                borderWidth: 1,
                borderColor: COLORS.borderColor,
                borderRadius: 6,
                marginBottom: 10,
              }}
              key={index}>
              <View
                style={{
                  marginBottom: 8,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    ...FONTS.fontSatoshiBold,
                    fontSize: 14,
                    color: COLORS.title,
                  }}>
                  {address1}
                </Text>
                {status && (
                  <View
                    style={{
                      backgroundColor: '#F2F2F2',
                      paddingHorizontal: 10,
                      paddingTop: 6,
                      paddingBottom: 4,
                      borderRadius: 15,
                    }}>
                    <Text style={{...FONTS.fontXs, ...FONTS.fontSatoshiBold}}>
                      selected
                    </Text>
                  </View>
                )}
              </View>
              {/* <Text style={FONTS.font}>Mokshita dairy near bsnl circle {`\n`}Rk puram{`\n`}Kota -324009{`\n`}Rajasthan{`\n`}{`\n`}Mobile: 0123 4567 891</Text> */}
              <Text style={{...FONTS.fontSatoshiRegular, fontSize: 14}}>
                {address2}
              </Text>
            </TouchableOpacity>
          ))}
          <View
            style={{
              marginTop: 12,
              flexDirection: 'column',
              marginHorizontal: -12,
              marginBottom: -12,
              paddingHorizontal: 85,
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddDeliveryAddress')}
              style={{
                flex: 1,
                padding: 12,
                marginVertical: 12,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: COLORS.title,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '80%',
                }}>
                <Text style={{...FONTS.fontSatoshiBold, color: COLORS.title}}>
                  Add Address
                </Text>
                <OcticonsIcon color={COLORS.title} size={18} name="plus" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                padding: 12,
                alignItems: 'center',
                borderWidth: 1,
                backgroundColor: '#333333',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '80%',
                }}>
                <Text style={{...FONTS.fontSatoshiBold, color: COLORS.white}}>
                  Select Address
                </Text>
                <OcticonsIcon color={COLORS.white} size={18} name="check" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Address;

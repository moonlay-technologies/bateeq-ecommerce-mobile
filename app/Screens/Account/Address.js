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

const dummyAddress = [
  {
    titleAddress: 'PT Moonlay Tecnologies',
    addressDetail:
      'SCBD, Equity Tower 25th Floor, Suite H.\nJl. Jend. Sudirman Kav. 52-53, South Jakarta,\nIndonesia 12190',
    status: true,
  },
  {
    titleAddress: 'Home',
    addressDetail:
      'Jl. Mawar Indah Blok B2 No. 15, Cempaka Putih,\nJakarta Pusat, Indonesia 10520',
    status: false,
  },
];

const Address = ({navigation}) => {
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
          {dummyAddress.map(({titleAddress, addressDetail, status}, index) => (
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
                  {titleAddress}
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
                {addressDetail}
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
          {/* <TouchableOpacity
                    onPress={() => navigation.navigate('AddDeliveryAddress')}
                    style={{
                        paddingHorizontal:15,
                        paddingVertical:8,
                    }}
                >
                    <Text style={{...FONTS.font,...FONTS.fontBold,color:COLORS.primary}}>Add Address</Text>
                </TouchableOpacity> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Address;

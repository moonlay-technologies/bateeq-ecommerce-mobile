import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { IconButton } from '@react-native-material/core';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import RBSheet from 'react-native-raw-bottom-sheet';
// import Octicons from 'react-native-vector-icons/Octicons';
import HeaderBateeq from '../../components/Headers/HeaderBateeq';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {COLORS, FONTS, IMAGES} from '../../constants/theme';
// import Header from '../../layout/Header';
import india from '../../assets/images/flags/india.png';
import UnitedStates from '../../assets/images/flags/UnitedStates.png';
import german from '../../assets/images/flags/german.png';
import italian from '../../assets/images/flags/italian.png';
import spanish from '../../assets/images/flags/spanish.png';
import CustomButton from '../../components/CustomButton';
// import Prof from '../../service/shopify-login';
import {AuthenApi} from '../../service/shopify-login';

const languagetData = [
  {
    flag: india,
    name: 'Indian',
  },
  {
    flag: UnitedStates,
    name: 'English',
  },
  {
    flag: german,
    name: 'German',
  },
  {
    flag: italian,
    name: 'Italian',
  },
  {
    flag: spanish,
    name: 'Spanish',
  },
];

const Profile = ({navigation}) => {
  const [dataAccount, setDataAccount] = useState(null);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [isLoading, setIsLoading] = useState(null);
  const RBSheetLanguage = useRef();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isLoggedOut && isFocused) {
      navigation.navigate('SignIn');
    }
  }, [isLoggedOut, isFocused, navigation]);

  useEffect(() => {
    getDetailCustomer();
  }, []);

  const getDetailCustomer = async () => {
    setIsLoading(true);
    const customerId = await AsyncStorage.getItem('customerIdString');

    AuthenApi.getDataAccount(customerId)
      .then(res => {
        setIsLoading(false);
        setDataAccount(res.customer);
      })
      .catch(error => {
        setIsLoading(false);
        console.log('error', error);
      });
  };

  return (
    <>
      <RBSheet
        ref={RBSheetLanguage}
        closeOnDragDown={true}
        height={400}
        openDuration={300}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,.3)',
          },
          container: {
            backgroundColor: COLORS.white,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          },
        }}>
        <View
          style={{
            alignItems: 'center',
            borderBottomWidth: 1,
            borderColor: COLORS.borderColor,
            paddingBottom: 8,
            paddingTop: 4,
          }}>
          <Text style={{...FONTS.h5, color: COLORS.title}}>Language</Text>
        </View>
        <ScrollView
          contentContainerStyle={{paddingBottom: 20, paddingHorizontal: 15}}>
          {languagetData.map((data, index) => (
            <TouchableOpacity
              onPress={() => RBSheetLanguage.current.close()}
              key={index}
              style={{
                paddingVertical: 15,
                borderBottomWidth: 1,
                borderColor: COLORS.borderColor,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  height: 20,
                  width: 25,
                  marginRight: 12,
                }}
                source={data.flag}
              />
              <Text style={{...FONTS.fontLg, color: COLORS.title, flex: 1}}>
                {data.name}
              </Text>
              <FeatherIcon name="chevron-right" color={COLORS.text} size={24} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </RBSheet>

      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: COLORS.backgroundColor,
        }}>
        {/* <Header
                    title={'Profile'}
                /> */}
        <HeaderBateeq />
        <ScrollView>
          <Text
            style={{
              ...FONTS.fontSatoshiBold,
              color: COLORS.title,
              fontSize: 24,
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}>
            Account Details
          </Text>
          <View style={GlobalStyleSheet.container}>
            {isLoading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>Loading . . .</Text>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 20,
                }}>
                <Image
                  style={{
                    height: 80,
                    width: 90,
                    borderRadius: 5,
                    marginRight: 15,
                  }}
                  source={IMAGES.user}
                />
                <View
                  style={{
                    flex: 1,
                    marginTop: 20,
                  }}>
                  <Text style={{...FONTS.h6}}>
                    {dataAccount?.default_address?.name || ''}
                  </Text>
                  <Text style={{...FONTS.font}}>{dataAccount?.email}</Text>
                  <Text style={{...FONTS.font}}>
                    {dataAccount?.default_address?.phone || ''}
                  </Text>
                </View>
                {/* <IconButton 
                                onPress={() => navigation.navigate('EditProfile')}
                                color={COLORS.primary} 
                                icon={props => <Octicons name="pencil" {...props} />} 
                            /> */}
              </View>
            )}

            {/* <View style={{
                            flexDirection:'row',
                            flexWrap:'wrap',
                            marginHorizontal:-10,
                        }}>
                            <View style={{width:'50%',paddingHorizontal:5}}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Orders')}
                                    style={styles.profileBtn}
                                >
                                    <Ionicons style={{marginRight:10,top:-1}} color={COLORS.text} size={20} name={'cube-outline'} />
                                    <Text style={{...FONTS.h6}}>Orders</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{width:'50%',paddingHorizontal:5}}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Wishlist')}
                                    style={styles.profileBtn}
                                    >
                                    <FeatherIcon style={{marginRight:10,top:-1}} color={COLORS.text} size={20} name={'heart'} />
                                    <Text style={{...FONTS.h6}}>Wishlist</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{width:'50%',paddingHorizontal:5}}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Coupons')}
                                    style={styles.profileBtn}
                                >
                                    <FeatherIcon style={{marginRight:10,top:-1}} color={COLORS.text} size={20} name={'gift'} />
                                    <Text style={{...FONTS.h6}}>Coupons</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{width:'50%',paddingHorizontal:5}}>
                                <TouchableOpacity
                                    style={styles.profileBtn}
                                >
                                    <FeatherIcon style={{marginRight:10,top:-1}} color={COLORS.text} size={20} name={'headphones'} />
                                    <Text style={{...FONTS.h6}}>Help Center</Text>
                                </TouchableOpacity>
                            </View>
                        </View> */}
          </View>
          <View style={{...GlobalStyleSheet.container, marginTop: -20}}>
            {/* <Text style={{...FONTS.h6,marginBottom:5}}>Account Settings</Text> */}
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate('EditProfile')}
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  paddingVertical: 20,
                  borderBottomWidth: 2,
                  borderBottomColor: '#FAFAFA',
                }}>
                {/* <FeatherIcon style={{marginRight:12}} color={COLORS.secondary} size={20} name='user'/> */}
                <Text
                  style={{
                    ...FONTS.fontSatoshiBold,
                    fontSize: 20,
                    color: COLORS.title,
                    flex: 1,
                  }}>
                  Account Details
                </Text>
                <FeatherIcon
                  size={20}
                  color={COLORS.title}
                  name="chevron-right"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Address')}
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  paddingVertical: 20,
                  borderBottomWidth: 2,
                  borderBottomColor: '#FAFAFA',
                }}>
                {/* <FeatherIcon style={{marginRight:12}} color={COLORS.secondary} size={18} name='map-pin'/> */}
                <Text
                  style={{
                    ...FONTS.fontSatoshiBold,
                    fontSize: 20,
                    color: COLORS.title,
                    flex: 1,
                  }}>
                  Address List
                </Text>
                <FeatherIcon
                  size={20}
                  color={COLORS.title}
                  name="chevron-right"
                />
              </TouchableOpacity>
              {/* <TouchableOpacity
                                onPress={() => RBSheetLanguage.current.open()}
                                style={styles.listItem}
                            >
                                <Ionicons style={{marginRight:12}} color={COLORS.secondary} size={20} name='ios-language'/>
                                <Text style={{...FONTS.font,color:COLORS.title,flex:1}}>Select Language</Text>
                                <FeatherIcon size={20} color={COLORS.title} name='chevron-right'/>
                            </TouchableOpacity> */}
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  paddingVertical: 20,
                  borderBottomWidth: 2,
                  borderBottomColor: '#FAFAFA',
                }}>
                {/* <FeatherIcon style={{marginRight:12}} color={COLORS.secondary} size={20} name='bell'/> */}
                <Text
                  style={{
                    ...FONTS.fontSatoshiBold,
                    fontSize: 20,
                    color: COLORS.title,
                    flex: 1,
                  }}>
                  App Setting
                </Text>
                <FeatherIcon
                  size={20}
                  color={COLORS.title}
                  name="chevron-right"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  paddingVertical: 20,
                  marginBottom: 20,
                  borderBottomWidth: 2,
                  borderBottomColor: '#FAFAFA',
                }}>
                {/* <FeatherIcon style={{marginRight:12}} color={COLORS.secondary} size={20} name='bell'/> */}
                <Text
                  style={{
                    ...FONTS.fontSatoshiBold,
                    fontSize: 20,
                    color: COLORS.title,
                    flex: 1,
                  }}>
                  FAQ & Help
                </Text>
                <FeatherIcon
                  size={20}
                  color={COLORS.title}
                  name="chevron-right"
                />
              </TouchableOpacity>
              {/* <TouchableOpacity
                                onPress={() => navigation.navigate('Onboarding')}
                                style={styles.listItem}
                            >
                                <FeatherIcon style={{marginRight:12}} color={COLORS.secondary} size={20} name='log-out'/>
                                <Text style={{...FONTS.font,color:COLORS.title,flex:1}}>Log Out</Text>
                                <FeatherIcon size={20} color={COLORS.title} name='chevron-right'/>
                            </TouchableOpacity> */}
              <CustomButton
                arrowIcon={true}
                title="Log Out"
                color={'#FF3544'}
                onPress={async () => {
                  setIsLoggedOut(true);
                  await AsyncStorage.removeItem('tokenAccess');
                  navigation.navigate('SignIn');
                }}
                logout={true}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  profileBtn: {
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    paddingHorizontal: 15,
    paddingBottom: 7,
    paddingTop: 8,
    borderRadius: 6,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderColor,
  },
});

export default Profile;

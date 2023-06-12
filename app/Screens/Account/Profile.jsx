import React, { useEffect, useRef, useState } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FeatherIcon from 'react-native-vector-icons/Feather';
import RBSheet from 'react-native-raw-bottom-sheet';
import { gql, useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS, IMAGES } from '../../constants/theme';
import india from '../../assets/images/flags/india.png';
import UnitedStates from '../../assets/images/flags/UnitedStates.png';
import german from '../../assets/images/flags/german.png';
import italian from '../../assets/images/flags/italian.png';
import spanish from '../../assets/images/flags/spanish.png';
import CustomButton from '../../components/CustomButton';
import LoadingScreen from '../../components/LoadingView';
import { setCartId } from '../../store/reducer';
import HeaderComponent from '../../components/HeaderComponent';

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
function Profile() {
  const navigation = useNavigation();
  const [dataAccount, setDataAccount] = useState(null);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const RBSheetLanguage = useRef();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const { customerInfo } = useSelector(state => state.user);

  useEffect(() => {
    if (isLoggedOut && isFocused) {
      navigation.navigate('SignIn');
    }
  }, [isLoggedOut, isFocused, navigation]);

  console.log('customerInfo', customerInfo);
  return (
    <>
      <RBSheet
        ref={RBSheetLanguage}
        closeOnDragDown
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
        }}
      >
        <View
          style={{
            alignItems: 'center',
            borderBottomWidth: 1,
            borderColor: COLORS.borderColor,
            paddingBottom: 8,
            paddingTop: 4,
          }}
        >
          <Text style={{ ...FONTS.h5, color: COLORS.title }}>Language</Text>
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 15 }}>
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
              }}
            >
              <Image
                style={{
                  height: 20,
                  width: 25,
                  marginRight: 12,
                }}
                source={data.flag}
              />
              <Text style={{ ...FONTS.fontLg, color: COLORS.title, flex: 1 }}>{data.name}</Text>
              <FeatherIcon name="chevron-right" color={COLORS.text} size={24} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </RBSheet>

      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: COLORS.backgroundColor,
        }}
      >
        <HeaderComponent />
        <ScrollView>
          <Text
            style={{
              ...FONTS.fontSatoshiBold,
              color: COLORS.title,
              fontSize: 24,
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
          >
            Account Details
          </Text>
          <View style={GlobalStyleSheet.container}>
            {isLoading ? (
              <LoadingScreen type="circle" />
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 20,
                }}
              >
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
                  }}
                >
                  <Text style={{ ...FONTS.h6 }}>{`${customerInfo?.first_name} ${customerInfo?.last_name}` || ''}</Text>
                  <Text style={{ ...FONTS.font }}>{customerInfo?.email || ''}</Text>
                  <Text style={{ ...FONTS.font }}>{customerInfo?.phone || ''}</Text>
                </View>
              </View>
            )}
          </View>
          <View style={{ ...GlobalStyleSheet.container, marginTop: -20 }}>
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate('EditProfile')}
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  paddingVertical: 20,
                  borderBottomWidth: 2,
                  borderBottomColor: '#FAFAFA',
                }}
              >
                <Text
                  style={{
                    ...FONTS.fontSatoshiBold,
                    fontSize: 20,
                    color: COLORS.title,
                    flex: 1,
                  }}
                >
                  Account Details
                </Text>
                <FeatherIcon size={20} color={COLORS.title} name="chevron-right" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Address')}
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  paddingVertical: 20,
                  borderBottomWidth: 2,
                  borderBottomColor: '#FAFAFA',
                }}
              >
                <Text
                  style={{
                    ...FONTS.fontSatoshiBold,
                    fontSize: 20,
                    color: COLORS.title,
                    flex: 1,
                  }}
                >
                  Address List
                </Text>
                <FeatherIcon size={20} color={COLORS.title} name="chevron-right" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  paddingVertical: 20,
                  borderBottomWidth: 2,
                  borderBottomColor: '#FAFAFA',
                }}
              >
                <Text
                  style={{
                    ...FONTS.fontSatoshiBold,
                    fontSize: 20,
                    color: COLORS.title,
                    flex: 1,
                  }}
                >
                  App Setting
                </Text>
                <FeatherIcon size={20} color={COLORS.title} name="chevron-right" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  paddingVertical: 20,
                  marginBottom: 20,
                  borderBottomWidth: 2,
                  borderBottomColor: '#FAFAFA',
                }}
              >
                <Text
                  style={{
                    ...FONTS.fontSatoshiBold,
                    fontSize: 20,
                    color: COLORS.title,
                    flex: 1,
                  }}
                >
                  FAQ & Help
                </Text>
                <FeatherIcon size={20} color={COLORS.title} name="chevron-right" />
              </TouchableOpacity>
              <CustomButton
                arrowIcon
                title="Log Out"
                color="#FF3544"
                onPress={async () => {
                  setIsLoggedOut(true);
                  await AsyncStorage.removeItem('accessToken');
                  dispatch(setCartId(''));
                  navigation.navigate('SignIn');
                }}
                logout
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default Profile;

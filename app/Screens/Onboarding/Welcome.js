import React from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import CustomButton from '../../components/CustomButton';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {COLORS, FONTS, IMAGES} from '../../constants/theme';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome5Brands from 'react-native-vector-icons/FontAwesome5Pro';
import Swiper from 'react-native-swiper';

const SwiperData = [
  {
    title: 'fashion style trend center for women',
    desc: 'Launched in 2013, bateeq is an Indonesian fashion brand that offers a fresh, fashion-forward take on batik through our clothing line for men, women and children, in addition to home decor.',
  },
  {
    title: 'Fresh & Fashion forward',
    desc: 'bateeq memberikan sentuhan modern pada kerajinan yang berusia berabad-abad untuk menciptakan berbagai koleksi gaun, kemeja, blus, dan celana siap pakai bagi pelanggan dan retailer kosmopolitan masa kini',
  },
  {
    title: 'fashion style trend center for women',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
  },
];

const Welcome = props => {
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <View
          style={{
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center',
            paddingVertical: 30,
          }}>
          <Image
            style={{
              height: 100,
              resizeMode: 'contain',
              marginBottom: 20,
            }}
            source={IMAGES.logoWhite}
          />
          {/* <Image
                        style={{
                            height:25,
                            resizeMode:'contain',
                        }}
                        source={IMAGES.logoTextWhite}
                    /> */}
        </View>
        <View>
          <Swiper
            loop={false}
            height={'100%'}
            dotStyle={{
              height: 10,
              width: 10,
              borderRadius: 10,
            }}
            activeDotStyle={{
              height: 10,
              width: 10,
              borderRadius: 10,
              backgroundColor: COLORS.title,
            }}
            paginationStyle={{
              bottom: 28,
            }}
            showsButtons={false}>
            {SwiperData.map((data, index) => {
              return (
                <View
                  style={{paddingHorizontal: 30, paddingBottom: 70}}
                  key={index}>
                  <Text
                    style={{
                      ...FONTS.fontSatoshiBold,
                      fontSize: 24,
                      color: COLORS.title,
                      textAlign: 'center',
                      textTransform: 'capitalize',
                      marginBottom: 8,
                    }}>
                    {data.title}
                  </Text>
                  <Text
                    style={[
                      FONTS.fontSatoshiRegular,
                      {textAlign: 'center', color: 'rgba(0,0,0,.7)'},
                    ]}>
                    {data.desc}
                  </Text>
                </View>
              );
            })}
          </Swiper>
        </View>

        <View style={GlobalStyleSheet.container}>
          <View style={{marginBottom: 10}}>
            <CustomButton
              onPress={() => props.navigation.navigate('SignIn')}
              icon={<FeatherIcon name="mail" color={'#fff'} size={22} />}
              title={'Continue with Email'}
            />
          </View>
          {/* <View style={{marginBottom: 10}}>
            <CustomButton
              onPress={() => props.navigation.navigate('SignIn')}
              icon={
                <FontAwesome5Brands color={'#fff'} name="facebook" size={22} />
              }
              color={'#305CCD'}
              title={'Sign in With Facebook'}
            />
          </View> */}
          <View>
            <CustomButton
              onPress={() => props.navigation.navigate('SignIn')}
              icon={
                <Image style={{height: 22, width: 22}} source={IMAGES.google} />
              }
              textColor={'#282828'}
              color={'#fff'}
              title={'Sign in With Google'}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Welcome;

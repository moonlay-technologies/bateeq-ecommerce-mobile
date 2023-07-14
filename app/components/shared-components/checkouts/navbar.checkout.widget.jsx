import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useWindowDimensions, View, Text, Image, BackHandler, ScrollView } from 'react-native';
import Octicons from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../constants/theme';
import { GetCheckoutId, NAVIGATES } from '../../../store/actions';
import { REQUEST } from '../../../store/actions/action.type';
import { NAVIGATE_TO } from '../../../store/constants/navigation';
import Button from '../../ButtonComponent';

function mapStateToProps({ Checkout }) {
  return { show: Checkout?.show ?? { loading: false, data: null } };
}

function NavbarCheckoutWidget({ GetCheckoutId, show, ...props }) {
  const { data, loading } = show;
  console.log({ show });
  const navigation = useNavigation();
  const screen = useWindowDimensions();

  const [style, setStyle] = useState({
    hero: {
      bottom: 0,
      left: 0,
      zIndex: 9999999,
      position: 'absolute',
      padding: 15,
      minHeight: 90,

      width: screen.width,
    },
    content: {
      shadowColor: 'rgba(0,0,0,0.88)',
      shadowOffset: {
        width: 10,
        height: 5,
      },
      shadowOpacity: 0.5,
      shadowRadius: 10,
      elevation: 10,
      width: '100%',
      backgroundColor: '#ffffff',
      padding: 15,
      borderRadius: 10,
      justifyContent: 'space-between',
      // flex:1,
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

  useEffect(() => {
    const handleBackPress = () => {
      // Code to be executed when the back button is pressed
      console.log('Back button pressed');

      // Return `true` to prevent the default back button behavior
      return true;
    };

    // Subscribe to the back button press event
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    // Clean up the event listener when the component unmounts
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [BackHandler]);

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = navigation.addListener('state', () => {
        AsyncStorage.getItem('checkoutId').then(value => {
          GetCheckoutId({ checkoutId: value ?? null });
        });
      });

      return () => {
        unsubscribe();
      };
    }, [])
  );

  useEffect(() => {
    if (props?.checkoutId) {
      if (data && data?.order !== null) {
        setStyle({
          ...style,
          hero: {
            ...style?.hero,
            bottom: -500,
          },
        });
      } else {
        setStyle({
          ...style,
          hero: {
            ...style?.hero,
            bottom: 0,
          },
        });
      }
    }
  }, [props?.checkoutId, loading, data]);

  return (
    <View style={{ flex: 1 }}>
      {!loading && show?.data && (
        <View style={style.hero}>
          <View
            style={{
              ...style.content,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                {Array.isArray(data?.lineItems?.nodes) &&
                  data?.lineItems?.nodes.length > 0 &&
                  data?.lineItems?.nodes.slice(0, 2).map((item, index) => (
                    <View
                      style={{
                        height: 40,
                        width: 40,
                        left: index > 0 ? -(30 * index) : 0,
                        borderWidth: 2,
                        borderColor: '#fff',
                        zIndex: index,
                        borderRadius: 20,
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 5,
                          height: 5,
                        },
                        shadowOpacity: 0.5,
                        shadowRadius: 5,
                        overflow: 'hidden',
                        backgroundColor: 'rgba(122,122,122,1)',
                      }}
                    >
                      <Image
                        style={{
                          height: '100%',
                          width: '100%',
                          resizeMode: 'cover',
                        }}
                        source={{
                          uri: item?.image?.url ?? null,
                        }}
                      />
                    </View>
                  ))}

                {data?.lineItems &&
                  typeof data?.lineItems?.nodes !== 'undefined' &&
                  data?.lineItems?.nodes.length > 2 && (
                    <View
                      style={{
                        height: 40,
                        width: 40,
                        borderRadius: 20,
                        left: -(data?.lineItems?.nodes.length - 2 > 0 ? 60 : 30),
                        zIndex: 11,
                        borderColor: '#fff',
                        borderWidth: 2,
                        backgroundColor: 'rgba(122,122,122,1)',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text
                        style={{
                          color: '#fff',
                        }}
                      >
                        {[data?.lineItems?.nodes.length - 2, '+'].join('')}
                      </Text>
                    </View>
                  )}
              </View>
              <View
                style={{
                  flex: 1,
                  left:
                    (data?.lineItems?.nodes.length ?? 0) > 2
                      ? -50
                      : -(((data?.lineItems?.nodes?.length - 1 ?? 2) - 1) * 20),
                  flexDirection: 'column',
                  flexWrap: 'nowrap',
                  alignItems: 'flex-start',
                }}
              >
                <Text style={{ color: COLORS.black, fontWeight: 'bold' }}>Checkout</Text>
                <View
                  style={{
                    flexDirection: 'row',

                    alignItems: 'center',
                  }}
                >
                  <Text style={{ fontSize: 12 }}>
                    {data?.lineItems?.nodes
                      .slice(0, 2)
                      .map(item => item?.title.slice(0, 10))
                      .join('...')}
                  </Text>
                </View>
              </View>
              {/**
               * BUAT MAS REZA
               */}
              <Button
                onPress={() => props?.NAVIGATES('Checkout', { webUrl: 'http://asdladmalskd.caosdmadas' })}
                title="Lanjutkan"
                size="sm"
                style={{ paddingVertical: 7, paddingHorizontal: 15, backgroundColor: COLORS.black, borderRadius: 5 }}
              />
            </View>
            {/* <Octicons size={18} style={{ marginRight: 20 }} color="#FFA800" name="luggage-cart" /> */}
          </View>
        </View>
      )}

      <ScrollView>
        <View style={{ flex: 1, backgroundColor: '#EEEEEE' }}>{props?.children}</View>
      </ScrollView>
    </View>
  );
}


export default connect(
	mapStateToProps,{GetCheckoutId, NAVIGATES}
)(NavbarCheckoutWidget);
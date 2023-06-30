import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TouchableOpacity, Image, Animated, TouchableWithoutFeedback } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation, CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartGetList, DrawerToggle } from '../store/actions';
import { COLORS, FONTS, IMAGES } from '../constants/theme';
import { SidebarMenuItem } from './routes/menu-items';

function SideBarComponent({ options, visible, DrawerToggle: drawerToggle, CartGetList: cartGetList, cartId }) {
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const drawerWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(drawerWidth, {
      toValue: visible ? 0.8 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const handleOverlayPress = () => {
    drawerToggle();
  };

  const drawerTranslateX = drawerWidth.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 70], // Adjust the value as per your sidebar width
  });

  const onNavigate = menu => {
    const { navigate, name } = menu;
    if (name === 'Cart') {
      cartGetList({ first: 10, last: 0, id: cartId });
    }
    if (name === 'Logout') {
      (async () => {
        await AsyncStorage.removeItem('accessToken');
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: `${navigate}` }],
          })
        );
      })();
    }
    navigation.navigate(`${navigate}`);
    drawerToggle();
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={handleOverlayPress}>
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: COLORS.overlay,
            opacity: visible ? 1 : 0,
            zIndex: visible ? 999 : -1,
          }}
        />
      </TouchableWithoutFeedback>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: visible ? '80%' : 0,
          height: '100%',
          backgroundColor: COLORS.white,
          transform: [{ translateX: drawerTranslateX }],
          duration: 300,
          zIndex: 9999,
        }}
      >
        <ScrollView ref={scrollViewRef} contentContainerStyle={{ marginTop: 4, marginHorizontal: 4 }}>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              paddingVertical: 20,
              borderBottomWidth: 1,
              borderBottomColor: COLORS.borderColor,
              marginBottom: 10,
            }}
          >
            <Image
              style={{
                height: 50,
                width: 50,
                marginRight: 10,
                borderRadius: 50,
              }}
              source={IMAGES.user}
            />

            <View style={{ flex: 1 }}>
              <Text
                style={{
                  ...FONTS.fontSatoshiBold,
                  fontSize: 18,
                  color: COLORS.title,
                  top: 2,
                }}
              >
                {`${options?.info?.firstName ?? '-'} ${options?.info?.lastName ?? '-'}`}
              </Text>

              <Text style={{ ...FONTS.fontSatoshiRegular, color: COLORS.overlay }}>{options?.info?.email ?? '-'}</Text>
            </View>
          </View>
          {SidebarMenuItem.map(menu => (
            <TouchableOpacity
              onPress={() => onNavigate(menu)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 20,
                paddingVertical: 12,
              }}
            >
              <View style={{ marginRight: 15 }}>
                <FeatherIcon name={menu.icon} color="rgba(0,0,0,.3)" size={20} />
              </View>
              <Text
                style={{
                  ...FONTS.fontSatoshiBold,
                  color: COLORS.title,
                  opacity: 0.8,
                  flex: 1,
                }}
              >
                {menu.name}
              </Text>
              <FeatherIcon size={16} color={COLORS.text} name="chevron-right" />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>
    </>
  );
}
//   {options?.loading ? (
//     <View
//       style={{
//         flexDirection: 'row',
//         paddingHorizontal: 20,
//         paddingVertical: 20,
//         borderBottomWidth: 1,
//         borderBottomColor: COLORS.borderColor,
//         marginBottom: 10,
//       }}
//     >
//       <Text>Loading...</Text>
//     </View>
//   ) : (
//   )}
export default connect(
  ({ User, Cart, Theme }) => {
    const { options } = User;
    const { cartId } = Cart.options;
    const { visible } = Theme.sidebar;
    return {
      options,
      CustomDrawer: options?.info,
      cartId,
      visible,
    };
  },
  { CartGetList, DrawerToggle }
)(SideBarComponent);

import React, { useEffect, useState, useRef } from 'react';
import { Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { Provider as PaperProvider } from 'react-native-paper';
import {batch, connect, useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQuery } from '@apollo/client';
import SplashScreen from '../components/SplashScreen';
import StackNavigator from './StackNavigator';
import { GET_CUSTOMER_INFO } from '../graphql/queries';
// import { setIsLogin, setCustomerInfo, setToken, setCartId, setDefaultAddress } from '../store/reducer';
import { CREATE_CART } from '../graphql/mutation';
import {LoadUsers,setToken} from "../store/actions/user";

function Routes({ ...props }) {
    let { options, loading, isAuthenticated } = props
  const fadeAnim = useRef(new Animated.Value(1)).current;


  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const { isLogin, getToken } = useSelector(state => state.user);
  //
  // const cart = useSelector(state => state.cart);
  // const { data } = useQuery(GET_CUSTOMER_INFO, {
  //   variables: {
  //     accessToken: getToken,
  //   },
  // });
  // const [cartCreate] = useMutation(CREATE_CART);
  //
  // useEffect(() => {
  //   setTimeout(() => {
  //     Animated.timing(fadeAnim, {
  //       toValue: 0,
  //       duration: 500,
  //       useNativeDriver: true,
  //     }).start(() => {
  //       setShowSplashScreen(false);
  //     });
  //   }, 3000);
  // }, []);
  //
  // useEffect(() => {
  //   const checkAccessToken = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem('accessToken');
  //       const cartLocal = await AsyncStorage.getItem('cartId');
  //       if (isLogin || token) {
  //         const accessToken = token;
  //         if (cartLocal) {
  //           dispatch(setCartId(cartLocal));
  //         } else {
  //           handleCreateCart(accessToken);
  //         }
  //         batch(() => {
  //           dispatch(setToken(accessToken));
  //           dispatch(setIsLogin(!!accessToken));
  //
  //           if (data?.customer) {
  //             dispatch(
  //               setCustomerInfo({
  //                 id: data?.customer?.id,
  //                 email: data?.customer?.email,
  //                 first_name: data?.customer?.firstName,
  //                 last_name: data?.customer?.lastName,
  //                 phone: data?.customer?.phone,
  //               })
  //             );
  //             dispatch(
  //               setDefaultAddress({
  //                 address1: data?.customer?.defaultAddress?.address1,
  //                 address2: data?.customer?.defaultAddress?.address2,
  //                 city: data?.customer?.defaultAddress?.city,
  //                 company: data?.customer?.defaultAddress?.company,
  //                 country: data?.customer?.defaultAddress?.country,
  //                 name: data?.customer?.defaultAddress?.name,
  //                 firstName: data?.customer?.defaultAddress?.firstName,
  //                 lastName: data?.customer?.defaultAddress?.lastName,
  //                 phone: data?.customer?.defaultAddress?.phone,
  //                 province: data?.customer?.defaultAddress?.province,
  //                 zip: data?.customer?.defaultAddress?.zip,
  //               })
  //             );
  //           }
  //         });
  //
  //         setIsAuthenticated(!!accessToken);
  //       }
  //     } catch (error) {
  //       console.log('Error reading access token from AsyncStorage:', error);
  //     }
  //   };
  //   checkAccessToken();
  // }, [cart, data]);

  // const handleCreateCart = async token => {
  //   const { data: cartCreated } = await cartCreate({
  //     variables: {
  //       input: {
  //         buyerIdentity: {
  //           customerAccessToken: token,
  //         },
  //         note: '',
  //       },
  //     },
  //   });
  //   if (cartCreated?.cartCreate?.cart) {
  //     const { id: cartId } = cartCreated.cartCreate.cart;
  //     await AsyncStorage.setItem('cartId', cartId);
  //     dispatch(setCartId(cartId));
  //   }
  // };


    console.log({options,isAuthenticated,loading})
  return (
    <PaperProvider>
      <SafeAreaProvider>
        {loading ? (
          <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
            <SplashScreen />
          </Animated.View>
        ) : (
          <NavigationContainer>
            <StackNavigator isAuthenticated={isAuthenticated} />
          </NavigationContainer>
        )}
        <Toast />
      </SafeAreaProvider>
    </PaperProvider>
  );
}

export default connect(({Auth,User})=> {
    let { isAuthenticated } = Auth
    let { options,loading } = User
    return {options ,isAuthenticated,loading }
},{LoadUsers,setToken})(React.memo(Routes));

/* eslint-disable no-param-reassign */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogin: false,
    getToken: '',
    userAddress: '',
    customerInfo: {
      id: '',
      email: '',
      first_name: '',
      last_name: '',
      phone: '',
    },
  },
  reducers: {
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setToken: (state, action) => {
      state.getToken = action.payload;
    },
    setAddress: (state, action) => {
      state.userAddress = action.payload;
    },
    setCustomerInfo: (state, action) => {
      state.customerInfo = action.payload;
    },
  },
});

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    isOpen: false,
  },
  reducers: {
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    id: '',
    cartData: [],
  },
  reducers: {
    setCartId: (state, action) => {
      state.id = action.payload;
      AsyncStorage.setItem('cart', action.payload);
    },
    extraReducers: builder => {
      console.log('builder', builder);
      builder.addCase('@@INIT', () => {
        AsyncStorage.getItem('cart')
          .then(cartId => {
            console.log('cartId extraReducers', cartId);
            // If cart ID exists in local storage, dispatch the setCartId action to update the state
            if (cartId) {
              store.dispatch(setCartId(cartId));
            }
          })
          .catch(error => {
            console.log('Error  local storage:', error);
          });
      });
    },
    setCartData: (state, action) => {
      state.cartData = action.payload;
    },
  },
});

export const { setIsOpen } = sidebarSlice.actions;
export const { setCartId, getCartId, setCartData } = cartSlice.actions;
export const { setIsLogin, setToken, setAddress, setCustomerInfo } = userSlice.actions;

const rootReducer = {
  sidebar: sidebarSlice.reducer,
  cart: cartSlice.reducer,
  user: userSlice.reducer,
};

export default rootReducer;

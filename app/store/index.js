import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';

const store = configureStore({
  reducer: {
    open: rootReducer.sidebar,
    cart: rootReducer.cart,
    user: rootReducer.user,
    checkout: rootReducer.checkout,
  },
});

export default store;

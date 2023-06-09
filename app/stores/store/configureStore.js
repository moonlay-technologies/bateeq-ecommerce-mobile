import {configureStore} from '@reduxjs/toolkit';
import addressReducer from '../reducers/addressReducer';
import customerReducer from '../reducers/customerReducer';

const store = configureStore({
  reducer: {
    customer: customerReducer,
    address: addressReducer,
  },
});

export default store;

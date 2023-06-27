import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';

const store = configureStore({
  reducer: {
    user: rootReducer.user,
  },
});

export default store;

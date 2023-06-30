import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOG_OUT, SET_AUTH } from '../constants/Auth';
import { REQUEST } from '../actions/action.type';

const initialState = {
  isLogin: false,
  isAuthenticated: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  AsyncStorage.getItem('accessToken').then(token => {
    if (token) {
      Reflect.set(state, 'isLogin', true);
      Reflect.set(state, 'isAuthenticated', true);
    }
  });
  switch (type) {
    case REQUEST(SET_AUTH):
      return {
        ...state,
        ...payload,
      };
    case LOG_OUT:
      return {
        isLogin: false,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}

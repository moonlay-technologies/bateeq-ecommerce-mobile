import { FAILURE, REQUEST, SUCCESS } from '../actions/action.type';
import {CREATE_CHECKOUT, GET_CHECKOUT_ID, PREVIEW_CHECKOUT_SHOW} from '../constants/checkout';
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  checkoutId: null,
  visible:false,
  show: {
    loading: true,
    data: null,
  },
  collections: {
    checkout: {
      loading: true,
      params: {},
      data: {},
    },
  },
};


/**
 * @name Checkout
 * @param
 */
// @param state
// * @param {object} action
// * @param {object} action.type
// * @param {object} action.payload
// action, state = initialState
export default function (state = initialState, action) {
  const { type, payload } = action;
  AsyncStorage.getItem('checkoutId').then(value => {
    if (value) {
      Reflect.set(state, 'checkoutId', value);
    }
  });
  switch (type) {
    case GET_CHECKOUT_ID:
      return {
        ...state,
        ...payload,
        visible: !!payload?.checkoutId ?? false,
        checkoutId: payload?.checkoutId,
      };
      
    case REQUEST(PREVIEW_CHECKOUT_SHOW):
      return {
        ...state,
        show:{
          ...state.show,
          loading: true,
          data:null
        }
      }
    case SUCCESS(PREVIEW_CHECKOUT_SHOW):
      return {
        ...state,
        show:{
          ...state.show,
          data:payload,
          loading: false,
        },
        collections: {
          ...state.collections,
          checkout: {
            ...state.collections.checkout,
            loading: false,
            data: payload,
          },
        },
      }
    case FAILURE(PREVIEW_CHECKOUT_SHOW):
      return {
        ...state,
      }

    case REQUEST(CREATE_CHECKOUT):
      return {
        ...state,
        collections: {
          ...state.collections,
          checkout: {
            ...state.collections.checkout,
            loading: true,
            data: {},
          },
        },
      };

    case SUCCESS(CREATE_CHECKOUT):
      return {
        ...state,
        collections: {
          checkout: {
            loading: false,
            data: payload,
          },
        },
      };
    case FAILURE(CREATE_CHECKOUT):
      return {
        ...state,
        collections: {
          ...state.collections,
          checkout: {
            ...state.collections.checkout,
            loading: false,
            data: {},
          },
        },
      };
    default:
      return state;
  }
}

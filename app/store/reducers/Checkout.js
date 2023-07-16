import { FAILURE, REQUEST, SUCCESS } from '../actions/action.type';
import { CREATE_CHECKOUT, GET_CHECKOUT_ID } from '../constants/checkout';

const initialState = {
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

  switch (type) {
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
    case REQUEST(GET_CHECKOUT_ID):
      return {
        ...state,
        collections: {
          ...state.collections,
          checkout: {
            ...state.collections.checkout.data,
            loading: false,
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

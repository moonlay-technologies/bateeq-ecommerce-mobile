import { FAILURE, REQUEST, SUCCESS } from '../actions/action.type';
import { CREATE_CHECKOUT } from '../constants/checkout';

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
 * @param state
 * @param {object} action
 * @param {object} action.type
 * @param {object} action.payload
 */
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
            loading: false,
            data: {},
          },
        },
      };
    case SUCCESS(CREATE_CHECKOUT):
      return {
        ...state,
        collections: {
          ...state.collections,
          checkout: {
            ...state.collections.checkout,
            loading: false,
            data: payload?.data || {},
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

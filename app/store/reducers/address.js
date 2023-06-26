import { SUCCESS, REQUEST, FAILURE } from '../actions/action.type';
import {
  CREATE_ADDRESS,
  DELETE_ADDRESS,
  GET_ADDRESS_LIST,
  REFETCH_ADDRESS_LIST,
  UPDATE_ADDRESS,
  UPDATE_DEFAULT_ADDRESS,
} from '../constants/address';

const initialState = {
  addressList: {
    loading: true,
    data: [],
    isChange: false,
  },
  actionLoading: false,
  defaultAddress: {
    loading: true,
    data: {},
  },
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // get list of address
    case REQUEST(GET_ADDRESS_LIST):
      return {
        ...state,
      };
    case SUCCESS(GET_ADDRESS_LIST):
      console.log('get Address reducer', payload?.addresses);
      return {
        ...state,
        addressList: {
          loading: false,
          data: payload?.addresses,
        },
        defaultAddress: {
          loading: false,
          data: payload?.defaultAddress,
        },
      };
    case FAILURE(GET_ADDRESS_LIST):
      return {
        ...state,
        addressList: {
          ...state.addressList,
          loading: false,
        },
        defaultAddress: {
          ...state.defaultAddress,
          loading: false,
        },
      };

    // update action
    case REQUEST(UPDATE_ADDRESS):
      return {
        addressList: {
          loading: true,
          isChange: true,
          ...state.addressList,
        },
        actionLoading: true,
        ...state.defaultAddress,
      };
    case SUCCESS(UPDATE_ADDRESS):
      return {
        ...state,
        addressList: {
          loading: false,
          isChange: true,
          ...state.addressList,
        },
        actionLoading: false,
        ...state.defaultAddress,
      };
    case FAILURE(UPDATE_ADDRESS):
      return {
        ...state,
        addressList: {
          ...state.addressList,
          loading: false,
        },
        defaultAddress: {
          ...state.defaultAddress,
          loading: false,
        },
      };

    // update default address
    case REQUEST(UPDATE_DEFAULT_ADDRESS):
      return {
        addressList: {
          loading: true,
          isChange: true,
          ...state.addressList,
        },
        ...state.defaultAddress,
      };
    case SUCCESS(UPDATE_DEFAULT_ADDRESS):
      return {
        ...state,
        addressList: {
          loading: false,
          isChange: true,
          data: [...state.addressList.filter(i => i.id !== payload?.id), state.defaultAddress],
        },
        defaultAddress: {
          loading: false,
          data: state.addressList.data.find(i => i.id === payload?.id),
        },
      };
    case FAILURE(UPDATE_DEFAULT_ADDRESS):
      return {
        ...state,
        addressList: {
          ...state.addressList,
          loading: false,
        },
        defaultAddress: {
          ...state.defaultAddress,
          loading: false,
        },
      };

    // create address
    case REQUEST(CREATE_ADDRESS):
      return {
        addressList: {
          loading: true,
          isChange: true,
          ...state.addressList,
        },
        ...state.defaultAddress,
      };
    case SUCCESS(CREATE_ADDRESS):
      return {
        ...state,
        addressList: {
          loading: false,
          isChange: false,
          data: [...state.addressList.data, payload],
        },
        ...state.defaultAddress,
      };
    case FAILURE(CREATE_ADDRESS):
      return {
        ...state,
        addressList: {
          ...state.addressList,
          loading: false,
        },
        defaultAddress: {
          ...state.defaultAddress,
          loading: false,
        },
      };
    // refetch address
    case REQUEST(REFETCH_ADDRESS_LIST):
      return {
        ...state,
        refetchLoading: true,
      };
    case SUCCESS(REFETCH_ADDRESS_LIST):
      return {
        ...state,
        refetchLoading: false,
      };
    case FAILURE(REFETCH_ADDRESS_LIST):
      return {
        ...state,
        refetchLoading: false,
      };

    // delete Address
    case REQUEST(DELETE_ADDRESS):
      return {
        addressList: {
          loading: true,
          isChange: true,
          ...state.addressList,
        },
        ...state.defaultAddress,
      };
    case SUCCESS(DELETE_ADDRESS):
      console.log('payload', payload);
      console.log(
        'delete success',
        state.addressList.data.filter(i => i.id !== payload?.id)
      );
      return {
        ...state,
        addressList: {
          loading: false,
          isChange: false,
          data: state.addressList.data.filter(i => i.id !== payload?.id),
        },
        ...state.defaultAddress,
      };
    case FAILURE(DELETE_ADDRESS):
      return {
        ...state,
        addressList: {
          ...state.addressList,
          loading: false,
        },
        defaultAddress: {
          ...state.defaultAddress,
          loading: false,
        },
      };
    default:
      return state;
  }
}

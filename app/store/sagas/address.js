import { gql } from '@apollo/client';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { GET_CUSTOMER_ADDRESS } from '../../graphql/queries';
import { client } from '../../..';
import { FAILURE, REQUEST, SUCCESS } from '../actions/action.type';
import {
  CREATE_ADDRESS,
  DELETE_ADDRESS,
  GET_ADDRESS_LIST,
  UPDATE_ADDRESS,
  UPDATE_DEFAULT_ADDRESS,
} from '../constants/address';
import {
  CREATE_CUSTOMER_ADDRESS,
  CUSTOMER_DEFAULT_ADDRESS_UPDATE,
  REMOVE_CUSTOMER_ADDRESS,
  UPDATE_CUSTOMER_ADDRESS,
} from '../../graphql/mutation';

export function* getUserAddress() {
  yield takeEvery(REQUEST(GET_ADDRESS_LIST), function* ({ payload }) {
    try {
      const query = gql`
        ${GET_CUSTOMER_ADDRESS}
      `;

      const variables = {
        fetchPolicy: 'no-cache',
        accessToken: payload?.token,

        limit: payload?.limit || 20,
      };

      const response = yield call(client.query, {
        query,
        variables,
      });

      if (response.data.customer.addresses) {
        const newPayload = {
          addresses: response.data.customer.addresses.edges.map(i => i.node),
          defaultAddress: response.data.customer.defaultAddress,
        };

        yield put({ type: SUCCESS(GET_ADDRESS_LIST), payload: newPayload });
      }
    } catch (error) {
      yield put({
        type: FAILURE(GET_ADDRESS_LIST),
      });
    }
  });
}

export function* createUserAddress() {
  yield takeEvery(REQUEST(CREATE_ADDRESS), function* ({ payload }) {
    try {
      const mutation = gql`
        ${CREATE_CUSTOMER_ADDRESS}
      `;
      const response = yield call(client.mutate, {
        mutation,

        variables: {
          ...payload,
        },
      });

      if (response.data.customerAddressCreate.customerAddress) {
        yield all([
          put({ type: SUCCESS(CREATE_ADDRESS), payload: response.data.customerAddressCreate.customerAddress }),
          put({ type: REQUEST(GET_ADDRESS_LIST), payload: { token: payload?.customerAccessToken } }),
        ]);
        Toast.show({
          type: 'success',
          text1: 'New address added successfully',
        });
      }
    } catch (error) {
      yield put({ type: FAILURE(CREATE_ADDRESS) });
      Toast.show({
        type: 'error',
        text1: 'Failed to add your address.',
        text2: ' Please try again',
      });
    }
  });
}

export function* updateUserAddresses() {
  yield takeEvery(REQUEST(UPDATE_ADDRESS), function* ({ payload }) {
    try {
      const mutation = gql`
        ${UPDATE_CUSTOMER_ADDRESS}
      `;

      const response = yield call(client.mutate, {
        mutation,
        variables: {
          ...payload,
        },
      });
      if (response.data.customerAddressUpdate.customerAddress) {
        const newPayload = { id: response.data.customerAddressUpdate.customerAddress.id, hasEdit: true };

        yield all([
          put({ type: SUCCESS(UPDATE_ADDRESS), payload: newPayload }),
          put({ type: REQUEST(GET_ADDRESS_LIST), payload: { token: payload?.customerAccessToken } }),
        ]);
        Toast.show({
          type: 'success',
          text1: 'Address updated sucessfully',
        });
      }
    } catch (error) {
      yield put({ type: FAILURE(UPDATE_ADDRESS) });
      Toast.show({
        type: 'error',
        text1: 'Failed to update your address.',
        text2: ' Please try again',
      });
    }
  });
}

export function* updateDefaultUserAddresses() {
  yield takeEvery(REQUEST(UPDATE_DEFAULT_ADDRESS), function* ({ payload }) {
    try {
      const mutation = gql`
        ${CUSTOMER_DEFAULT_ADDRESS_UPDATE}
      `;

      const response = yield call(client.mutate, {
        mutation,
        variables: {
          ...payload,
        },
      });

      if (response.data.customerDefaultAddressUpdate.customer) {
        const newPayload = { id: response.data.customerDefaultAddressUpdate.customer.id, hasEdit: true };

        yield all([
          put({ type: SUCCESS(UPDATE_DEFAULT_ADDRESS), payload: newPayload }),
          put({ type: REQUEST(GET_ADDRESS_LIST), payload: { token: payload?.customerAccessToken } }),
        ]);
        Toast.show({
          type: 'success',
          text1: 'Default address updated successfully!',
        });
      }
    } catch (error) {
      yield put({ type: FAILURE(UPDATE_DEFAULT_ADDRESS) });
      Toast.show({
        type: 'error',
        text1: 'Failed to update your default address.',
        text2: ' Please try again',
      });
    }
  });
}

export function* deleteUserAddress() {
  yield takeEvery(REQUEST(DELETE_ADDRESS), function* ({ payload }) {
    try {
      const mutation = gql`
        ${REMOVE_CUSTOMER_ADDRESS}
      `;

      const response = yield call(client.mutate, {
        mutation,
        variables: {
          ...payload,
        },
      });

      if (response.data.customerAddressDelete) {
        const newPayload = { id: response.data.customerAddressDelete.deletedCustomerAddressId, hasEdit: true };
        yield all([
          put({ type: SUCCESS(DELETE_ADDRESS), payload: newPayload }),
          put({ type: REQUEST(GET_ADDRESS_LIST), payload: { token: payload?.customerAccessToken } }),
        ]);
        Toast.show({
          type: 'success',
          text1: 'Address deleted successfully!',
        });
      }
    } catch (error) {
      yield put({ type: FAILURE(DELETE_ADDRESS) });
      Toast.show({
        type: 'error',
        text1: 'Failed to delete address.',
        text2: ' Please try again',
      });
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(getUserAddress),
    fork(updateUserAddresses),
    fork(createUserAddress),
    fork(deleteUserAddress),
    fork(updateDefaultUserAddresses),
  ]);
}

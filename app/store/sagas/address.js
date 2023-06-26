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
import { NAVIGATE_TO } from '../constants/navigation';

export function* getUserAddress() {
  yield takeEvery(REQUEST(GET_ADDRESS_LIST), function* ({ payload }) {
    try {
      const query = gql`
        ${GET_CUSTOMER_ADDRESS}
      `;
      const response = yield call(client.query, {
        query,
        variables: {
          fetchPolicy: 'no-cache',
          accessToken: payload?.token,
          limit: 20,
        },
        refetchQueries: [
          { query, variables: { fetchPolicy: 'no-cache', accessToken: payload?.customerAccessToken, limit: 20 } },
        ],
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
      const query = gql`
        ${GET_CUSTOMER_ADDRESS}
      `;

      const response = yield call(client.mutate, {
        mutation,
        variables: {
          ...payload,
        },
        refetchQueries: [
          { query, variables: { fetchPolicy: 'no-cache', accessToken: payload?.customerAccessToken, limit: 20 } },
        ],
      });
      if (response.data.customerAddressCreate.customerAddress) {
        yield put({ type: SUCCESS(CREATE_ADDRESS), payload: response.data.customerAddressCreate.customerAddress });
        yield put({ type: REQUEST(NAVIGATE_TO), payload: 'Address' });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error?.message,
      });
      yield put({ type: FAILURE(CREATE_ADDRESS) });
    }
  });
}

export function* updateUserAddresses() {
  yield takeEvery(REQUEST(UPDATE_ADDRESS), function* ({ payload }) {
    try {
      const mutation = gql`
        ${UPDATE_CUSTOMER_ADDRESS}
      `;
      const query = gql`
        ${GET_CUSTOMER_ADDRESS}
      `;
      const response = yield call(client.mutate, {
        mutation,
        variables: {
          ...payload,
        },
        refetchQueries: [
          { query, variables: { fetchPolicy: 'no-cache', accessToken: payload?.customerAccessToken, limit: 20 } },
        ],
      });
      if (response.data.customerAddressUpdate.customerAddress) {
        const newPayload = { id: response.data.customerAddressUpdate.customerAddress.id, hasEdit: true };
        yield put({ type: SUCCESS(UPDATE_ADDRESS), payload: newPayload });
        yield put({ type: REQUEST(NAVIGATE_TO), payload: 'Address' });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error?.message,
      });
      yield put({ type: FAILURE(UPDATE_ADDRESS) });
    }
  });
}

export function* updateDefaultUserAddresses() {
  yield takeEvery(REQUEST(UPDATE_DEFAULT_ADDRESS), function* ({ payload }) {
    try {
      const mutation = gql`
        ${CUSTOMER_DEFAULT_ADDRESS_UPDATE}
      `;
      const query = gql`
        ${GET_CUSTOMER_ADDRESS}
      `;
      const response = yield call(client.mutate, {
        mutation,
        variables: {
          ...payload,
        },
        refetchQueries: [
          { query, variables: { fetchPolicy: 'no-cache', accessToken: payload?.customerAccessToken, limit: 20 } },
        ],
      });

      if (response.data.customerDefaultAddressUpdate.customer) {
        const newPayload = { id: payload?.addressId };
        yield put({ type: SUCCESS(UPDATE_DEFAULT_ADDRESS), payload: newPayload });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error?.message,
      });
      yield put({ type: FAILURE(UPDATE_DEFAULT_ADDRESS) });
    }
  });
}

export function* deleteUserAddress() {
  yield takeEvery(REQUEST(DELETE_ADDRESS), function* ({ payload }) {
    try {
      const mutation = gql`
        ${REMOVE_CUSTOMER_ADDRESS}
      `;
      const query = gql`
        ${GET_CUSTOMER_ADDRESS}
      `;

      const response = yield call(client.mutate, {
        mutation,
        variables: {
          ...payload,
        },
        refetchQueries: [
          { query, variables: { fetchPolicy: 'no-cache', accessToken: payload?.customerAccessToken, limit: 20 } },
        ],
      });

      if (response.data.customerAddressDelete) {
        const newPayload = { id: response.data.customerAddressDelete.deletedCustomerAddressId, hasEdit: true };
        yield put({ type: SUCCESS(DELETE_ADDRESS), payload: newPayload });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error?.message,
      });
      yield put({ type: FAILURE(DELETE_ADDRESS) });
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

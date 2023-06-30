import { gql } from '@apollo/client';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { CREATE_CHECKOUT_MUTATION } from '../../graphql/mutation';
import { client } from '../../..';
import { FAILURE, REQUEST, SUCCESS } from '../actions/action.type';
import { CREATE_CHECKOUT } from '../constants/checkout';
import { NAVIGATE_TO } from '../constants/navigation';

export function* createCheckout() {
  yield takeEvery(REQUEST(CREATE_CHECKOUT), function* ({ payload }) {
    try {
      const query = gql`
        ${CREATE_CHECKOUT_MUTATION}
      `;
      const response = yield call(client.mutate, {
        mutation: query,
        variables: {
          input: payload,
        },
      });

      if (response?.data?.checkoutCreate?.checkout) {
        const { id, webUrl } = response.data.checkoutCreate.checkout;
        const newPayload = { id, webUrl };
        yield put({ type: SUCCESS(CREATE_CHECKOUT), payload: newPayload });
        yield put({ type: REQUEST(NAVIGATE_TO), payload: 'Checkout' });
      } else if (response?.data?.checkoutCreate?.checkoutUserErrors.length > 0) {
        response?.data?.checkoutCreate?.checkoutUserErrors.map(error => {
          Toast.show({
            type: 'error',
            text1: error?.message,
          });
        });
        yield put({
          type: FAILURE(CREATE_CHECKOUT),
        });
      }
    } catch (error) {
      yield put({
        type: FAILURE(CREATE_CHECKOUT),
      });
    }
  });
}

export default function* rootSaga() {
  yield all([fork(createCheckout)]);
}

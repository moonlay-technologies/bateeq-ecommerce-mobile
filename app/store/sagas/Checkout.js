import { gql } from '@apollo/client';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { CREATE_CHECKOUT_MUTATION } from '../../graphql/mutation';
import { client } from '../../..';
import { FAILURE, REQUEST, SUCCESS } from '../actions/action.type';
import { CREATE_CHECKOUT } from '../constants/checkout';

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
      }
    } catch (error) {
      yield put({
        type: FAILURE(CREATE_CHECKOUT),
      });
    }
  });
}

export function* getCheckoutId() {
  try {
    yield put({ type: SUCCESS(CREATE_CHECKOUT_MUTATION), payload: state });
  } catch (error) {}
}

export default function* rootSaga() {
  yield all([fork(createCheckout)]);
}

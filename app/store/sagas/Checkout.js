import { gql } from '@apollo/client';
import { all, call, fork, put } from 'redux-saga/effects';
import { CREATE_CHECKOUT_MUTATION } from '../../graphql/mutation';
import { client } from '../../..';
import { FAILURE, SUCCESS } from '../actions/action.type';
import { CREATE_CHECKOUT } from '../constants/checkout';

export function* createCheckout(payload) {
  try {
    const query = gql`
      ${CREATE_CHECKOUT_MUTATION}
    `;
    const response = yield call(client.mutate, {
      query,
      variables: {
        input: payload.mutation,
        // input: {
        //   email: customerInfo.email,
        //   note,
        //   shippingAddress: {
        //     address1: defaultAddress?.address1,
        //     city: defaultAddress?.city,
        //     province: defaultAddress?.province,
        //     zip: defaultAddress?.zip,
        //     country: defaultAddress?.country,
        //     firstName: defaultAddress?.firstName,
        //     lastName: defaultAddress?.lastName,
        //   },
        //   lineItems: cartList?.map(i => ({
        //     variantId: i.merchandise.product.id,
        //     quantity: i.quantity,
        //   })),
        // },
      },
    });
    const newPayload = {};
    yield put({ type: SUCCESS(CREATE_CHECKOUT_MUTATION), payload: newPayload });
  } catch (error) {
    yield put({
      type: FAILURE(CREATE_CHECKOUT),
    });
  }
}

export default function* rootSaga() {
  yield all([fork(createCheckout)]);
}

import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { FAILURE, REQUEST, SUCCESS } from '../actions/action.type';
import { EDIT_ACCOUNT, LOAD_USER } from '../constants/user';
import { client } from '../../../index';
import { __GQL_CUSTOMER_INFO } from '../../graphql/queries';
import { SET_AUTH } from '../constants/Auth';
import { GENERATE_CART_ID } from '../constants';
import { __GQL_EDIT_DETAIL_ACCOUNT } from '../../graphql/mutation';
import { findKey } from '../../utils/helper';

export function* __loadUser() {
  yield takeEvery(REQUEST(LOAD_USER), function* ({ payload }) {
    AsyncStorage.getItem('accessToken').then(val => {
      if (val) {
        Reflect.set(payload, 'accessToken', val);
      }
    });

    try {
      const query = gql`
        ${__GQL_CUSTOMER_INFO}
      `;
      const token = payload?.accessToken ?? '';

      const response = yield call(client.query, {
        query,
        fetchPolicy: 'no-cache',
        variables: {
          accessToken: token,
        },
      });

      const newPayload = {
        info: {},
        address: {
          list: [],
          default: {},
        },
      };

      if (findKey(response, ['data', 'customer'])) {
        const data = findKey(response, ['data', 'customer']) ?? {};
        Object.entries(data).map(([key, value]) => {
          if (value && (typeof value === 'string' || typeof value === 'boolean')) {
            Reflect.set(newPayload.info, key, value);
          } else {
            switch (key) {
              case 'defaultAddress':
                Reflect.set(newPayload.address, 'default', value);
                break;
              case 'addresses':
                Reflect.set(newPayload.address, 'list', value?.nodes);
                break;
              default:
                break;
            }
          }
        });

        const cartPayload = {
          token,
          id: null,
        };
        AsyncStorage.getItem('cart').then(cartId => {
          if (cartId) {
            Reflect.set(cartPayload, 'id', cartId);
          }
        });

        yield all([
          put({
            type: SUCCESS(LOAD_USER),
            payload: newPayload,
          }),
          put({
            type: REQUEST(GENERATE_CART_ID),
            payload: cartPayload,
          }),
        ]);
      } else {
        yield all([
          put({
            type: FAILURE(LOAD_USER),
          }),
          put({
            type: REQUEST(SET_AUTH),
            payload: {
              isLogin: false,
              isAuthenticated: false,
            },
          }),
        ]);
      }

      yield all([
        put({
          type: SUCCESS(LOAD_USER),
          payload: {},
        }),
      ]);
    } catch (err) {
      yield all([
        put({
          type: FAILURE(LOAD_USER),
        }),
      ]);
    }
  });
}

export function* __updateAccount() {
  yield takeEvery(
    REQUEST(EDIT_ACCOUNT),
    /**
     *
     * @param {object} payload
     * @param {string} payload.accessToken
     * @param {object} payload.customer
     * @param {string} payload.customer.firstName
     * @param {string} payload.customer.lastName
     * @param {string} payload.customer.phone
     * @param {string} payload.customer.email
     * @returns {Generator<*, void, *>}
     */
    function* ({ payload }) {
      try {
        const mutation = gql`
          ${__GQL_EDIT_DETAIL_ACCOUNT}
        `;
        const response = yield call(client.mutate, {
          mutation,
          variables: {
            customer: payload?.customer,
            customerAccessToken: payload?.accessToken,
          },
        });

        if (findKey(response, ['data', 'customerUpdate', 'customer'])) {
          yield all([
            put({
              type: SUCCESS(EDIT_ACCOUNT),
              payload: {
                info: findKey(response, ['data', 'customerUpdate', 'customer']),
              },
            }),
          ]);
          Toast.show({
            type: 'success',
            text1: 'Save data success',
            visibilityTime: 3000,
          });
        } else {
          yield all([
            put({
              type: FAILURE(EDIT_ACCOUNT),
            }),
          ]);
        }
      } catch (err) {
        yield all([
          put({
            type: FAILURE(EDIT_ACCOUNT),
          }),
        ]);
      }
    }
  );
}

export default function* rootSaga() {
  yield all([fork(__loadUser), fork(__updateAccount)]);
}

import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { gql } from '@apollo/client';
import {
  CART_LINE_ITEM_ADD,
  DELETE_CART_LIST_OF_ITEM,
  GENERATE_CART_ID,
  GET_CART_LIST,
  PUT_CART_QTY_ITEM,
  PUT_CART_TOTAL_QTY,
} from '../constants';
import { REQUEST, SUCCESS, FAILURE } from '../actions/action.type';
import { client } from '../../../index';
import { __GQL_CART_INITIAL } from '../../service/graphql/mutation/cart/index.gql';
import { findKey } from '../../utils/helper';
import { ADD_TO_CART } from '../../graphql/mutation';
import {Toast} from "react-native-toast-message/lib/src/Toast";

export function* __cartGenerateId() {
  yield takeEvery(REQUEST(GENERATE_CART_ID), function*({ payload }) {
    try {
      const cart = yield call(AsyncStorage.getItem,'cart')
      if(cart){
        yield all([
            put({
              type: SUCCESS(GENERATE_CART_ID),
              payload: {
                ...payload,
                id:cart
              },
            }),
          ]);
      }else{
          const mutation = gql`mutation cartCreate($input: CartInput!, $country: CountryCode = ZZ, $language: LanguageCode)
          @inContext(country: $country, language: $language) {
            cartCreate(input: $input) {
              cart {
                id
                note
                totalQuantity
                __typename
                lines(first: 10) {
                  edges {
                    node {
                      __typename
                      cost {
                        amountPerQuantity {
                          amount
                          currencyCode
                        }
                        compareAtAmountPerQuantity {
                          amount
                          currencyCode
                        }
                        totalAmount {
                          amount
                          currencyCode
                        }
                      }
                    }
                  }
                }
                attributes {
                  key
                  value
                  __typename
                }
                cost {
                  totalAmount {
                    amount
                  }
                }
              }
              userErrors {
                field
                message
              }
            }
          }`;
          const response = yield call(client.mutate, {
            mutation,
            variables: {
              input: {
                buyerIdentity: {
                  customerAccessToken: payload.token,
                },
                note: '',
              },
            }
          })

        if(findKey(response,['data','cartCreate','cart','id'])){
          yield call(AsyncStorage.setItem,'cart',findKey(response,['data','cartCreate','cart','id']))
          yield all([
              put({
                type:SUCCESS(GENERATE_CART_ID),
                payload: {
                  id:findKey(response,['data','cartCreate','cart','id'])
                }
              })
          ])
        }else{
          Toast.show({
            type: 'error',
            text1: 'Oops!',
            text2: 'Error: failed generate cartId',
          });
          yield all([
            put({
              type:FAILURE(GENERATE_CART_ID)
            })
          ])
        }
      }
    } catch (err) {
      console.log({err},'@@redux/CART/GENERATEID')
      yield put({
        type: FAILURE(GENERATE_CART_ID),
        payload: err?.message ?? 'Some Error',
      });
    }
  });
}
export function* __putCartQty() {
  yield takeEvery(
    REQUEST(PUT_CART_TOTAL_QTY),
    /**
     *
     * @param {object} payload
     * @param {number | string} payload.totalQuantity
     * @returns {Generator<*, void, *>}
     */
    function* ({ payload }) {
      try {
        yield all([
          put({
            type: SUCCESS(PUT_CART_TOTAL_QTY),
            payload,
          }),
        ]);
      } catch (err) {
        yield put({
          type: FAILURE(PUT_CART_TOTAL_QTY),
          payload: err?.message ?? 'Some Error',
        });
      }
    }
  );
}

export function* __putCartQtyItem() {
  yield takeEvery(
    REQUEST(PUT_CART_QTY_ITEM),
    /**
     * @param {object} payload
     * @param {object} payload.variables
     * @param {number | string} payload.variables.cartId
     * @param {object} payload.variables.cartId
     * @param {CartLineInput} payload.variables.lines
     * @returns {Generator<*, void, *>}
     */
    function* ({ payload }) {
      try {
        const query = gql`
          mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
            cartLinesUpdate(cartId: $cartId, lines: $lines) {
              cart {
                id
                totalQuantity
              }
              userErrors {
                field
                message
              }
            }
          }
        `;
        const newPayload = {
          cart: {},
          error: [],
        };
        const response = yield call(client.mutate, {
          mutation: query,
          variables: {
            cartId: payload?.variables?.cartId ?? null,
            lines: payload?.variables?.lines ?? [],
          },
        });

        Reflect.set(
          newPayload,
          'cart',
          Array.isArray(payload?.variables?.lines) && payload?.variables?.lines.length > 0
            ? payload?.variables?.lines[0]
            : {}
        );
        Reflect.set(newPayload, 'error', response?.data?.cartLinesUpdate?.userErrors ?? []);

        const totalQuantity = newPayload?.cart?.totalQuantity ?? 0;

        if (Array.isArray(newPayload?.error) && newPayload?.error.length === 0) {
          yield all([
            put({
              type: SUCCESS(PUT_CART_QTY_ITEM),
              payload: {
                ...newPayload?.cart,
              },
            }),
            put({
              type: REQUEST(PUT_CART_TOTAL_QTY),
              payload: {
                totalQuantity,
              },
            }),
          ]);
        } else {
          yield all([
            put({
              type: FAILURE(PUT_CART_QTY_ITEM),
              payload,
            }),
          ]);
        }
      } catch (err) {
        yield all([
          put({
            type: FAILURE(PUT_CART_QTY_ITEM),
            payload,
          }),
        ]);
      }
    }
  );
}

export function* __getCartList() {
  yield takeEvery(REQUEST(GET_CART_LIST), function* ({ payload }) {
    try {
      const query = gql`
        query getCart($id: ID!) {
          cart(id: $id) {
            id
            totalQuantity
            lines(first: 10) {
              nodes {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    product {
                      id
                      title
                    }
                    id
                    image {
                      url
                    }
                  }
                }
                attributes {
                  key
                  value
                }

                cost {
                  compareAtAmountPerQuantity {
                    currencyCode
                    amount
                  }
                  totalAmount {
                    amount
                    currencyCode
                  }
                  subtotalAmount {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      `;

      const response = yield call(client.query, {
        query,
        fetchPolicy: 'no-cache',
        variables: {
          id: payload?.id,
        },
      });

      const newPayload = {
        data: [],
      };

      if (typeof response?.data !== 'undefined' && typeof response?.data?.cart !== 'undefined') {
        if (Array.isArray(response?.data?.cart?.lines?.nodes) && response?.data?.cart?.lines?.nodes.length > 0) {
          Reflect.set(newPayload, 'data', response?.data?.cart?.lines?.nodes ?? []);
        }
      }

      yield all([
        put({
          type: SUCCESS(GET_CART_LIST),
          payload: newPayload,
        }),
        put({
          type: REQUEST(PUT_CART_TOTAL_QTY),
          payload: {
            totalQuantity: response?.data?.cart?.totalQuantity ?? 0,
          },
        }),
      ]);
    } catch (err) {
      yield all([
        put({
          type: FAILURE(GET_CART_LIST),
        }),
      ]);
    }
  });
}

export function* __DeleteListOfItemCart() {
  yield takeEvery(
    REQUEST(DELETE_CART_LIST_OF_ITEM),
    /**
     * @param {object} payload
     * @param {object} payload.cartId
     * @param {String[] | string} payload.lineIds
     * @returns {Generator<*, void, *>}
     */
    function* ({ payload }) {
      try {
        const query = gql`
          mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
            cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
              cart {
                id
                totalQuantity
              }
              userErrors {
                field
                message
              }
            }
          }
        `;
        const { data } = yield call(client.mutate, {
          mutation: query,
          variables: {
            cartId: payload?.cartId,
            lineIds: payload?.lineIds ?? [],
          },
        });

        if (findKey(data, ['cartLinesRemove', 'cart'])) {
          yield all([
            put({
              type: SUCCESS(DELETE_CART_LIST_OF_ITEM),
              payload: findKey(data, ['cartLinesRemove', 'cart']),
            }),
          ]);
        } else {
        }
      } catch (err) {
        yield all([
          put({
            type: FAILURE(DELETE_CART_LIST_OF_ITEM),
            payload: {},
          }),
        ]);
      }
    }
  );
}

export function* cartLineItemAdd() {
  yield takeEvery(REQUEST(CART_LINE_ITEM_ADD), function* ({ payload }) {
    try {
      const mutation = gql`
        ${ADD_TO_CART}
      `;

      const response = yield call(client.mutate, {
        mutation,
        variables: {
          payload,
        },
      });
      if (response) {
        yield put({ type: SUCCESS(CART_LINE_ITEM_ADD) });
      }
    } catch (error) {
      yield put({ type: FAILURE(CART_LINE_ITEM_ADD), message: error?.message });
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(__getCartList),
    fork(__cartGenerateId),
    fork(__putCartQtyItem),
    fork(__DeleteListOfItemCart),
    fork(__putCartQty),
    fork(cartLineItemAdd),
  ]);
}

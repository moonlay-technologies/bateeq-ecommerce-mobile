import { gql } from '@apollo/client';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { CREATE_CHECKOUT_MUTATION } from '../../graphql/mutation';
import { client } from '../../..';
import { FAILURE, REQUEST, SUCCESS } from '../actions/action.type';
import {CREATE_CHECKOUT, GET_CHECKOUT_ID, PREVIEW_CHECKOUT_SHOW} from '../constants/checkout';
import { NAVIGATE_TO } from '../constants/navigation';
import {DELETE_CART_LIST_OF_ITEM} from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function* createCheckout() {
  yield takeEvery(REQUEST(CREATE_CHECKOUT), function* ({ payload }) {
    try {
      const query = gql`
        ${CREATE_CHECKOUT_MUTATION}
      `;
      const response = yield call(client.mutate, {
        mutation: query,
        variables: {
          ...payload?.variables
        },
      });

      if (response?.data?.checkoutCreate?.checkout) {
        const { id, webUrl } = response.data.checkoutCreate.checkout;
        
        AsyncStorage.setItem("checkoutId",id)
        
        const newPayload = { id, webUrl };
        yield all([
          put({
            type: SUCCESS(CREATE_CHECKOUT), payload: newPayload
          }),
          put({
            type:REQUEST(PREVIEW_CHECKOUT_SHOW),
            payload: {
              cartId: payload?.cartId,
              checkoutId:id
            }
          })
        ])
        // yield put({ type: SUCCESS(CREATE_CHECKOUT), payload: newPayload });
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

export function* _getCheckoutId(){
  yield takeEvery(GET_CHECKOUT_ID, function*({payload}){
    try{
      const checkoutId = yield call(AsyncStorage.getItem,'checkoutId')
      if(checkoutId || payload?.checkoutId){
        yield all([
          put({
            type:REQUEST(PREVIEW_CHECKOUT_SHOW),
            payload: {
              checkoutId: checkoutId ?? payload?.checkoutId
            }
          })
        ])
      }
    }catch(err){
    
    }
  })
}

export function* _PreviewCheckoutShow(){
  yield takeEvery(REQUEST(PREVIEW_CHECKOUT_SHOW), function*({payload}){
    try{
      
      const  query = gql`query Checkout($checkoutID: ID!){
        node(id:$checkoutID){
          ... on Checkout{
            id
            webUrl
            email
            taxExempt
            buyerIdentity{
              countryCode
            
            }
            totalPrice{
              amount
              currencyCode
            }
            availableShippingRates{
              shippingRates{
                price{
                  amount
                  currencyCode
                }
                handle
                title
              }
              ready
            }
            paymentDue{
              amount
              currencyCode
            }
            subtotalPrice{
              amount
            }
            totalDuties{
              amount
            }
            order{
              id
            }
            lineItems(first:100){
              nodes {
                title
                quantity
                variant {
                  id
                  title
                  weight
                  weightUnit
                  sku
                  image{
                    url
                  }
                  price{
                    amount
                    currencyCode
                  }
                }
              }
            }
            createdAt
            completedAt
            subtotalPrice{
              amount
              currencyCode
            }
            customAttributes{
              value
              key
            }
            availableShippingRates{
              ... on AvailableShippingRates{
                shippingRates{
                  ... on ShippingRate{
                    
                    price{
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
            paymentDue{
              amount
              currencyCode
            }
            note
            ready
            requiresShipping
            taxExempt
            totalTax{
              amount
              currencyCode
            }
            shippingAddress{
              id
              firstName
              lastName
              phone
              address1
              address2
              formattedArea
              city
              company
              province
              zip
              provinceCode
              countryCodeV2
            }
          }
        }
      }`
      
      let {data,loading} = yield call(client.query, {
        query,
        variables: {
          checkoutID: payload?.checkoutId
        },
        refetchQueries: [{ query, variables: { fetchPolicy: 'no-cache', id: payload.cartId, limit: 10 } }]
      })
      let newData = {}
      
      newData = data?.node ?? null
      newData.product = data?.node?.lineItems?.nodes ?? []

      if(newData?.order !== null){
        yield all([
          put({
            type: SUCCESS(PREVIEW_CHECKOUT_SHOW),
            payload: newData ?? null
          }),
          put({
            type:REQUEST(DELETE_CART_LIST_OF_ITEM),
            payload: {
              cartId: payload?.cartId,
              lineIds: newData?.lineItems?.nodes ? newData?.lineItems?.nodes?.map((item)=> item?.variant?.id) : []
            }
          })
        ])
      }else{
        yield all([
          put({
            type: SUCCESS(PREVIEW_CHECKOUT_SHOW),
            payload: newData ?? null
          })
        ])
      }
    }catch(err){
      yield all([
        put({
          type: FAILURE(PREVIEW_CHECKOUT_SHOW)
        })
      ])
    }
  })
}

export default function* rootSaga() {
  yield all([
    fork(createCheckout),
    fork(_getCheckoutId),
    fork(_PreviewCheckoutShow),
  ]);
}

import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import {
    CART_LINE_ITEM_ADD,
    DELETE_CART_LIST_OF_ITEM,
    GENERATE_CART_ID,
    GET_CART_LIST,
    PUT_CART_QTY_ITEM,
    PUT_CART_TOTAL_QTY
} from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {REQUEST, SUCCESS,FAILURE} from "../actions/action.type";
import {client} from "../../../index";
import {gql} from "@apollo/client";
import {CART_PUT_QTY} from "../../service/graphql/mutation/cart/index.gql";
export function* __cartGenerateId(){
    yield takeEvery(REQUEST(GENERATE_CART_ID), function*({payload}){
        try{
            if(payload?.id){
                if(!AsyncStorage.getItem('cart')){
                    AsyncStorage.setItem('cart', payload?.id)
                }
            }
            yield all([
                put({
                    type: SUCCESS(GENERATE_CART_ID),
                    payload:payload?.id
                })
            ])
        }catch(err){
            yield put({
                type:FAILURE(GENERATE_CART_ID),
                payload:err?.message ?? "Some Error"
            })
        }
    })
}
export function* __putCartQty(){
    yield takeEvery(REQUEST(PUT_CART_TOTAL_QTY),
        /**
         *
         * @param {object} payload
         * @param {number | string} payload.totalQuantity
         * @returns {Generator<*, void, *>}
         */
        function*({payload}){
        try{
            yield all([
                put({
                    type: SUCCESS(PUT_CART_TOTAL_QTY),
                    payload:payload
                })
            ])
        }catch(err){
            yield put({
                type:FAILURE(PUT_CART_TOTAL_QTY),
                payload:err?.message ?? "Some Error"
            })
        }
    })
}

export function* __putCartQtyItem(){
    yield takeEvery(REQUEST(PUT_CART_QTY_ITEM),
        /**
         * @param {object} payload
         * @param {object} payload.variables
         * @param {number | string} payload.variables.cartId
         * @param {object} payload.variables.cartId
         * @param {CartLineInput} payload.variables.lines
         * @returns {Generator<*, void, *>}
         */
        function*({payload}){

        try{
            const query = gql`mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
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
            }`
            let newPayload = {
                cart : {},
                error: []
            }
            let response = yield call(client.mutate, {
                mutation: query,
                variables: {
                    cartId: payload?.variables?.cartId ?? null,
                    lines: payload?.variables?.lines ?? []
                }
            })

            Reflect.set(newPayload,'cart', Array.isArray(payload?.variables?.lines) && payload?.variables?.lines.length > 0 ? payload?.variables?.lines[0] : {})
            Reflect.set(newPayload,'error',response?.data?.cartLinesUpdate?.userErrors ?? [])

            let totalQuantity = newPayload?.cart?.totalQuantity ?? 0

            if(Array.isArray(newPayload?.error) &&newPayload?.error.length === 0){
                yield all([
                    put({
                        type: SUCCESS(PUT_CART_QTY_ITEM),
                        payload: {
                            ...newPayload?.cart,
                        }
                    }),
                    put({
                        type: REQUEST(PUT_CART_TOTAL_QTY),
                        payload: {
                            totalQuantity: totalQuantity
                        }
                    })
                ])
            }else{
                yield all([
                    put({
                        type:FAILURE(PUT_CART_QTY_ITEM),
                        payload
                    })
                ])
            }

        }catch(err){
            yield all([
                put({
                    type:FAILURE(PUT_CART_QTY_ITEM),
                    payload
                })
            ])
        }
    })
}

export function* __getCartList(){
    yield takeEvery(REQUEST(GET_CART_LIST), function*({payload}){
        try{
            const query = gql`query getCart($id: ID!) {
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
            }`
            const response = yield call(client.query,{
                query:query,
                fetchPolicy: 'no-cache',
                variables: {
                    id:payload?.id,
                }
            })

            let newPayload = {
                data: []
            }
            if(typeof(response?.data) !== 'undefined' && typeof(response?.data?.cart) !== 'undefined'){
                if(Array.isArray(response?.data?.cart?.lines?.nodes) && response?.data?.cart?.lines?.nodes.length > 0){
                    Reflect.set(newPayload,'data',response?.data?.cart?.lines?.nodes ?? [])
                }
            }


            console.log({newPayload,response})

            yield all([
                put({
                    type:SUCCESS(GET_CART_LIST),
                    payload: newPayload
                }),
                put({
                    type: REQUEST(PUT_CART_TOTAL_QTY),
                    payload: {
                        totalQuantity:response?.data?.cart?.totalQuantity ?? 0
                    }
                })
            ])
        }catch(err){
            yield all([
                put({
                    type: FAILURE(GET_CART_LIST)
                })
            ])
        }
    })
}


export function* __DeleteListOfItemCart(){
    yield takeEvery(REQUEST(DELETE_CART_LIST_OF_ITEM),
        /**
         * @param {object} payload
         * @param {object} payload.cartId
         * @param {String[] | string} payload.lineIds
         * @returns {Generator<*, void, *>}
         */
        function*({payload}){
        try{
            const query = gql`mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
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
            }`
            const response = yield call(client.mutate, {
                mutation:query,
                variables: {
                    cartId:payload?.cartId,
                    lineIds: payload?.lineIds ?? []
                }
            })

            console.log({response})
        }catch(err){
            yield all([
                put({
                    type:FAILURE(DELETE_CART_LIST_OF_ITEM),
                    payload:{}
                })
            ])
        }
    })
}



export default function* rootSaga(){
    yield all([
        fork(__getCartList),
        fork(__cartGenerateId),
        fork(__putCartQtyItem),
        fork(__DeleteListOfItemCart),
        fork(__putCartQty),
    ])
}
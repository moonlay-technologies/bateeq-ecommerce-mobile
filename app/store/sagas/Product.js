import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import {FAILURE, REQUEST, SUCCESS} from "../actions/action.type";
import {
    GET_PROD_COLL_LATEST,
    GET_PROD_COLL_LATEST_SHOW,
    GET_PROD_COLL_OUR_CATEGORY,
    GET_PROD_COLL_SEARCH
} from "../constants/product";
import {gql} from "@apollo/client";
import {client} from "../../../index";
import {__GQL_GET_PRODUCT_LIST_BY_CATEGORY, __GQL_SHOW_LATEST_COLLECTION} from "../../graphql/queries";
import {findKey} from "../../utils/helper";


export function* __productSearch(){
    yield takeEvery(
        REQUEST(GET_PROD_COLL_SEARCH),
        function*({payload}){
        try{

            const gql1 = gql`query GetProducts($first: Int!, $query: String!) {
                products(first: $first, query: $query) {
                    nodes {
                        id
                        title

                        description
                        descriptionHtml
                        images(first: 4) {
                            nodes{
                                url
                            }
                        }
                        variants(first: 5) {
                            nodes {
                                id
                                weight
                                title
                                quantityAvailable
                                currentlyNotInStock
                                weightUnit
                                price {
                                    amount
                                    currencyCode
                                }
                                compareAtPrice {
                                    amount
                                    currencyCode
                                }
                                selectedOptions {
                                    name
                                    value
                                }
                            }
                        }
                        options(first: 2) {
                            values
                        }
                    }
                }
            }`

            let response = yield call(
                client.query,
                {
                    query:gql1,
                    variables: {
                        first:payload?.first ?? 10,
                        query:payload?.query
                    }
                });

            let newPayload = {}
            Reflect.set(newPayload,'data',response?.data?.products?.nodes ?? [])
            Reflect.set(newPayload,'query',payload?.query)

            yield all([
                put({
                    type:SUCCESS(GET_PROD_COLL_SEARCH),
                    payload: newPayload
                })
            ])

        }catch(err){
            yield put({
                type:FAILURE(GET_PROD_COLL_SEARCH)
            })
        }
    })
}

export function* __collectionOurCategory(){
    yield takeEvery(REQUEST(GET_PROD_COLL_OUR_CATEGORY),
        /**
         * @param {object} payload
         * @param {number} payload.first
         * @param {string} payload.query
         * @param {string | null} payload.after
         * @returns {Generator<*, void, *>}
         */
        function*({payload}){
        try{
            const query = gql`${__GQL_GET_PRODUCT_LIST_BY_CATEGORY}`
            const response = yield call(client.query,{
                query,
                variables: {
                    ...payload
                }
            })

            if(findKey(response,['data','products'])){
                yield all([
                    put({
                        type: SUCCESS(GET_PROD_COLL_OUR_CATEGORY),
                        payload: {
                            data: findKey(response,['data','products','nodes']),
                            pagination: findKey(response,['data','products','pageInfo'])
                        }
                    })
                ])
            }else{
                yield all([
                    put({
                        type: FAILURE(GET_PROD_COLL_OUR_CATEGORY)
                    })
                ])
            }
            console.log({response})
        }catch(err){
            yield all([
                put({
                    type: FAILURE(GET_PROD_COLL_OUR_CATEGORY)
                })
            ])
        }
    })
}

export function* __collectionLatest(){
    yield takeEvery(REQUEST(GET_PROD_COLL_LATEST),
        /**
         *
         * @param {object} payload
         * @param {number | 4} payload.first
         * @param {string | "" | null} payload.query
         * @param {string | "" | null} payload.after
         * @returns {Generator<*, void, *>}
         */
        function*({payload}){
        try{
            const query = gql`${__GQL_GET_PRODUCT_LIST_BY_CATEGORY}`
            const response  = yield call(client.query,{
                query,
                variables: {
                    ...payload
                }
            })

            if(findKey(response,['data','products'])){
                if(findKey(response,['data','products','nodes']) && Array.isArray(findKey(response,['data','products','nodes'])) && findKey(response,['data','products','nodes']).length > 0){
                    yield all([
                        put({
                            type:SUCCESS(GET_PROD_COLL_LATEST),
                            payload: {
                                data: findKey(response,['data','products','nodes']),
                                pagination: findKey(response,['data','products','pageInfo'])
                            }
                        })
                    ])
                }else{
                    yield all([
                        put({
                            type:FAILURE(GET_PROD_COLL_LATEST)
                        })
                    ])
                }
            }else{
                yield all([
                    put({
                        type:FAILURE(GET_PROD_COLL_LATEST)
                    })
                ])
            }

        }catch(err){
            yield all([
                put({
                    type:FAILURE(GET_PROD_COLL_LATEST)
                })
            ])
        }
    })
}
export function* __collectionLatestShow(){
    yield takeEvery(REQUEST(GET_PROD_COLL_LATEST_SHOW),
        /**
         * @param {object} payload
         * @param {string} payload.handle
         * @returns {Generator<*, void, *>}
         */
        function*({payload}){
        try{
            const query = gql`${__GQL_SHOW_LATEST_COLLECTION}`
            const response  = yield call(client.query,{
                query,
                variables: {
                    ...payload
                }
            })
            if(findKey(response,['data','collection'])){
                yield all([
                    put({
                        type:SUCCESS(GET_PROD_COLL_LATEST_SHOW),
                        payload: {
                            data:findKey(response,['data','collection'])
                        }
                    })
                ])
            }else{
                yield all([
                    put({
                        type:FAILURE(GET_PROD_COLL_LATEST_SHOW)
                    })
                ])
            }
        }catch(err){
            yield all([
                put({
                    type:FAILURE(GET_PROD_COLL_LATEST_SHOW)
                })
            ])
        }
    })
}

export default function* rootSaga(){
    yield all([
        fork(__productSearch),
        fork(__collectionOurCategory),
        fork(__collectionLatest),
        fork(__collectionLatestShow)
    ])
}
import { all , takeEvery, put, fork, call } from 'redux-saga/effects'
import {FAILURE, REQUEST, SUCCESS} from "../actions/action.type";
import {GET_SUMMARY_PAGES} from "../constants/pages";
import {gql} from "@apollo/client";
import {__GQL_GET_PAGES} from "../../graphql/queries";
import {client} from "../../../index";
import {findKey} from "../../utils/helper";


export function* __summaryPages(){
    yield takeEvery(REQUEST(GET_SUMMARY_PAGES),
        /**
         * @param {object} payload
         * @param {string} payload.handle
         * @returns {Generator<*, void, *>}
         */
        function*({payload}){
        try{
            const query = gql`${__GQL_GET_PAGES}`
            const response = yield call(client.query, {
                query,
                variables: {
                    ...payload
                }
            })
            if(findKey(response,['data','page'])){
                yield all([
                    put({
                        type:SUCCESS(GET_SUMMARY_PAGES),
                        payload: {
                            variables:payload ?? {},
                            data:findKey(response,['data','page'])
                        }
                    })
                ])
            }else{
                yield all([
                    put({
                        type:FAILURE(GET_SUMMARY_PAGES)
                    })
                ])
            }
        }catch(err){
            yield all([
                put({
                    type:FAILURE(GET_SUMMARY_PAGES)
                })
            ])
        }
    })
}
export default function* rootSaga(){
    yield all([
        fork(__summaryPages)
    ])
}
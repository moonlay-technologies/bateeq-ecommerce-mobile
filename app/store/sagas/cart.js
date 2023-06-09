import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import {
    BAD_CART_LINE_ITEM_ADD,
    BAD_GENERATE_CART_ID,
    BAD_GET_CART_LIST, BAD_PUT_CART_QTY_ITEM,
    BAD_PUT_CART_TOTAL_QTY,
    CART_LINE_ITEM_ADD,
    DELETE_CART_LIST_OF_ITEM,
    GENERATE_CART_ID,
    GET_CART_LIST,
    OK_CART_LINE_ITEM_ADD,
    OK_DELETE_CART_LIST_OF_ITEM,
    OK_GENERATE_CART_ID,
    OK_GET_CART_LIST,
    OK_PUT_CART_QTY_ITEM,
    OK_PUT_CART_TOTAL_QTY,
    PUT_CART_QTY_ITEM,
    PUT_CART_TOTAL_QTY
} from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {fetchApiGraphql} from "../api";
import {GQL_GET_CART_LIST} from "../../service/graphql/mutation/cart/index.gql";
export function* __cartGenerateId(){
    yield takeEvery(GENERATE_CART_ID, function*({payload}){
        try{
            if(payload?.id){
                AsyncStorage.setItem('cart', payload?.id)
            }
            yield all([
                put({
                    type: OK_GENERATE_CART_ID,
                    payload:payload?.id
                })
            ])
        }catch(err){
            yield put({
                type:BAD_GENERATE_CART_ID,
                payload:err?.message ?? "Some Error"
            })
        }
    })
}
export function* __putCartQty(){
    yield takeEvery(PUT_CART_TOTAL_QTY, function*({payload}){
        try{
            yield all([
                put({
                    type: OK_PUT_CART_TOTAL_QTY,
                    payload:payload
                })
            ])
        }catch(err){
            yield put({
                type:BAD_PUT_CART_TOTAL_QTY,
                payload:err?.message ?? "Some Error"
            })
        }
    })
}

// export function* __cartList(){
//     yield takeEvery(GET_CART_LIST, function*({payload}){
//         try{
//             const response = yield call(()=> {
//                 return new Promise((resolve)=> resolve(fetchApiGraphql,{query:GQL_GET_CART_LIST,variables:payload},'query'))
//             })
//
//             yield all([
//                 put({
//                     type:PUT_CART_TOTAL_QTY,
//                     payload:{
//                         totalQuantity:0
//                     }
//                 }),
//
//                 put({
//                     type:PUT_CART_TOTAL_QTY,
//                     payload:{
//                         totalQuantity:0
//                     }
//                 }),
//
//             ])
//             console.log({payload})
//             console.log({response})
//             // yield put({
//             //     type:OK_GET_CART_LIST,
//             //     // payload: response
//             // })
//         }catch(err){
//             yield all([
//                 put({
//                     type:BAD_GET_CART_LIST
//                 })
//             ])
//         }
//     })
// }

export default function* rootSaga(){
    yield all([
        fork(__cartGenerateId),
        fork(__putCartQty),
        // fork(__cartList),
    ])
}
import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import {FAILURE, REQUEST, SUCCESS} from "../actions/action.type";
import {LOAD_USER} from "../constants/user";
import {client,httpLink} from "../../../index";
import {ApolloClient, gql, InMemoryCache} from "@apollo/client";
import {__GQL_CUSTOMER_INFO} from "../../graphql/queries";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {SET_AUTH} from "../constants/Auth";
import {GENERATE_CART_ID} from "../constants";

export function* __loadUser(){
    yield takeEvery(REQUEST(LOAD_USER),function*({payload}){
        AsyncStorage.getItem('accessToken')
            .then(val => {
                if(val){
                    Reflect.set(payload,'accessToken',val)
                }
            })

        try{
            const query = gql`${__GQL_CUSTOMER_INFO}`
            let token = payload?.accessToken ?? ""
            const response = yield call(client.query, {
                query: query,
                fetchPolicy: 'no-cache',
                variables: {
                    accessToken:token
                }
            })
            let newPayload = {
                info:{},
                address:{
                    list:[],
                    default:{}
                }
            }

            if(response?.data?.customer){

                let data = response?.data?.customer ?? {}
                Object.entries(data).map(([key,value])=> {
                    if(value && (typeof(value) === 'string' || typeof(value) === 'boolean')){
                        Reflect.set(newPayload.info,key,value)
                    }else{
                        switch (key){
                            case "defaultAddress":
                                Reflect.set(newPayload.address,'default',value)
                                break;
                            case "addresses":
                                Reflect.set(newPayload.address,'list',value?.nodes)
                                break;
                            default:
                                break;
                        }
                    }
                })

                let cartPayload = {
                    token: token,
                    id:null
                }
                AsyncStorage.getItem('cart')
                    .then(cartId => {
                        if (cartId) {
                            Reflect.set(cartPayload,'id',cartId)
                        }
                    })


                yield all([
                    put({
                        type: SUCCESS(LOAD_USER),
                        payload: newPayload
                    }),
                    put({
                        type:REQUEST(GENERATE_CART_ID),
                        payload: cartPayload
                    })
                ])
            }else{
                yield all([
                    put({
                        type: FAILURE(LOAD_USER),
                    }),
                    put({
                        type: REQUEST(SET_AUTH),
                        payload: {
                            isLogin:false,
                            isAuthenticated: false
                        }
                    }),

                ])
            }
            console.log({response})
            yield all([
                put({
                    type: SUCCESS(LOAD_USER),
                    payload: {}
                })
            ])
        }catch(err){
            console.log({err})
            yield all([
                put({
                    type: FAILURE(LOAD_USER),
            //         payload: {}
                })
            ])
        }
    })
}
export default function* rootSaga() {
    yield all([
        fork(__loadUser)
    ])
}
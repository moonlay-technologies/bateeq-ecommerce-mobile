import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import {FAILURE, REQUEST, SUCCESS} from "../actions/action.type";
import {AUTH_SIGN_IN, SET_AUTH} from "../constants/Auth";
import {client} from "../../../index";
import {gql} from "@apollo/client";
import {findKey} from "../../utils/helper";
import {LOAD_USER} from "../constants/user";
import {Toast} from "react-native-toast-message/lib/src/Toast";
import {CartGenerateId} from "../actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function* __authUser(){
    yield takeEvery(REQUEST(AUTH_SIGN_IN), function*({payload}){
        try{
            const mutation = gql`mutation CustomerAccessTokenCreate($email: String!, $password: String!) {
                customerAccessTokenCreate(input: { email: $email, password: $password }) {
                    customerAccessToken {
                        accessToken
                    }
                    customerUserErrors {
                        message
                    }
                }
            }`
            const response = yield call(client.mutate, {
                mutation,
                variables:{
                    ...payload
                }
            })
            if(findKey(response,['data','customerAccessTokenCreate','customerAccessToken','accessToken'])){
                let item = findKey(response,['data','customerAccessTokenCreate','customerAccessToken'])

                AsyncStorage.setItem('accessToken', findKey(item,['accessToken']));

                yield all([
                    put({
                        type:REQUEST(LOAD_USER),
                        payload: {
                            accessToken: findKey(item,['accessToken']),
                        }
                    }),
                    put(CartGenerateId({
                        token: findKey(item,['accessToken']),
                    })),
                    put({
                        type: REQUEST(SET_AUTH),
                        payload: {
                            isLogin: true,
                            isAuthenticated: true,
                        },
                    }),
                    put({
                        type:SUCCESS(AUTH_SIGN_IN),
                        payload: {
                            token:findKey(item,['accessToken'])
                        }
                    })
                ])
                Toast.show({
                    type: 'success',
                    text1: 'Login Success',
                    visibilityTime: 2000,
                });
            }else{
                yield all([
                    put({
                        type:FAILURE(AUTH_SIGN_IN),
                    }),
                    put({
                        type: REQUEST(SET_AUTH),
                        payload: {
                            isLogin: false,
                            isAuthenticated: false,
                        },
                    })
                ])
                Toast.show({
                    type: 'error',
                    text1: 'Incorrect email or password',
                    visibilityTime: 3000,
                });
            }

        }catch(err){
            yield all([
                put({
                    type: REQUEST(SET_AUTH),
                    payload: {
                        isLogin: false,
                        isAuthenticated: false,
                    },
                }),
                put({
                    type: FAILURE(AUTH_SIGN_IN),
                })
            ])
            Toast.show({
                type: 'error',
                text1: err?.message ?? 'Incorrect email or password',
                visibilityTime: 3000,
            });
        }
    })
}

export default function* rootSaga() {
    yield all([
        fork(__authUser)
    ])
}
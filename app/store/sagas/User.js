import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import {FAILURE, REQUEST, SUCCESS} from "../actions/action.type";
import {LOAD_USER} from "../constants/user";
import {client,httpLink} from "../../../index";
import {ApolloClient, gql, InMemoryCache} from "@apollo/client";
import {__GQL_CUSTOMER_INFO} from "../../graphql/queries";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {SET_AUTH} from "../constants/Auth";

export function* __loadUser(){
    yield takeEvery(REQUEST(LOAD_USER),function*({payload}){
        AsyncStorage.getItem('accessToken')
            .then(val => {
                if(val){
                    Reflect.set(payload,'accessToken',val)
                }
            })

        try{
            const query = gql`query getCustomer($accessToken: String!) {
                customer(customerAccessToken: $accessToken) {
                    id
                    firstName
                    lastName
                    acceptsMarketing
                    email
                    phone
                    defaultAddress {
                        address1
                        address2
                        company
                        phone
                        firstName
                        lastName
                        name
                        city
                        province
                        country
                        zip
                    }
                    addresses(first: 10) {
                        nodes {
                            id
                            address1
                            address2
                            city
                            province
                            country
                            zip
                        }
                    }
                }
            }`
            let token = payload?.accessToken ?? ""
            const response = yield call(client.query, {
                query: query,
                fetchPolicy: 'no-cache',
                variables: {
                    accessToken:token
                }
            })

            if(response?.data?.customer){
                yield all([
                    put({
                        type: SUCCESS(LOAD_USER),
                        payload: response?.data?.customer
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
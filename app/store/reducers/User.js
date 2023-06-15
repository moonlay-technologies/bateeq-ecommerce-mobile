import {FAILURE, REQUEST, SUCCESS} from "../actions/action.type";
import {EDIT_ACCOUNT, LOAD_USER, USER_SET_TOKEN} from "../constants/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
    loading: true,
    options:{
        loading: true,
        token:null,
        info: {
            id: null,
            email: null,
            first_name: null,
            last_name: null,
            phone: null,
        },
    },
    collections: {
        address: {
            used: {
                loading: true,
                data: null,
            },
            list:{
                loading:true,
                params: {},
                data: []
            }
        }
    }
}
AsyncStorage.getItem('accessToken')
    .then(val => {
        if(val){
            Reflect.set(initialState.options,'token',val)
        }

    })

/**
 *
 * @param {object} state
 * @param {object} action
 * @param {string} action.type
 * @param {object | string | null | Array} action.payload
 */
export default function(state = initialState, action){
    let { type, payload }= action

    switch (type){
        case REQUEST(USER_SET_TOKEN):
            return {
                ...state,
                options: {
                    ...state.options,
                    token: payload
                }
            }
        case REQUEST(LOAD_USER):
            return {
                ...state,
                loading: true,
                options: {
                    ...state.options,
                    loading: true,
                }
            }
        case SUCCESS(LOAD_USER):
            AsyncStorage.getItem('accessToken')
                .then(token => {
                    if (token) {
                        state.options.token = token
                    }
                })
            return {
                ...state,
                loading: false,
                options: {
                    ...state.options,
                    loading: false,
                    info: payload?.info ?? {
                        ...state.options.info
                    },
                },
                collections:{
                    address: {
                        used:{
                            loading:false,
                            data: {
                                ...state.collections.address.used.data,
                                ...payload?.address?.default
                            }
                        },
                        list: {
                            loading:false,
                            data: payload?.address?.list ?? state.collections.address.list.data ?? []
                        }
                    }
                }
            }
        case FAILURE(LOAD_USER):
            return {
                ...state,
                loading:false,
                options: {
                    ...state.options,
                    loading: false,
                }
            }


        case REQUEST('ADD_NEW_ADDRESS'):
            if(payload?.data){
                state.collections.address.list.data.push({...payload?.data})
            }
            return {
                ...state,
                collections:{
                    address: {
                        list: {
                            loading:false,
                            data: [...state.collections.address.list.data]
                        }
                    }
                }
            }
        case REQUEST(EDIT_ACCOUNT):
            return  {
                ...state,
                options:{
                    ...state.options,
                    loading: true
                },
            }
        case SUCCESS(EDIT_ACCOUNT):
            return  {
                ...state,
                options:{
                    ...state.options,
                    loading: false,
                    info: {
                        ...state.options.info,
                        ...payload?.info,
                        first_name: payload?.info?.firstName ?? payload?.info?.first_name ?? state.options.info.first_name ?? null,
                        last_name: payload?.info?.lastName ?? state.options.info.last_name ?? null
                    }
                },
            }
        case FAILURE(EDIT_ACCOUNT):
            return {
                ...state,
                options: {
                    ...state.options,
                    loading: false
                }
            }
        default:
            return state;
    }
}
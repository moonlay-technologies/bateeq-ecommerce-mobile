import {FAILURE, REQUEST, SUCCESS} from "../actions/action.type";
import {LOAD_USER, USER_SET_TOKEN} from "../constants/user";
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

    console.log({type,payload})
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
                    info: payload?.options?.info ?? {
                        ...state.options.info
                    },

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
        default:
            return state;
    }
}
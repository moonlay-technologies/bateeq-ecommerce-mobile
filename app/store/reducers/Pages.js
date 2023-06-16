import {FAILURE, REQUEST, SUCCESS} from "../actions/action.type";
import {GET_SUMMARY_PAGES} from "../constants/pages";

const initialState = {
    show: {
        loading: true,
        variables: {
            handle: null
        },
        data:null
    },
    collections: {
        summary: {
            loading:true,
            variables: {

            },
            data: null
        }
    }
}

/**
 * @state Pages
 * @param state
 * @param {object} action
 * @param {string} action.type
 * @param {object | Array | string | string[] | null, number} action.payload
 */
export default function (state = initialState, action){
    let { type, payload } = action
    switch (type){
        case REQUEST(GET_SUMMARY_PAGES):
            return {
                ...state,
                collections: {
                    ...state.collections,
                    summary: {
                        ...state.collections.summary,
                        loading: true,
                        data: null
                    }
                }
            }
        case SUCCESS(GET_SUMMARY_PAGES):
            return {
                ...state,
                collections: {
                    ...state.collections,
                    summary: {
                        ...state.collections.summary,
                        loading: false,
                        variables: {
                            ...payload?.variables
                        },
                        data: payload?.data ?? null
                    }
                }
            }
        case FAILURE(GET_SUMMARY_PAGES):
            return {
                ...state,
                collections: {
                    ...state.collections,
                    summary: {
                        ...state.collections.summary,
                        loading: false,
                        data: null
                    }
                }
            }
        default:
            return state;
    }
}
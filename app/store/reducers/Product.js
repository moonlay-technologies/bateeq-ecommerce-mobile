import {FAILURE, REQUEST, SUCCESS} from "../actions/action.type";
import {GET_PROD_COLL_SEARCH} from "../constants/product";

const initialState = {
    show: {
        loading: true,
        data: null
    },
    collections: {
        search: {
            loading: false,
            query: '',
            data: []
        },
        ourCategory : {
            loading: true,
            data: []
        }
    }
}

export default function (state = initialState, action){
    let { type , payload } = action
    switch (type){
        case REQUEST(GET_PROD_COLL_SEARCH):
            return {
                ...state,
                collections: {
                    ...state.collections,
                    search : {
                        ...state.collections.search,
                        query: action?.payload?.query ?? "",
                        loading: true,
                        data: []
                    }
                }
            }
        case SUCCESS(GET_PROD_COLL_SEARCH):
            return {
                ...state,
                collections:  {
                    ...state.collections,
                    search: {
                        ...state.collections.search,
                        loading: false,
                        query: payload?.query ?? "",
                        data: [...payload?.data]
                    }
                }
            }
        case FAILURE(GET_PROD_COLL_SEARCH):
            return {
                ...state,
                collections: {
                    ...state.collections,
                    search: {
                        ...state.collections.search,
                        loading: false,
                        query: payload?.query ?? state.collections.search.query ?? "",
                        data: []
                    }
                }
            }
        default:
            return state;
    }
}
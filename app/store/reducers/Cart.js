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


/**
 *
 * @type {{collections: {product: {data: null, loading: boolean}, shipping: {data: null, loading: boolean}}, lists: {data: *[], loading: boolean}, options: {__typename: string, cartId: null, attributes: customAttributes[]}}}
 */
const initialState = {
    options: {
        __typename: 'cart',
        loading:true,
        cartId: null,
        totalQuantity: 0,
        attributes: [],
    },
    lists: {
        loading:true,
        data:[]
    },
    collections : {
        shipping: {
            loading:false,
            data: null
        },
        product: {
            loading:false,
            data: null
        }
    },
}

AsyncStorage.getItem('cart')
    .then(cartId => {
        if (cartId) {
            Reflect.set(initialState.options,'cartId',cartId)
        }
    })


export default function(state = initialState, action){
    let { type } = action
    switch (type){
        case GENERATE_CART_ID:
            return {
                ...state,
                options: {
                    ...state.options,
                    loading: true,
                }

            }
        case OK_GENERATE_CART_ID:
            return {
                ...state,
                options : {
                    ...state.options,
                    // loading: true,
                    cartId: action?.payload
                }
            }
        case BAD_GENERATE_CART_ID:
            return {
                ...state,
                options: {
                    ...state.options,
                    loading:false,
                    cartId:null
                }
            }

        case OK_DELETE_CART_LIST_OF_ITEM:
            if(action?.payload?.id){
                state.lists.data = [...state.lists.data.filter((item)=> item?.id !== action?.payload?.id)]
            }
            return {
                ...state,
                options: {
                    ...state.options,
                    totalQuantity: action?.payload?.totalQuantity ?? state.options?.totalQuantity ?? 0
                },
                lists: {
                    ...state.lists,
                    data: [ ...state.lists.data ]
                }
            }

        case GET_CART_LIST:
            return {
                ...state,
                lists: {
                    ...state.lists,
                    loading: true,
                    data: []
                }
            }
        case OK_GET_CART_LIST:
            return {
                ...state,
                options: {
                    ...state.options,
                    totalQuantity: action?.payload?.totalQuantity ?? state.options?.totalQuantity ?? 0
                },
                lists: {
                    ...state.lists,
                    loading:false,
                    data: [...action?.payload?.data]
                }
            }
        case BAD_GET_CART_LIST:
            return {
                ...state,
                lists: {
                    ...state.lists,
                    loading: false,
                    data: []
                }
            }

        case CART_LINE_ITEM_ADD:
            return {
                ...state,
                options: {
                    ...state.options,
                    loading: true,
                }
            }
        case OK_CART_LINE_ITEM_ADD:
            return {
                ...state,
                options: {
                    ...state.options,
                    loading:false,
                    totalQuantity: action?.payload?.totalQuantity ?? state.options?.totalQuantity ?? 0
                },
            }
        case BAD_CART_LINE_ITEM_ADD:
            return {
                ...state,
                options: {
                    ...state.options,
                    loading:false
                }
            }

        case PUT_CART_TOTAL_QTY:
            return {
                ...state,
                options: {
                    ...state.options,
                    loading:true
                }
            }
        case OK_PUT_CART_TOTAL_QTY:
            return {
                ...state,
                options: {
                    ...state.options,
                    loading:false,
                    totalQuantity: action?.payload?.totalQuantity ?? state?.options?.totalQuantity ?? 0
                }
            }
        case BAD_PUT_CART_TOTAL_QTY:
            return {
                ...state,
                options: {
                    ...state.options,
                    loading:false,
                }
            }
        case PUT_CART_QTY_ITEM:
            return {
                ...state,
                options: {
                    ...state.options,
                    loading: true,
                }
            }
        case OK_PUT_CART_QTY_ITEM:
            if(action?.payload?.merchandiseId && action?.payload?.id && action?.payload?.quantity){
                let { quantity, merchandiseId, id } = action?.payload
                let indexed = state.lists.data.findIndex((child)=> child?.id === id)
                if(indexed>=0){
                    state.lists.data[indexed].quantity = quantity ?? state.lists.data[indexed].quantity ?? 0
                }
            }
            return {
                ...state,
                options: {
                    ...state.options,
                    loading:false,
                    totalQuantity: action?.payload?.totalQuantity ?? state.options?.totalQuantity ?? 0
                },
                lists: {
                    ...state.lists,
                    data: [ ...state.lists.data ]
                }
            }
        case BAD_PUT_CART_QTY_ITEM:
            return {
                ...state,
                options: {
                    ...state.options,
                    loading:false
                }
            }
        default:
            return state
    }
}
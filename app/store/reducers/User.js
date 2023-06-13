import {FAILURE, REQUEST, SUCCESS} from "../actions/action.type";
import {USER_SET_TOKEN} from "../constants/user";

const initialState = {
    token: null,
    userAddress: null,
    customerInfo: {
        id: null,
        email: null,
        first_name: null,
        last_name: null,
        phone: null,
    },
    defaultAddress: null,
}

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
                token: payload
            }
        default:
            return state;
    }
}
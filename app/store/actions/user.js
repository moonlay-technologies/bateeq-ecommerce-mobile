import {REQUEST} from "./action.type";
import {LOAD_USER, USER_SET_ADDRESS, USER_SET_DEFAULT_ADDRESS, USER_SET_INFO, USER_SET_TOKEN} from "../constants/user";


/**
 *
 * @param payload
 */
export const loadUser = (payload)=> {

}

export const setToken = (payload)=> {
    return {
        type:REQUEST(USER_SET_TOKEN),
        payload
    }
}

/**
 *
 * @param payload
 * @returns {{type: string}}
 */
export const setAddress = (payload)=> {
    return {
        type:USER_SET_ADDRESS,
        payload
    }
}
/**
 *
 * @param payload
 * @returns {{type: string}}
 */
export const setDefaultAddress = (payload)=> {
    return {
        type:USER_SET_DEFAULT_ADDRESS,
        payload
    }
}
/**
 *
 * @param payload
 * @returns {{type: string}}
 */
export const setCustomerInfo = (payload)=> {
    return {
        type:USER_SET_INFO,
        payload
    }
}


/**
 *
 * @param {object} payload
 * @returns {{payload, type: string}}
 * @constructor
 */
export const LoadUsers = (payload)=> {
    return {
        type: REQUEST(LOAD_USER),
        payload
    }
}
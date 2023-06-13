import {REQUEST} from "./action.type";
import {USER_SET_ADDRESS, USER_SET_DEFAULT_ADDRESS, USER_SET_INFO, USER_SET_TOKEN} from "../constants/user";

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
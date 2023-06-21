import {AUTH_SIGN_IN} from "../constants/Auth";
import {REQUEST} from "./action.type";

/**
 *
 * @param {payload} payload
 * @param {string} payload.email
 * @param {string} payload.password
 * @returns {{type}}
 */
export function AuthUser(payload){
    return {
        type:REQUEST(AUTH_SIGN_IN),
        payload
    }
}
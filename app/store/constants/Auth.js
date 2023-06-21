import {useMutation} from "@apollo/client";
import {Authentication} from "../../service/graphql/mutation/authentication";
export const SET_AUTH = 'AUTH/CONFIGURATION'

export const AUTH_SIGN_IN = 'AUTH/SIGN-IN'

/**
 *
 * @param {object} payload
 * @param {string} payload.email
 * @param {string} payload.password
 * @returns {(function(*): Promise<void>)|*}
 * @constructor
 */
export const SignInUser = (payload)=> async dispatch => {
    try{
        const [ err, data ] = await new Authentication({
            mutate: {
                ...payload
            }
        }).signIn()
        if(err)return [ new Error(err?.message ?? err), null]
        return [ null, data ]
    }catch(err){
        return [ err, null ]
    }
}



/**
 * @param {object} payload
 * @param {boolean} payload.isLogin
 * @param {boolean} payload.isAuthenticated
 * @private
 */
export const __SET_AUTH = (payload)=> {
    return {
        type: SET_AUTH,
        payload
    }
}
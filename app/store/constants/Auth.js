import {useMutation} from "@apollo/client";
import {Authentication} from "../../service/graphql/mutation/authentication";

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
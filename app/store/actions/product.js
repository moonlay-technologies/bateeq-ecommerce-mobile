import {REQUEST} from "./action.type";
import {GET_PROD_COLL_SEARCH} from "../constants/product";

/**
 *
 * @param {object} payload
 * @param {number} payload.first
 * @param {string} payload.query
 * @returns {{payload, type: string}}
 * @constructor
 */
export const CollectionSearch = (payload)=> {
    return  {
        type: REQUEST(GET_PROD_COLL_SEARCH),
        payload
    }
}
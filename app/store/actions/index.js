import {
    CART_LINE_ITEM_ADD,
    DELETE_CART_LIST_OF_ITEM,
    GENERATE_CART_ID,
    GET_CART_LIST,
    PUT_CART_TOTAL_QTY
} from "../constants";

export function CartGenerateId(payload = {}){
    return {
        type: GENERATE_CART_ID,
        payload,
    }
}


/**
 *
 * @param {object} payload
 * @param {String} payload.cartId
 * @param {Array | [] | String[]} payload.lineIds
 * @returns {{payload, type: string}}
 */
export function CartDeleteListOfItem(payload){
    return {
        type: DELETE_CART_LIST_OF_ITEM,
        payload
    }
}

/**
 *
 * @param {{last: number, first: number}} payload
 * @param {number | string} payload.first
 * @param {number | string} payload.last
 * @param {string} payload.id
 * @returns {{payload, type: string}}
 * @constructor
 */
export function CartGetList(payload){
    return {
        type: GET_CART_LIST,
        payload
    }
}

/**
 *
 * @param payload
 * @param {Function} payload.callback
 * @param {string} payload.cartId
 * @param {Array | ProductAddCart[] } payload.lines
 * @returns {{payload, type: string}}
 * @constructor
 */
export function CartLineItemAdd(payload){
    return {
        type: CART_LINE_ITEM_ADD,
        payload
    }
}

export function CartPutTotalQty(payload){
    return {
        type: PUT_CART_TOTAL_QTY,
        payload
    }
}
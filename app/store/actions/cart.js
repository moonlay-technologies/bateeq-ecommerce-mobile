import {
    CART_LINE_ITEM_ADD,
    DELETE_CART_LIST_OF_ITEM,
    GENERATE_CART_ID,
    GET_CART_LIST, PUT_CART_QTY_ITEM,
    PUT_CART_TOTAL_QTY
} from "../constants";
import {REQUEST} from "./action.type";

export function CartGenerateId(payload = {}){
    return {
        type: REQUEST(GENERATE_CART_ID),
        payload,
    }
}


/**
 *
 * @param {object} payload
 * @param {String} payload.cartId
 * @param {Array | [] | String[]} payload.lineIds
 * @param {String} payload.lineId
 * @returns {{payload, type: string}}
 */
export function CartDeleteListOfItem(payload){
    return {
        type: REQUEST(DELETE_CART_LIST_OF_ITEM),
        payload
    }
}

/**
 *
 * @param {object} payload
 * @param {number | string} payload.first
 * @param {number | string | 0} payload.last
 * @param {string} payload.id
 * @returns {{payload, type: string}}
 */
export function CartGetList(payload){
    return {
        type: REQUEST(GET_CART_LIST),
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
 */
export function CartLineItemAdd(payload){
    return {
        type: REQUEST(CART_LINE_ITEM_ADD),
        payload
    }
}

export function CartPutTotalQty(payload){
    return {
        type: REQUEST(PUT_CART_TOTAL_QTY),
        payload
    }
}


/**
 * @param {object} payload
 * @param {object} payload.variables
 * @param {number | string} payload.variables.cartId
 * @param {object} payload.variables.cartId
 * @param {CartLineInput[]} payload.variables.lines
 * @returns {{payload: {variables: {cartId: Object, lines: CartLineInput[]}}, type: string}}
 */
export function CartPutQtyItem(payload){
    return {
        type:REQUEST(PUT_CART_QTY_ITEM),
        payload
    }
}
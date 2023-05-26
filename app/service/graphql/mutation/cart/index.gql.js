/**
 * @typedef gqlReturn
 * @property {Array|Object|String|Number|Boolean} data
 * @property {Boolean} loading
 * @property {Object} error
 * @property {NetworkStatus} networkStatus
 */

import {gql} from "@apollo/client";

/**
 * @name CART_PUT_QTY
 * @type {DocumentNode}
 */
export const CART_PUT_QTY = gql`

`

/**
 * @name CART_REMOVE_ITEM
 * @type {DocumentNode}
 */
export const CART_REMOVE_ITEM = gql``

/**
 * @name CART_ADD
 * @type {DocumentNode}
 */
export const CART_ADD = gql`
mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
            id
            lines(first: 10){
                edges{
                    node{
                        quantity
                        id
                        attributes{
                            key
                            value
                        }
                        merchandise{
                            __typename
                        }
                    }
                }
            }
        }
        userErrors {
            field
            message
        }
    }
}

`

/**
 * @name CART_CLEAR
 * @type {DocumentNode}
 */
export const CART_CLEAR = gql``


/**
 * @name GET_CART_LIST
 * @type {DocumentNode}
 */
export const GET_CART_LIST = gql``


/**
 * @name CART_INITIAL
 */
export const CART_INITIAL = gql`
    mutation cartCreate($input: CartInput!, $country: CountryCode = ID, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
        cartCreate(input: $input) {
            cart {
                id
                note
                totalQuantity
                __typename
                lines(first:10){
                    edges{
                        node{
                            __typename
                            cost{
                                amountPerQuantity{
                                    amount
                                    currencyCode
                                }
                                compareAtAmountPerQuantity{
                                    amount
                                    currencyCode
                                }
                                totalAmount{
                                    amount
                                    currencyCode
                                }
                            }
                        }
                    }
                }
                attributes{
                    key
                    value
                    __typename
                }
                cost{
                    totalAmount{
                        amount
                    }
                }
            },
            userErrors {
                field
                message
            }
        }
    }`


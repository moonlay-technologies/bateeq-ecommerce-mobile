import {gql} from "@apollo/client";

/**
 * @name CART_PUT_QTY
 * @type {DocumentNode}
 */
export const CART_PUT_QTY = gql`
mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
            id
            totalQuantity
        }
        userErrors {
            field
            message
        }
    }
}
`

/**
 * @name CART_REMOVE_ITEM
 * @type {DocumentNode}
 */
export const CART_REMOVE_ITEM = gql`
mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
            id
        }
        userErrors {
            field
            message
        }
    }
}
`

export const CART_ADD = gql`mutation addNewLine($cartId: ID!, $lines: [CartLineInput!]!){
    cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
            id
            totalQuantity
        }
        userErrors {
            message
            field
            code
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
export const GET_CART_LIST = gql`
    query GetProductInCart($first:Int!,$id: ID!){
        cart(id: $id){
            id
            totalQuantity
            lines(first:$first){
                edges{
                    node{
                        id
                        quantity
                        merchandise{
                            __typename
                        }
                        discountAllocations {
                            ... on CartDiscountAllocation{
                                __typename
                            }
                        }
                        __typename
                        attributes{
                            ... on Attribute{
                                key
                                value
                            }
                        }
                        # sellingPlanAllocation
                        cost{
                            ... on CartLineCost{
                                totalAmount{
                                    ... on MoneyV2{
                                        amount
                                        currencyCode
                                    }
                                }
                                compareAtAmountPerQuantity{
                                    ... on MoneyV2{
                                        amount
                                        currencyCode
                                    }
                                }

                                subtotalAmount {
                                    ... on MoneyV2{
                                        amount
                                        currencyCode
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`
export const GQL_GET_CART_LIST = gql`
    query GetProductInCart($first:Int!,$id: ID!){
        cart(id: $id){
            id
            totalQuantity
            lines(first:$first){
                edges{
                    node{
                        id
                        quantity
                        merchandise{
                            __typename
                        }
                        discountAllocations {
                            ... on CartDiscountAllocation{
                                __typename
                            }
                        }
                        __typename
                        attributes{
                            ... on Attribute{
                                key
                                value
                            }
                        }
                        # sellingPlanAllocation
                        cost{
                            ... on CartLineCost{
                                totalAmount{
                                    ... on MoneyV2{
                                        amount
                                        currencyCode
                                    }
                                }
                                compareAtAmountPerQuantity{
                                    ... on MoneyV2{
                                        amount
                                        currencyCode
                                    }
                                }

                                subtotalAmount {
                                    ... on MoneyV2{
                                        amount
                                        currencyCode
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`


/**
 * @name CART_INITIAL
 */
export const CART_INITIAL = gql`
    mutation cartCreate($input: CartInput!, $country: CountryCode = ZZ, $language: LanguageCode)
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


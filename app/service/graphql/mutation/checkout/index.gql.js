
import { gql } from '@apollo/client'


// export const CHECKOUT_


/**
 * @name SHOW_CHECKOUT_BY_ID
 * @type {DocumentNode}
 * @param {String} checkoutID
 */
export const SHOW_CHECKOUT_BY_ID = gql`
    query Checkout($checkoutID: ID!){
        node(id:$checkoutID){
            ... on Checkout{
                id
                webUrl
                createdAt
                completedAt
                subtotalPrice{
                    amount
                    currencyCode
                }
                customAttributes{
                    value
                    key
                }
                availableShippingRates{
                    ... on AvailableShippingRates{
                        shippingRates{
                            ... on ShippingRate{

                                price{
                                    amount
                                    currencyCode
                                }
                            }
                        }
                    }
                }
                paymentDue{
                    amount
                    currencyCode
                }
                note
                ready
                requiresShipping
                taxExempt
                totalTax{
                    amount
                    currencyCode
                }
                shippingAddress{
                    address1
                    address2
                    formattedArea
                    city
                    company
                    provinceCode
                    countryCodeV2
                }
            }
        }
    } 
`


/**
 * @name CREATE_CHECKOUT
 * @type {DocumentNode}
 * @param {Object} input
 * @param {String | undefined } input.email
 * @param {String | null | undefined } input.note
 * @param {Object | undefined | {} } input.shippingAddress
 * @param {String | undefined } input.shippingAddress.address1
 * @param {String | undefined } input.shippingAddress.address2
 * @param {String | undefined } input.shippingAddress.province
 * @param {String | undefined } input.shippingAddress.city
 * @param {String | undefined } input.shippingAddress.zip
 * @param {String | undefined } input.shippingAddress.country
 * @param {String | undefined } input.shippingAddress.firstName
 * @param {String | undefined } input.shippingAddress.lastName
 * @param {String | undefined } input.shippingAddress.lastName
 * @param {lineItemsCheckout[]} lineItems
 */
export const CREATE_CHECKOUT = gql`
    mutation CheckoutCreate($input: CheckoutCreateInput!){
        checkoutCreate(input:$input){
            checkout{
                id
                webUrl
                createdAt
                updatedAt
                note
            }
            checkoutUserErrors{
                message
                field
            }
        }
    }
`


/**
 * @name CHECKOUT_COMPLETE_FREE
 * @type {DocumentNode}
 * @param {String} checkoutID
 */
export const CHECKOUT_COMPLETE_FREE = gql`
    mutation checkoutCompleteFree($checkoutID: ID!) {
        checkoutCompleteFree(checkoutId: $checkoutID) {
            checkout {
                id
                webUrl
                completedAt
                createdAt
                currencyCode
                totalDuties{
                    amount
                    currencyCode
                }
                totalPrice{
                    amount
                    currencyCode
                }
                totalTax{
                    amount
                    currencyCode
                }
                shippingAddress{
                    address1
                    address2
                    firstName
                    lastName
                    latitude
                    longitude
                    formattedArea
                    city
                    company
                    country
                    countryCodeV2
                }
            }
            checkoutUserErrors {
                message
                field
            }
        }
    }
`


/**
 * @name CHECKOUT_LINE_ADD
 * @type {DocumentNode}
 * @param {String} checkoutId
 * @param {lineItemsCheckout[]} lineItems
 */
export const CHECKOUT_LINE_ADD = gql`
    mutation checkoutLineItemsAdd($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]!) {
        checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
            checkout {
                id
                lineItems(first: 10) {
                    edges {
                        node {
                            title
                            quantity
                            variant {
                                id
                                title
                                price{
                                    amount
                                    currencyCode
                                }
                            }
                        }
                    }
                }
            }
            checkoutUserErrors {
                message
                field
            }
        }
    }
`

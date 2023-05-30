import { gql } from "@apollo/client"

export const ADD_TO_CART = gql`
    mutation (
    $cartId: ID!, 
    $lines: [CartLineInput!]!, 
    $country: CountryCode= ZZ, 
    $language: LanguageCode)
    @inContext(country: $country, language: $language) {
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

export const CREATE_CART = gql`
    mutation cartCreate(
    $input: CartInput!, 
    $country: CountryCode = ZZ, 
    $language: LanguageCode)
        @inContext(
        country: $country, 
        language: $language) {
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
    }
`
import { gql } from "@apollo/client"

export const GET_PRODUCT_RECOMMENDATION = gql`
    query productRecommendations($productId: ID!) {
        productRecommendations(productId: $productId) {
            id
            title
            images(first: 1) {
                edges {
                    node {
                         url
                    }
                }
            }
            variants(first: 1){
                edges {
                    node {
                        price {
                            amount
                        }
                        compareAtPrice {
						    amount
                        }
                    }
                }
            }
        }
    }
`

export const GET_PRODUCT_BY_ID = gql`
    query getProductById ($id: ID!) {
        product(id:$id) {
            id
            description
            descriptionHtml
            title
            images(first: 4) {
                edges {
                    node {
                    url
                    }
                }
            }
            variants(first: 10) {
                edges {
                    node {
                        id
                        compareAtPrice {
                            amount
                        }
                        price {
                            amount
                            currencyCode
                        }
                        selectedOptions {
                            name
                            value
                      }
                    }
                }
            }
        }
    }
`


export const GET_PRODUCT_OPTIONS_BY_ID = gql`
    query getOptions($id: ID!){
        product(id: $id){
            options {
            name
            values
            }
        }
    }
`

export const GET_CART_BY_ID = gql`
     query getCart($id:ID!) {
        cart(id: $id) {
            id
            totalQuantity
            lines(first: 10){
                edges {
                    node {
                    id
                    quantity
                    merchandise {
                        ... on ProductVariant {
                        product {
                            id
                            title
                        }
                        id
                        image {
                            url
                            }
                        }
                    }
                    attributes {
                        key
                        value
                    }
                    
                    cost {
                        compareAtAmountPerQuantity{
                            currencyCode
                            amount
                        }
                        totalAmount {
                            amount
                            currencyCode
                        }
                        subtotalAmount {
                            amount
                            currencyCode
                        }
                    }
                }
            }
        }
    }  
}
`
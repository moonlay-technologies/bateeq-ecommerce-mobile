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
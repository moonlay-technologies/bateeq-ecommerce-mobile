import {gql} from "@apollo/client";

export const LIST_ORDERS_USER = `query getOrders($customerId:ID!,$query: String!) {
   customer(id:$customerId){
        orders(first:10, query:$query){
            nodes {
                displayFinancialStatus
                displayFulfillmentStatus
                lineItems(first:10){
                    nodes{
                        sku
                        product{
                            id
                            seo{
                                title
                                description
                            }
                            createdAt
                            publishedAt
                            updatedAt
                            description
                            title
                            totalVariants
                            status
                        }
                        currentQuantity
                    }
                }
            }
        }
    }

}`
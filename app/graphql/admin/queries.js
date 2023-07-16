import { gql } from '@apollo/client';

export const GET_ORDERS = gql`
  query getOrders($customerId: ID!, $query: String!) {
    customer(id: $customerId) {
      orders(first: 10, query: $query) {
        nodes {
          id
          subtotalLineItemsQuantity
          totalPriceSet {
            presentmentMoney {
              amount
            }
          }
          createdAt
          displayFinancialStatus
          lineItems(first: 1) {
            nodes {
              id
              product {
                id
                title
                images(first: 1) {
                  nodes {
                    id
                    url
                  }
                }
                variants(first: 1) {
                  nodes {
                    id
                    price
                    compareAtPrice
                    selectedOptions {
                      value
                      name
                    }
                  }
                }
                options {
                  values
                }
              }
              currentQuantity
              sku
            }
          }
        }
      }
    }
  }
`;
export const GET_ORDERS_DETAIL_BY_ID = gql`
  query getDetailOrder($orderId: ID!) {
    node(id: $orderId) {
      id
      ... on Order {
        shippingAddress{
          address1
          address2
          province
          city
          country
        }
        name
        createdAt
        email
        displayFulfillmentStatus
        displayFinancialStatus
        totalPriceSet {
          presentmentMoney{
            amount
          }
        }
        lineItems(first: 10) {
          nodes {
            variantTitle
            quantity
            sku
            name
            image {
              id
              url
            }
          }
        }
      }
    }
  }
`;

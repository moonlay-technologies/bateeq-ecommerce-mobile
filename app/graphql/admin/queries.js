import { gql } from '@apollo/client';

export const GET_ORDERS = gql`
  query getOrders($customerId: ID!, $query: String!) {
    customer(id: $customerId) {
      orders(first: 10, query: $query) {
        nodes {
          id
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

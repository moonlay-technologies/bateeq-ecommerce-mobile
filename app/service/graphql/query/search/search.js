import { gql } from "@apollo/client";

export const SEARCH_PRODUCTS_QUERY = gql`
  query SearchProducts($query: String!) {
    products(query: $query, first: 10) {
      edges {
        node {
          id
          title
          description
          images(first: 4) {
            edges {
              node {
                id
                url
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
          options(first: 2) {
            values
          }
        }
      }
    }
  }
`;
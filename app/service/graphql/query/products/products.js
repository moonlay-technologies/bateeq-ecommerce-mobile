import {gql} from '@apollo/client';

export const GET_PRODUCT_RECOMMENDATION = gql`
  query getProductRecommendation($productId: ID!) {
    productRecommendations(intent: RELATED, productId: $productId) {
      id
      title
      productType
      featuredImage {
        id
        height
        width
        url
      }
      description
      descriptionHtml
      variants(first: 5) {
        edges {
          node {
            price {
              amount
            }
            compareAtPrice {
              amount
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
`;

export const GET_LIST_PRODUCTS_CATEGORIES = gql`
  query GetProducts($first: Int!, $query: String!, $after: String) {
    products(first: $first, query: $query, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          title
          description
          descriptionHtml
          images(first: 1) {
            edges {
              node {
                url
              }
            }
          }
          variants(first: 5) {
            edges {
              node {
                price {
                  amount
                }
                compareAtPrice {
                  amount
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
    }
  }
`;

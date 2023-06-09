import {gql} from '@apollo/client';

export const GET_PAGE_STORY = gql`
  query getPageStory($handle: String!) {
    page(handle: $handle) {
      id
      title
      body
      bodySummary
    }
  }
`;

export const GET_LATEST_COLLECTION = gql`
  query getCollectionIdFromHandle($handle: String!) {
    collection(handle: $handle) {
      id
      title
      description
      image {
        url
      }
    }
  }
`;

export const GET_BANNER_SLIDER = gql`
  query getDataImageBanner($handle: String!) {
    product(handle: $handle) {
      description
      images(first: 5) {
        edges {
          node {
            url
            id
          }
        }
      }
    }
  }
`;
export const GET_LIST_CATEGORIES = gql`
  query GetProducts($first: Int!, $query: String!) {
    products(first: $first, query: $query) {
      nodes {
        id
        title
        description
        descriptionHtml
        images(first: 4) {
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
`;

export const GET_MAIN_MENU_NAVIGATION = gql`
  query getMenuListHeader($handle: String!) {
    menu(handle: $handle) {
      id
      title
      handle
      items {
        id
        title
        url
        items {
          id
          title
          items {
            id
            title
          }
        }
      }
    }
  }
`;

export const GET_COLLECTIONS_SLIDER = gql`
  query getDataSliderById($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Collection {
        title
        description
        id
        image {
          url
        }
        products(first: 10) {
          nodes {
            title
            vendor
          }
        }
      }
    }
  }
`;


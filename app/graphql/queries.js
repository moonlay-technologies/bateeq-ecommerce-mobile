import { gql } from '@apollo/client';

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
      variants(first: 1) {
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
`;

export const GET_PRODUCT_BY_ID = gql`
  query getProductById($id: ID!) {
    product(id: $id) {
      id
      description
      descriptionHtml
      title
      totalInventory
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
            currentlyNotInStock
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
`;

export const GET_PRODUCT_OPTIONS_BY_ID = gql`
  query getOptions($id: ID!) {
    product(id: $id) {
      options {
        name
        values
      }
    }
  }
`;

export const GET_CART_BY_ID = gql`
  query getCart($id: ID!) {
    cart(id: $id) {
      id
      totalQuantity
      lines(first: 10) {
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
              compareAtAmountPerQuantity {
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
`;

export const GET_TOTAL_QUANTITY_CART = gql`
  query getTotalQuantityCart($id: ID!) {
    cart(id: $id) {
      id
      totalQuantity
    }
  }
`;

export const GET_CUSTOMER_ADDRESS = gql`
  query ($accessToken: String!, $limit: Int!) {
    customer(customerAccessToken: $accessToken) {
      addresses(first: $limit) {
        edges {
          node {
            id
            address1
            address2
            company
            city
            province
            country
            zip
          }
        }
      }
    }
  }
`;

export const __GQL_CUSTOMER_INFO = `query ($accessToken: String!) {
    customer(customerAccessToken: $accessToken) {
      id
      firstName
      lastName
      acceptsMarketing
      email
      phone
      defaultAddress {
        address1
        address2
        company
        phone
        firstName
        lastName
        name
        city
        province
        country
        zip
      }
      addresses(first: 10) {
        nodes {
            id
            address1
            address2
            city
            province
            country
            zip
            company
          }
      }
    }
  }`;
export const GET_CUSTOMER_INFO = gql`
  query ($accessToken: String!) {
    customer(customerAccessToken: $accessToken) {
      id
      firstName
      lastName
      acceptsMarketing
      email
      phone
      defaultAddress {
        address1
        address2
        company
        phone
        firstName
        lastName
        name
        city
        province
        country
        zip
      }
      addresses(first: 10) {
        edges {
          node {
            id
            address1
            address2
            city
            province
            country
            zip
          }
        }
      }
    }
  }
`;

/**
 * => USED
 * @name GET-PAGES
 * @type {string}
 * @private
 */
export const __GQL_GET_PAGES = `query getPageStory($handle: String!) {
    page(handle: $handle) {
      id
      title
      body
      bodySummary
    }
  }`
export const GET_PAGES = gql`
  query getPageStory($handle: String!) {
    page(handle: $handle) {
      id
      title
      body
      bodySummary
    }
  }
`;


/**
 * @type {string}
 * @param {object} variables
 * @param {string} variables.handle
 */
export const __GQL_SHOW_LATEST_COLLECTION = `query getCollectionIdFromHandle($handle: String!) {
    collection(handle: $handle) {
      id
      title
      description
      image {
        url
      }
    }
  }`

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

/**
 * => USED
 * @type {string}
 * @param {number} first
 * @param {string} query
 * @param {string} after
 * @private
 */
export const __GQL_GET_PRODUCT_LIST_BY_CATEGORY = `query GetProducts($first: Int!, $query: String!, $after: String) {
    products(first: $first, query: $query, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
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
  }`
export const GET_LIST_CATEGORIES = gql`
  query GetProducts($first: Int!, $query: String!, $after: String) {
    products(first: $first, query: $query, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
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

export const GET_COLLECTIONS_BY_HANDLE = gql`
  query getCollectionByHande($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      id
      title
      description
      handle
      image {
        url
      }
      products(first: $first) {
        pageInfo{
          hasNextPage
          endCursor
        }
        nodes {
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

export const GET_SHIPPING_POLICY = gql`
  {
    shop {
      termsOfService {
        id
        title
        body
      }
      refundPolicy {
        id
        title
        body
      }
    }
  }
`;

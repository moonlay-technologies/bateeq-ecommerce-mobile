import { gql } from '@apollo/client';

export const AUTH_LOGIN = gql`
  mutation CustomerAccessTokenCreate($email: String!, $password: String!) {
    customerAccessTokenCreate(input: { email: $email, password: $password }) {
      customerAccessToken {
        accessToken
      }
      customerUserErrors {
        message
      }
    }
  }
`;

export const __GQL_EDIT_DETAIL_ACCOUNT = `mutation customerUpdate(
    $customer: CustomerUpdateInput!
    $customerAccessToken: String!
  ) {
    customerUpdate(
      customer: $customer
      customerAccessToken: $customerAccessToken
    ) {
      customer {
        phone
        firstName
        lastName
        email
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        message
      }
    }
  }`;
export const EDIT_DETAIL_ACCOUNT = gql`
  mutation customerUpdate($customer: CustomerUpdateInput!, $customerAccessToken: String!) {
    customerUpdate(customer: $customer, customerAccessToken: $customerAccessToken) {
      customer {
        phone
        firstName
        lastName
        email
      }
      customerUserErrors {
        message
      }
    }
  }
`;

export const ADD_TO_CART = `
  mutation ($cartId: ID!, $lines: [CartLineInput!]!, $country: CountryCode = ZZ, $language: LanguageCode)
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
`;

export const ADD_ITEM_TO_CART = gql`
  mutation ($cartId: ID!, $lines: [CartLineInput!]!, $country: CountryCode = ZZ, $language: LanguageCode)
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
`;

export const CREATE_CART = `
  mutation cartCreate($input: CartInput!, $country: CountryCode = ZZ, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    cartCreate(input: $input) {
      cart {
        id
        note
        totalQuantity
        __typename
        lines(first: 10) {
          edges {
            node {
              __typename
              cost {
                amountPerQuantity {
                  amount
                  currencyCode
                }
                compareAtAmountPerQuantity {
                  amount
                  currencyCode
                }
                totalAmount {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
        attributes {
          key
          value
          __typename
        }
        cost {
          totalAmount {
            amount
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const CART_REMOVE_ITEM = gql`
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const CART_PUT_QTY = gql`
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const CREATE_CUSTOMER_ADDRESS = `
  mutation CreateCustomerAddress($address: MailingAddressInput!, $customerAccessToken: String!) {
    customerAddressCreate(address: $address, customerAccessToken: $customerAccessToken) {
      customerAddress {
        id
        address1
        address2
        phone
        company
        country
        province
        city
        zip
      }
      customerUserErrors {
        field
        message
      }
    }
  }
`;

export const UPDATE_CUSTOMER_ADDRESS = `
  mutation customerAddressUpdate($address: MailingAddressInput!, $customerAccessToken: String!, $id: ID!) {
    customerAddressUpdate(address: $address, customerAccessToken: $customerAccessToken, id: $id) {
      customerAddress {
        id
      }
      customerUserErrors {
        message
      }
    }
  }
`;

export const REMOVE_CUSTOMER_ADDRESS = `
  mutation customerAddressDelete($customerAccessToken: String!, $id: ID!) {
    customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {
      deletedCustomerAddressId
    }
  }
`;
export const CUSTOMER_DEFAULT_ADDRESS_UPDATE = `
  mutation customerDefaultAddressUpdate($addressId: ID!, $customerAccessToken: String!) {
    customerDefaultAddressUpdate(addressId: $addressId, customerAccessToken: $customerAccessToken) {
      customer {
        id
      }
      customerUserErrors {
        message
      }
    }
  }
`;

export const CREATE_CHECKOUT_MUTATION = `
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        webUrl
        createdAt
        updatedAt
        note
      }
      checkoutUserErrors {
        message
        field
      }
    }
  }
`;

export const RECOVER_ACCOUNT_CUSTOMER = gql`
  mutation RecoverAccount($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

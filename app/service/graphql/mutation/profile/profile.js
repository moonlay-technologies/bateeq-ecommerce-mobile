import {gql} from '@apollo/client';

export const EDIT_DETAIL_ACCOUNT = gql`
  mutation customerUpdate(
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
      customerUserErrors {
        message
      }
    }
  }
`;

export const ADD_ADDRESS = gql`
  mutation customerAddressCreate(
    $address: MailingAddressInput!
    $customerAccessToken: String!
  ) {
    customerAddressCreate(
      address: $address
      customerAccessToken: $customerAccessToken
    ) {
      customerAddress {
        # MailingAddress fields
        address1
        firstName
        lastName
        phone
        company
        city
        province
        country
        zip
      }
      customerUserErrors {
        message
      }
    }
  }
`;

export const DELETE_ADDRESS = gql`
  mutation customerAddressDelete($customerAccessToken: String!, $id: ID!) {
    customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {
      customerUserErrors {
        message
      }
      deletedCustomerAddressId
    }
  }
`;

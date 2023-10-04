import { gql } from "@apollo/client"

export const GET_DETAIL_ACCOUNT = gql `query($customerAccessToken: String!) {
  customer(customerAccessToken: $customerAccessToken) {
    id
    firstName
    lastName
    email
    phone
    defaultAddress {
      id
      address1
      city
      province
      zip
      country
    }
    addresses(first: 10) {
        nodes {
          id
          address1
          city
          province
          zip
          country
          company
          phone
        }
    }
  }
}
  `
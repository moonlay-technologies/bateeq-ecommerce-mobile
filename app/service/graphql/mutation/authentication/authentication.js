import { gql } from "@apollo/client";

export const authenticate = gql`
mutation customerAccessTokenCreate {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
      }
      customerUserErrors {
        message
      }
    }
  }
`
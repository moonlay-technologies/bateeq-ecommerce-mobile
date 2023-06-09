import { gql } from "@apollo/client";

export const authenticate = gql`
mutation CustomerAccessTokenCreate($email: String!, $password: String!) {
  customerAccessTokenCreate(input: {email: $email, password: $password}) {
    customerAccessToken {
      accessToken
    }
    customerUserErrors {
      message
    }
  }
}
`
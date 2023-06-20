import {gql} from "@apollo/client";

export const AUTH_SIGN_IN_GQL = gql`mutation CustomerAccessTokenCreate($email: String!, $password: String!) {
        customerAccessTokenCreate(input: {email: $email, password: $password}) {
            customerAccessToken {
                accessToken
            }
            customerUserErrors {
                message
            }
        }
    }`
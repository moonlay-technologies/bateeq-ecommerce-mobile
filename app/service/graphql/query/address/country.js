export const GET_COUNTRIES_QUERY = gql`
  {
    countries {
      edges {
        node {
          name
        }
      }
    }
  }
`;
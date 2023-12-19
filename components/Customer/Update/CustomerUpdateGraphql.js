import { gql } from "@apollo/client";

export const UPDATE_MUTATION = gql`
  mutation Update($firstName: String!, $lastName: String!) {
    updateCustomer(input: { firstname: $firstName, lastname: $lastName })
    customer {
      firstname
      lastname
    }
  }
`;

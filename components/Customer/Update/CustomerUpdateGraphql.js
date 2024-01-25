import { gql } from "@apollo/client";

export const UPDATECUSTOMERNAME_MUTATION = gql`
  mutation UpdateCustomer(
    $firstName: String!
    $lastName: String!
    $email: String!
  ) {
    updateCustomer(
      input: { firstname: $firstName, lastname: $lastName, email: $email }
    ) {
      customer {
        firstname
        lastname
        email
      }
    }
  }
`;

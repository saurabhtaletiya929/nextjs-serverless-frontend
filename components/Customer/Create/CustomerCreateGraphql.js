// graphql/mutations.js

import { gql } from '@apollo/client';

export const CREATE_CUSTOMER_MUTATION = gql`
  mutation CreateCustomer($firstname: String!, $lastname: String! ,$email: String!, $password: String!) {
    createCustomer(input: {
      firstname: $firstname
      lastname: $lastname
      email: $email
      password: $password
      is_subscribed: true
    })
    {
      customer {
        firstname
        lastname
        email
        is_subscribed
      }
    }
  }
`;
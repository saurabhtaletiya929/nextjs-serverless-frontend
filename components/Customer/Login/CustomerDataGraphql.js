import { gql } from '@apollo/client';

export const GET_CUSTOMER_DATA = gql`
  query GetCustomerData {
    customer {
      id
      firstname
      lastname
      email
    }
  }
`;
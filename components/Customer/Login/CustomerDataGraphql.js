import { gql } from "@apollo/client";

export const GET_CUSTOMER_DATA = gql`
  query GetCustomerData {
    customer {
      firstname
      lastname
      suffix
      email
      addresses {
        firstname
        lastname
        street
        city
        region {
          region_code
          region
        }
        postcode
        country_code
        telephone
      }
    }
    customerOrders {
      items {
        order_number
        id
        created_at
        grand_total
        status
      }
    }
  }
`;

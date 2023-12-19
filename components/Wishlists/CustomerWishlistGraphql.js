import { gql } from "@apollo/client";

export const GET_CUSTOMER_WISHLIST = gql`
  query GetCustomerWishlist {
    customer {
      wishlists {
        id
        items_count
        items_v2 {
          items {
            id
            product {
              uid
              name
              sku
              thumbnail {
                url
              }
            }
          }
        }
      }
    }
  }
`;

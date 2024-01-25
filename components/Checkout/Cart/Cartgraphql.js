import { gql } from '@apollo/client';
 
export const ADD_TO_CART_MUTATION = gql`
mutation {
  addProductsToCart(
    cartId: "GcmOmTeiqyUTx80PrWNajbhvlxYD5WJC"
    cartItems: [
      {
        quantity: 1
        sku: "24-MB04"
      }
    ]
  ) {
    cart {
      items {
        id
        product {
          name
          sku
        }
        quantity
      }
    }
    user_errors {
      code
      message
    }
  }
}
`;
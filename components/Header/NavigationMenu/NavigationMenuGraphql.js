import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query {
    categoryList(filters: { parent_id: { in: ["2"] } }) {
      id
      name
      url_path
      url_key
      children {
        id
        name
        url_path
        children {
          id
          name
          url_path
          url_key
          # Add more levels as needed
        }
      }
    }
  }
`;
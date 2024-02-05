import { gql } from '@apollo/client';

export const REVIEW_MUTATION = gql`
mutation CreateProductReview( $sku: String!, $nickname: String!, $ratings: [ProductReviewRatingInput]!, $summary: String!, $text: String!) {
    createProductReview(input: { 
        sku: $sku
        nickname: $nickname 
        ratings: $ratings
        summary: $summary 
        text: $text
    } )
    {
    review {
        nickname
        summary
        text
        average_rating
        ratings_breakdown{
            name
            value
        }
      }
    }
  }
`;

import { gql } from '@apollo/client';

export const FORGOTPASSWORD_MUTATION = gql`
  mutation SendPasswordResetEmail($email: String!) {
  requestPasswordResetEmail(email: $email)
}
`;
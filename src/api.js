import { gql } from '@apollo/client';

export const GET_LEGISLATORS = gql`
  query GetLegislators (
    $chamber: Chamber
    $gender: Gender
    $name: String
    $party: Party
    $state: State
    $zipCode: String
  ) {
    legislators(
      chamber: $chamber
      gender: $gender
      name: $name
      party: $party
      state: $state
      zipCode: $zipCode
    ) {
      fullName
      id
      party
      chamber
      state
    }
  }
`;

import { gql } from "@apollo/client";

export const MAP_FIELDS = gql`
  fragment MapFields on SavedMap {
    id
    name
    rootSystemName
  }
`;

export const CHARACTER_FIELDS = gql`
  fragment CharacterFields on Character {
    esiId
    name
  }
`;

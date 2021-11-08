import { gql } from "@apollo/client";

export const MAP_FIELDS = gql`
  fragment MapFields on SavedMap {
    id
    name
    rootSystemName
  }
`;

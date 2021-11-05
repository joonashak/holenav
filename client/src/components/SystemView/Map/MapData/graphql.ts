import { gql } from "@apollo/client";
import { RECURSIVE_CONNECTION_TREE } from "./fragments";

export const GET_CONNECTION_TREE = gql`
  ${RECURSIVE_CONNECTION_TREE}
  query ConnectionTree($rootSystem: String!) {
    getConnectionTree(rootSystem: $rootSystem) {
      rootSystemName
      ...RecursiveConnectionTree
    }
  }
`;

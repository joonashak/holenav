/* eslint-disable import/prefer-default-export */
import { gql } from "@apollo/client";

export const GET_CONNECTION_TREE = gql`
  query ConnectionTree($rootSystem: String!, $folderId: String!) {
    getConnectionTree(rootSystem: $rootSystem, folderId: $folderId) {
      rootSystemName
      children {
        name
        children {
          name
        }
      }
    }
  }
`;

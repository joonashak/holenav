/* eslint-disable import/prefer-default-export */
import { gql } from "@apollo/client";

export const GET_CONNECTION_TREE = gql`
  query ConnectionTree($rootSystem: String!) {
    getConnectionTree(rootSystem: $rootSystem) {
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

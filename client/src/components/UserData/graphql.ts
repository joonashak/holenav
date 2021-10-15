/* eslint-disable import/prefer-default-export */
import { gql } from "@apollo/client";

export const GET_SYSTEM_DATA = gql`
  query SystemData {
    whoami {
      id
      activeFolder {
        id
      }
      settings {
        maps {
          id
          name
          rootSystemName
        }
      }
    }
  }
`;

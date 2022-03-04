import { gql } from "@apollo/client";

export const GET_ACCESSIBLE_FOLDERS = gql`
  query SettingsData {
    getAccessibleFolders {
      id
      name
    }
  }
`;

import { gql } from "@apollo/client";
import { FOLDER_FIELDS } from "./fragments";

export const GET_ACCESSIBLE_FOLDERS = gql`
  ${FOLDER_FIELDS}
  query SettingsData {
    getAccessibleFolders {
      ...FolderFields
    }
  }
`;

export const CREATE_FOLDER = gql`
  ${FOLDER_FIELDS}
  mutation CreateFolder($name: String!) {
    createFolder(name: $name) {
      ...FolderFields
    }
  }
`;

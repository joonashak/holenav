import { gql } from "@apollo/client";

export const FOLDER_FIELDS = gql`
  fragment FolderFields on Folder {
    id
    name
  }
`;

import {
  Folder,
  SanitizedUserForManager,
} from "../../../generated/graphqlOperations";

export type Settings = {
  accessibleFolders: Folder[];
  manageableFolders: Folder[];
  users: SanitizedUserForManager[];
};

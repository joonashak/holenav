import { Folder, User } from "../../../generated/graphqlOperations";

export type Settings = {
  accessibleFolders: Folder[];
  manageableFolders: Folder[];
  users: User[];
};

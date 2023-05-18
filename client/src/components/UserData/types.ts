import { Folder, User } from "../../generated/graphqlOperations";

export type UserData = User & {
  accessibleFolders: Folder[];
  userDataReady: boolean;
};

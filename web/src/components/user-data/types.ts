import { Folder, HolenavUser } from "../../generated/graphqlOperations";

export type UserData = HolenavUser & {
  accessibleFolders: Folder[];
  userDataReady: boolean;
};

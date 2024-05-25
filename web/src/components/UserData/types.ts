import {
  Folder,
  SanitizedUserForSelf,
} from "../../generated/graphqlOperations";

export type UserData = SanitizedUserForSelf & {
  accessibleFolders: Folder[];
  userDataReady: boolean;
};

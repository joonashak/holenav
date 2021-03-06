import { Folder, SystemRoles } from "../../generated/graphqlOperations";

export type UserData = {
  id: string;
  settings: UserSettings;
  main: Character | null;
  alts: Character[];
  accessibleFolders: Folder[];
  systemRole: SystemRoles | null;
};

export type UserSettings = {
  maps: SavedMap[];
  selectedMap: SavedMap;
  activeFolder: Folder;
};

export type SavedMap = {
  id: string;
  name: string;
  rootSystemName: string;
};

export type Character = {
  esiId: string;
  name: string;
};

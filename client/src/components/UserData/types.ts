export type UserData = {
  id: string;
  settings: UserSettings;
  main: Character | null;
  alts: Character[];
  accessibleFolders: Folder[];
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

export type Folder = {
  id: string;
  name: string;
};

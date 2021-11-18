export type UserData = {
  id: string;
  activeFolder: string;
  settings: UserSettings;
  main: Character | null;
  alts: Character[];
};

export type UserSettings = {
  maps: SavedMap[];
  selectedMap: SavedMap;
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

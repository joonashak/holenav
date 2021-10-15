export type UserData = {
  id: string;
  activeFolder: string;
  settings: UserSettings;
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

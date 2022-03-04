import { UserSettings } from "./userSettings.model";

const defaultUserSettings: UserSettings = {
  selectedMap: null,
  maps: [
    {
      name: "Demo Chain",
      rootSystemName: "J104809",
    },
    {
      name: "Another Map",
      rootSystemName: "Amarr",
    },
  ],
  activeFolder: null,
};

export default defaultUserSettings;

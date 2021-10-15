import { UserSettings } from "./userSettings.model";

const defaultUserSettings: UserSettings = {
  selectedMap: null,
  maps: [
    {
      name: "Default Map",
      rootSystemName: "Jita",
    },
    {
      name: "Another Map",
      rootSystemName: "Amarr",
    },
  ],
};

export default defaultUserSettings;

import { UserSettings } from "./userSettings.model";

const defaultUserSettings: UserSettings = {
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
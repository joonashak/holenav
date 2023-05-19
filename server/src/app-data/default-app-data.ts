import { AppData } from "./app-data.model";

const defaultAppData: AppData = {
  appVersion: "0.0.0",
  motd: "",
  settings: {
    registration: {
      enabled: true,
      allowedAlliances: [],
      allowedCorporations: [],
    },
  },
};

export default defaultAppData;

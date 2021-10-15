import { useContext } from "react";
import { UserDataContext } from ".";
import { UserData } from "./types";

export default (): UserData => {
  const [state] = useContext<any>(UserDataContext);
  const { settings } = state as UserData;
  const { selectedMap, maps } = settings;

  return {
    ...state,
    settings: {
      ...settings,
      selectedMap: selectedMap || maps[0],
    },
  };
};

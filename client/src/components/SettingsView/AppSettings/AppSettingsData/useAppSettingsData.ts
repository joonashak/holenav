import { Downgraded, useState } from "@hookstate/core";
import { appSettingsState } from ".";

const useAppSettingsData = () => {
  const state = useState(appSettingsState);

  return {
    ...state.attach(Downgraded).get(),
  };
};

export default useAppSettingsData;

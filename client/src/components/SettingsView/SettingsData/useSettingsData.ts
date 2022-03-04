import { Downgraded, useState } from "@hookstate/core";
import { settingsState } from ".";

const useSettingsData = () => {
  const state = useState(settingsState);

  return {
    get accessibleFolders() {
      return state.accessibleFolders.attach(Downgraded).get();
    },
  };
};

export default useSettingsData;

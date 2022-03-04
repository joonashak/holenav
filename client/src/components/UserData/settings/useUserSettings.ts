import { Downgraded, useState } from "@hookstate/core";
import { userState } from "..";

const useUserSettings = () => {
  const state = useState(userState);

  return {
    get activeFolder() {
      return (
        state.settings.activeFolder.get() || state.accessibleFolders.attach(Downgraded).get()[0]
      );
    },
  };
};

export default useUserSettings;

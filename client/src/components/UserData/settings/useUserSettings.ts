import { Downgraded, useState } from "@hookstate/core";
import { userState } from "..";
import { Folder } from "../../../generated/graphqlOperations";

const useUserSettings = () => {
  const state = useState(userState);

  const setActiveFolder = (folder: Folder) => {
    state.settings.activeFolder.set(folder);
  };

  return {
    get activeFolder() {
      return (
        state.settings.activeFolder.get() || state.accessibleFolders.attach(Downgraded).get()[0]
      );
    },
    setActiveFolder,
  };
};

export default useUserSettings;

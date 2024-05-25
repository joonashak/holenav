import { useState } from "@hookstate/core";
import { userState } from "..";
import useAuthenticatedMutation from "../../../auth/useAuthenticatedMutation";
import {
  ChangeActiveFolderDocument,
  Folder,
} from "../../../generated/graphqlOperations";

const useUserSettings = () => {
  const state = useState(userState);

  const [changeActiveFolderMutation] = useAuthenticatedMutation(
    ChangeActiveFolderDocument,
  );

  const setActiveFolder = async (folder: Folder) => {
    await changeActiveFolderMutation({ variables: { folderId: folder.id } });
    state.settings.activeFolder.set(folder);
  };

  return {
    get activeFolder() {
      return state.settings.activeFolder.get();
    },
    setActiveFolder,
  };
};

export default useUserSettings;

import { useMutation } from "@apollo/client";
import { useState } from "@hookstate/core";
import {
  ChangeActiveFolderDocument,
  Folder,
} from "../../../generated/graphqlOperations";
import { userState } from "../UserData";

const useUserSettings = () => {
  const state = useState(userState);

  const [changeActiveFolderMutation] = useMutation(ChangeActiveFolderDocument);

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

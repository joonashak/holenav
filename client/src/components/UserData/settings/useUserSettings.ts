import { Downgraded, useState } from "@hookstate/core";
import { userState } from "..";
import useAuthenticatedMutation from "../../../auth/useAuthenticatedMutation";
import { ChangeActiveFolderDocument, Folder } from "../../../generated/graphqlOperations";

const useUserSettings = () => {
  const state = useState(userState);

  const [changeActiveFolderMutation] = useAuthenticatedMutation(ChangeActiveFolderDocument);

  const setActiveFolder = async (folder: Folder) => {
    await changeActiveFolderMutation({ variables: { folderId: folder.id } });
    state.settings.activeFolder.set(folder);
  };

  const getActiveFolder = (): Folder =>
    state.settings.activeFolder.get() ||
    state.accessibleFolders
      .attach(Downgraded)
      .get()
      .find((folder) => folder.personal) ||
    state.accessibleFolders.attach(Downgraded).get()[0];

  return {
    get activeFolder() {
      return getActiveFolder();
    },
    setActiveFolder,
  };
};

export default useUserSettings;

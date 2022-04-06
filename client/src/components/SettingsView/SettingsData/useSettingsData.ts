import { useMutation } from "@apollo/client";
import { Downgraded, useState } from "@hookstate/core";
import { settingsState } from ".";
import useNotification from "../../GlobalNotification/useNotification";
import { CREATE_FOLDER } from "./graphql";

const useSettingsData = () => {
  const state = useState(settingsState);
  const { showInfoNotification, showErrorNotification } = useNotification();

  const [createFolderMutation] = useMutation(CREATE_FOLDER, {
    onCompleted: ({ createFolder }) => {
      state.accessibleFolders.set((folders) => folders.concat([createFolder]));
      showInfoNotification("Folder created.");
    },
    onError: () => showErrorNotification("Could not create new folder."),
  });

  const createFolder = async (name: string) => createFolderMutation({ variables: { name } });

  return {
    get accessibleFolders() {
      return state.accessibleFolders.attach(Downgraded).get();
    },
    createFolder,
  };
};

export default useSettingsData;

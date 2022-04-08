import { useMutation } from "@apollo/client";
import { Downgraded, useState } from "@hookstate/core";
import { settingsState } from ".";
import { CreateFolderDocument } from "../../../generated/graphqlOperations";
import useNotification from "../../GlobalNotification/useNotification";

const useSettingsData = () => {
  const state = useState(settingsState);
  const { showSuccessNotification, showErrorNotification } = useNotification();

  const [createFolderMutation] = useMutation(CreateFolderDocument, {
    onCompleted: ({ createFolder }) => {
      state.accessibleFolders.set((folders) => folders.concat([createFolder]));
      showSuccessNotification("Folder created.");
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

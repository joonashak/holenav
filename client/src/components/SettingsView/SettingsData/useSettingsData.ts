import { Downgraded, useState } from "@hookstate/core";
import { settingsState } from ".";
import useAuthenticatedMutation from "../../../auth/useAuthenticatedMutation";
import {
  AssignSystemRoleDocument,
  AssignSystemRoleMutation,
  AssignSystemRoleMutationVariables,
  CreateFolderDocument,
  CreateFolderMutation,
  CreateFolderMutationVariables,
  SystemRoles,
} from "../../../generated/graphqlOperations";
import useNotification from "../../GlobalNotification/useNotification";

const useSettingsData = () => {
  const state = useState(settingsState);
  const { showSuccessNotification, showErrorNotification } = useNotification();

  const [createFolderMutation] = useAuthenticatedMutation<
    CreateFolderMutation,
    CreateFolderMutationVariables
  >(CreateFolderDocument, {
    onCompleted: ({ createFolder }) => {
      state.accessibleFolders.set((folders) => folders.concat([createFolder]));
      state.manageableFolders.set((folders) => folders.concat([createFolder]));
      showSuccessNotification("Folder created.");
    },
    onError: () => showErrorNotification("Could not create new folder."),
  });

  const createFolder = async (name: string) => createFolderMutation({ variables: { name } });

  const [assignSystemRoleMutation] = useAuthenticatedMutation<
    AssignSystemRoleMutation,
    AssignSystemRoleMutationVariables
  >(AssignSystemRoleDocument, {
    onCompleted: ({ assignSystemRole }) => {
      state.users.set((users) =>
        users.filter((user) => user.id !== assignSystemRole.id).concat(assignSystemRole),
      );
    },
  });

  const assignSystemRole = async (userId: string, systemRole: SystemRoles) =>
    assignSystemRoleMutation({ variables: { userId, systemRole } });

  return {
    get accessibleFolders() {
      return state.accessibleFolders.attach(Downgraded).get();
    },
    get manageableFolders() {
      return state.manageableFolders.attach(Downgraded).get();
    },
    get users() {
      return state.users.attach(Downgraded).get();
    },
    createFolder,
    assignSystemRole,
  };
};

export default useSettingsData;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from "@apollo/client";
import {
  AllUsersDocument,
  AssignSystemRoleDocument,
  AssignSystemRoleMutation,
  AssignSystemRoleMutationVariables,
  CreateFolderDocument,
  CreateFolderMutation,
  CreateFolderMutationVariables,
  Folder,
  HolenavUser,
  SettingsDataDocument,
  SettingsDataForManagerDocument,
  SystemRoles,
} from "../../generated/graphqlOperations";
import { atLeastManager } from "../../utils/compareSystemRoles";
import useNotification from "../global-notification/useNotification";
import useUserData from "../user-data/useUserData";

const useSettingsData = () => {
  const { systemRole } = useUserData();
  const { showSuccessNotification, showErrorNotification } = useNotification();

  const { data: settingsData }: any = useQuery(SettingsDataDocument);
  const accessibleFolders: Folder[] = settingsData?.getAccessibleFolders || [];

  const { data: managerSettings }: any = useQuery(
    SettingsDataForManagerDocument,
    { skip: !atLeastManager(systemRole) },
  );
  const manageableFolders: Folder[] =
    managerSettings?.getManageableFolders || [];

  const { data: userData }: any = useQuery(AllUsersDocument);
  const users: HolenavUser[] = userData?.getAllUsersForManager || [];

  const [createFolderMutation] = useMutation<
    CreateFolderMutation,
    CreateFolderMutationVariables
  >(CreateFolderDocument, {
    onCompleted: () => {
      showSuccessNotification("Folder created.");
    },
    onError: () => showErrorNotification("Could not create new folder."),
    refetchQueries: [SettingsDataDocument, SettingsDataForManagerDocument],
  });

  const createFolder = async (name: string) =>
    createFolderMutation({ variables: { name } });

  const [assignSystemRoleMutation] = useMutation<
    AssignSystemRoleMutation,
    AssignSystemRoleMutationVariables
  >(AssignSystemRoleDocument, {
    refetchQueries: [AllUsersDocument],
  });

  const assignSystemRole = async (userId: string, systemRole: SystemRoles) =>
    assignSystemRoleMutation({ variables: { userId, systemRole } });

  return {
    accessibleFolders,
    manageableFolders,
    users,
    createFolder,
    assignSystemRole,
  };
};

export default useSettingsData;

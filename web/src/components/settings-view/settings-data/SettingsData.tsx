import { createState, useState } from "@hookstate/core";
import { ReactNode } from "react";
import useAuthenticatedQuery from "../../../auth/useAuthenticatedQuery";
import {
  AllUsersDocument,
  AllUsersQuery,
  AllUsersQueryVariables,
  SettingsDataForManagerDocument,
  SettingsDataForManagerQuery,
  SettingsDataForManagerQueryVariables,
} from "../../../generated/graphqlOperations";
import { atLeastManager } from "../../../utils/compareSystemRoles";
import useUserData from "../../user-data/useUserData";
import { Settings } from "./types";

export const settingsState = createState<Settings>({
  accessibleFolders: [],
  manageableFolders: [],
  users: [],
});

type SettingsDataProps = {
  children: ReactNode;
};

const SettingsData = ({ children }: SettingsDataProps) => {
  const state = useState(settingsState);
  const { systemRole } = useUserData();

  useAuthenticatedQuery<
    SettingsDataForManagerQuery,
    SettingsDataForManagerQueryVariables
  >(SettingsDataForManagerDocument, {
    onCompleted: (data) => {
      state.merge({ manageableFolders: data.getManageableFolders });
    },
    skip: !atLeastManager(systemRole),
  });

  useAuthenticatedQuery<AllUsersQuery, AllUsersQueryVariables>(
    AllUsersDocument,
    {
      onCompleted: (data) => {
        state.merge({ users: data.getAllUsersForManager });
      },
      skip: !atLeastManager(systemRole),
    },
  );

  return <>{children}</>;
};

export default SettingsData;

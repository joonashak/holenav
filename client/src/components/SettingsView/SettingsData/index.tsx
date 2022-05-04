import { createState, useState } from "@hookstate/core";
import { ReactNode } from "react";
import useAuthenticatedQuery from "../../../auth/useAuthenticatedQuery";
import {
  SettingsDataDocument,
  SettingsDataForManagerDocument,
} from "../../../generated/graphqlOperations";
import { atLeastManager } from "../../../utils/compareSystemRoles";
import useUserData from "../../UserData/useUserData";
import { Settings } from "./types";

export const settingsState = createState<Settings>({
  accessibleFolders: [],
  manageableFolders: [],
});

type SettingsDataProps = {
  children: ReactNode;
};

const SettingsData = ({ children }: SettingsDataProps) => {
  const state = useState(settingsState);
  const { systemRole } = useUserData();

  useAuthenticatedQuery(SettingsDataDocument, {
    onCompleted: (data) => {
      state.merge({ accessibleFolders: data.getAccessibleFolders });
    },
  });

  useAuthenticatedQuery(SettingsDataForManagerDocument, {
    onCompleted: (data) => {
      state.merge({ manageableFolders: data.getManageableFolders });
    },
    skip: !atLeastManager(systemRole),
  });

  return <>{children}</>;
};

export default SettingsData;

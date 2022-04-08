import { useLazyQuery } from "@apollo/client";
import { createState, useState } from "@hookstate/core";
import { ReactNode, useEffect } from "react";
import useAuth from "../../../auth/useAuth";
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
  const { token } = useAuth();

  const [settingsQuery] = useLazyQuery(SettingsDataDocument, {
    onCompleted: (data) => {
      state.merge({ accessibleFolders: data.getAccessibleFolders });
    },
  });

  const [settingsForManagerQuery] = useLazyQuery(SettingsDataForManagerDocument, {
    onCompleted: (data) => {
      state.merge({ manageableFolders: data.getManageableFolders });
    },
  });

  useEffect(() => {
    if (!token) {
      return;
    }

    settingsQuery();

    if (systemRole && atLeastManager(systemRole)) {
      settingsForManagerQuery();
    }
  }, [token]);

  return <>{children}</>;
};

export default SettingsData;

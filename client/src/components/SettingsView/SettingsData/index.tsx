import { useLazyQuery } from "@apollo/client";
import { createState, useState } from "@hookstate/core";
import { ReactNode, useEffect } from "react";
import useAuth from "../../../auth/useAuth";
import { SettingsDataDocument } from "../../../generated/graphqlOperations";
import { Settings } from "./types";

export const settingsState = createState<Settings>({
  accessibleFolders: [],
});

type SettingsDataProps = {
  children: ReactNode;
};

const SettingsData = ({ children }: SettingsDataProps) => {
  const state = useState(settingsState);
  const { token } = useAuth();

  const [settingsQuery] = useLazyQuery(SettingsDataDocument, {
    onCompleted: (data) => {
      state.set({ accessibleFolders: data.getAccessibleFolders });
    },
  });

  useEffect(() => {
    if (token) {
      settingsQuery();
    }
  }, [token]);

  return <>{children}</>;
};

export default SettingsData;

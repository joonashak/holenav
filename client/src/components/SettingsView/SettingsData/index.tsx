import { useQuery } from "@apollo/client";
import { createState, useState } from "@hookstate/core";
import { ReactNode } from "react";
import { GET_ACCESSIBLE_FOLDERS } from "./graphql";
import { Settings } from "./types";

export const settingsState = createState<Settings>({
  accessibleFolders: [],
});

type SettingsDataProps = {
  children: ReactNode;
};

const SettingsData = ({ children }: SettingsDataProps) => {
  const state = useState(settingsState);

  const { loading, error } = useQuery(GET_ACCESSIBLE_FOLDERS, {
    onCompleted: (data) => {
      state.set({ accessibleFolders: data.getAccessibleFolders });
    },
  });

  if (loading || error) {
    return null;
  }

  return <>{children}</>;
};

export default SettingsData;

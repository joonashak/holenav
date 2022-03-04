import { useQuery } from "@apollo/client";
import { createState, useState } from "@hookstate/core";
import { cloneDeep } from "lodash";
import { ReactElement, ReactNode } from "react";
import useAuthenticatedApollo from "../../auth/useAuthenticatedApollo";
import useLocalData from "../LocalData/useLocalData";
import { GET_USER_DATA } from "./graphql";
import { UserData } from "./types";

export const userState = createState<UserData>({
  id: "",
  settings: {
    selectedMap: {
      id: "",
      name: "",
      rootSystemName: "",
    },
    maps: [],
    activeFolder: {
      id: "",
      name: "",
    },
  },
  main: null,
  alts: [],
  accessibleFolders: [],
});

interface UserDataProviderProps {
  children: ReactNode;
}

export default ({ children }: UserDataProviderProps) => {
  const state = useState(userState);
  const { setActiveFolderForHeaders } = useAuthenticatedApollo();
  const { setDefaultActiveCharacter } = useLocalData();

  const { loading, error } = useQuery(GET_USER_DATA, {
    onCompleted: (data) => {
      const { whoami, getAccessibleFolders } = data;
      const { main, settings, ...rest } = cloneDeep(whoami);
      const activeFolder = settings.activeFolder || getAccessibleFolders[0];
      state.merge({
        main,
        accessibleFolders: getAccessibleFolders,
        settings,
        ...rest,
      });
      setActiveFolderForHeaders(activeFolder.id);
      setDefaultActiveCharacter(main.esiId);
    },
  });

  // FIXME: Handle loading and errors properly.
  if (loading || error) {
    return null;
  }

  return children as ReactElement;
};

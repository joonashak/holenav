import { useLazyQuery } from "@apollo/client";
import { createState, useState } from "@hookstate/core";
import { cloneDeep } from "lodash";
import { ReactElement, ReactNode, useEffect } from "react";
import useAuth from "../../auth/useAuth";
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
  systemRole: null,
});

interface UserDataProviderProps {
  children: ReactNode;
}

export default ({ children }: UserDataProviderProps) => {
  const state = useState(userState);
  const { token } = useAuth();
  const { setActiveFolderForHeaders } = useAuthenticatedApollo();
  const { setDefaultActiveCharacter } = useLocalData();

  const [userQuery] = useLazyQuery(GET_USER_DATA, {
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

  useEffect(() => {
    if (token) {
      userQuery();
    }
  }, [token]);

  if (!state.systemRole.get()) {
    return null;
  }

  return children as ReactElement;
};

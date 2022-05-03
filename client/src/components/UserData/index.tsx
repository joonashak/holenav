import { createState, useState } from "@hookstate/core";
import { cloneDeep } from "lodash";
import { ReactElement, ReactNode, useEffect } from "react";
import useAuth from "../../auth/useAuth";
import useLazyAuthenticatedQuery from "../../auth/useLazyAuthenticatedQuery";
import useLocalData from "../LocalData/useLocalData";
import { GET_USER_DATA } from "./graphql";
import useUserSettings from "./settings/useUserSettings";
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
  const { setActiveFolder } = useUserSettings();
  const { setDefaultActiveCharacter } = useLocalData();

  const [userQuery, { loading }] = useLazyAuthenticatedQuery(GET_USER_DATA, {
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
      setActiveFolder(activeFolder);
      setDefaultActiveCharacter(main.esiId);
    },
  });

  useEffect(() => {
    if (token) {
      userQuery();
    }
  }, [token]);

  if (loading) {
    return null;
  }

  return children as ReactElement;
};

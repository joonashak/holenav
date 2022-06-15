import { createState, useState } from "@hookstate/core";
import { cloneDeep } from "lodash";
import { ReactElement, ReactNode, useEffect } from "react";
import useAuth from "../../auth/useAuth";
import useLazyAuthenticatedQuery from "../../auth/useLazyAuthenticatedQuery";
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
      personal: false,
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
  const { setDefaultActiveCharacter } = useLocalData();

  const [userQuery, { loading }] = useLazyAuthenticatedQuery(GET_USER_DATA, {
    onCompleted: (data) => {
      const { whoami, getAccessibleFolders } = data;
      const { main, settings, ...rest } = cloneDeep(whoami);
      state.merge({
        main,
        accessibleFolders: getAccessibleFolders,
        settings,
        ...rest,
      });
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

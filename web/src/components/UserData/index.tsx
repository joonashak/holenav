import { createState, useState } from "@hookstate/core";
import { cloneDeep } from "lodash";
import { ReactElement, ReactNode, useEffect } from "react";
import useAuth from "../../auth/useAuth";
import useLazyAuthenticatedQuery from "../../auth/useLazyAuthenticatedQuery";
import {
  Folder,
  SystemRoles,
  UserDataDocument,
  UserDataQuery,
  UserDataQueryVariables,
} from "../../generated/graphqlOperations";
import useLocalData from "../LocalData/useLocalData";
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
  main: {
    esiId: "",
    name: "",
    isMain: true,
    portraitUrl: "",
    corporation: {
      esiId: "",
      name: "",
      ticker: "",
    },
  },
  alts: [],
  accessibleFolders: [],
  systemRole: SystemRoles.None,
  folderRoles: [],
  userDataReady: false,
});

interface UserDataProviderProps {
  children: ReactNode;
}

export default ({ children }: UserDataProviderProps) => {
  const state = useState(userState);
  const { token } = useAuth();
  const { setDefaultActiveCharacter } = useLocalData();

  const [userQuery, { loading }] = useLazyAuthenticatedQuery<
    UserDataQuery,
    UserDataQueryVariables
  >(UserDataDocument, {
    onCompleted: (data) => {
      const { whoami, getAccessibleFolders } = data;
      const { main, settings, ...rest } = cloneDeep(whoami);

      if (!settings.activeFolder) {
        settings.activeFolder =
          getAccessibleFolders.find((folder: Folder) => folder.personal) ||
          getAccessibleFolders[0];
      }

      state.merge({
        main,
        accessibleFolders: getAccessibleFolders,
        settings,
        ...rest,
        userDataReady: true,
      });

      setDefaultActiveCharacter(main.esiId);
    },
  });

  useEffect(() => {
    if (token) {
      userQuery();
    }
  }, [token]);

  if (loading || (token && !state.userDataReady.get())) {
    return null;
  }

  return children as ReactElement;
};

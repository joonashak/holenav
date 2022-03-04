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
  activeFolder: "",
  settings: {
    selectedMap: {
      id: "",
      name: "",
      rootSystemName: "",
    },
    maps: [],
  },
  main: null,
  alts: [],
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
      const { whoami } = data;
      const { activeFolder, main, ...rest } = cloneDeep(whoami);
      state.merge({ main, activeFolder: activeFolder.id, ...rest });
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

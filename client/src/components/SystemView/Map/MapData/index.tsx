import { useQuery } from "@apollo/client";
import { createContext, useState, ReactNode, useEffect } from "react";
import useUserData from "../../../UserData/useUserData";
import { GET_CONNECTION_TREE } from "./graphql";

export const MapDataContext = createContext([[], () => {}]);
MapDataContext.displayName = "Map Data";

interface MapDataProviderProps {
  children: ReactNode;
}

export default ({ children }: MapDataProviderProps) => {
  const {
    settings: { selectedMap },
  } = useUserData();
  const [state, setState] = useState<any>({ selectedMap });

  const { data, loading, error } = useQuery(GET_CONNECTION_TREE, {
    variables: { rootSystem: state.selectedMap.rootSystemName },
  });

  useEffect(() => {
    if (!loading && !error) {
      const { getConnectionTree } = data;
      setState((prev: any) => ({ ...prev, connectionTree: getConnectionTree }));
    }
  }, [data]);

  // FIXME: Handle loading and errors properly.
  if (!state.connectionTree) {
    return null;
  }

  return <MapDataContext.Provider value={[state, setState]}>{children}</MapDataContext.Provider>;
};

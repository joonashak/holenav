import { useQuery } from "@apollo/client";
import { createContext, useState, ReactNode, useEffect } from "react";
import { GET_CONNECTION_TREE } from "./graphql";

export const MapDataContext = createContext([[], () => {}]);
MapDataContext.displayName = "Map Data";

interface MapDataProviderProps {
  children: ReactNode;
}

export default ({ children }: MapDataProviderProps) => {
  const [state, setState] = useState<any>(null);

  const { data, loading, error } = useQuery(GET_CONNECTION_TREE, {
    variables: { rootSystem: "Jita" },
  });

  useEffect(() => {
    if (!loading && !error) {
      const { getConnectionTree } = data;
      setState((prev: any) => ({ ...prev, ...getConnectionTree }));
    }
  }, [data]);

  // FIXME: Handle loading and errors properly.
  if (!state) {
    return null;
  }

  return <MapDataContext.Provider value={[state, setState]}>{children}</MapDataContext.Provider>;
};

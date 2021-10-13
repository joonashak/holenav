import { useQuery } from "@apollo/client";
import { findOneSystem } from "@eve-data/systems";
import { createContext, useState, ReactNode, useEffect } from "react";
import { GET_SYSTEM_BY_NAME } from "./graphql";

export const SystemDataContext = createContext([[], () => {}]);
SystemDataContext.displayName = "System Data";

interface SystemDataProviderProps {
  children: ReactNode;
  name: string;
}

export default ({ children, name }: SystemDataProviderProps) => {
  const [state, setState] = useState<any>(null);

  // Static data.
  useEffect(() => {
    const { id, ...system } = findOneSystem({ name });
    setState((prev: any) => ({ ...prev, eveId: id, ...system }));
  }, [name]);

  // System data from API.
  const systemQuery = useQuery(GET_SYSTEM_BY_NAME, {
    variables: { name },
  });

  useEffect(() => {
    const { data, loading, error } = systemQuery;

    if (!loading && !error) {
      const {
        getSystemByName: { id, signatures },
        getWormholesBySystem: wormholes,
      } = data;
      setState((prev: any) => ({ ...prev, id, signatures, wormholes }));
    }
  }, [systemQuery]);

  // FIXME: Handle loading and errors properly.
  if (!state || !Object.keys(state).includes("signatures")) {
    return null;
  }

  return (
    <SystemDataContext.Provider value={[state, setState]}>{children}</SystemDataContext.Provider>
  );
};

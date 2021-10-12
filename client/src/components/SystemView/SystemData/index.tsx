import { useQuery } from "@apollo/client";
import { findOneSystem } from "@eve-data/systems";
import { createContext, useState, ReactNode, useEffect } from "react";
import useUserData from "../../UserData/useUserData";
import { GET_SYSTEM_BY_NAME } from "./graphql";

export const SystemDataContext = createContext([[], () => {}]);
SystemDataContext.displayName = "System Data";

interface SystemDataProviderProps {
  children: ReactNode;
  name: string;
}

export default ({ children, name }: SystemDataProviderProps) => {
  const [state, setState] = useState<any>(null);
  const { activeFolder } = useUserData();

  // Static data.
  useEffect(() => {
    const { id, ...system } = findOneSystem({ name });
    setState((prev: any) => ({ ...prev, eveId: id, ...system }));
  }, [name]);

  // System data from API.
  const systemQuery = useQuery(GET_SYSTEM_BY_NAME, {
    variables: { name, folderId: activeFolder },
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

  // Wormhole data from API.

  // FIXME: Handle loading and errors properly.
  if (!state) {
    return null;
  }

  return (
    <SystemDataContext.Provider value={[state, setState]}>{children}</SystemDataContext.Provider>
  );
};

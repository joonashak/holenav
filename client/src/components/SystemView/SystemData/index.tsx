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

  useEffect(() => {
    const { id, ...system } = findOneSystem({ name });
    setState({ eveId: id, ...system });
  }, [name]);

  const { data, loading, error } = useQuery(GET_SYSTEM_BY_NAME, {
    variables: { name, folderId: activeFolder },
  });

  useEffect(() => {
    if (!loading && !error) {
      const {
        getSystemByName: { id, signatures },
      } = data;
      setState((prev: any) => ({ ...prev, id, signatures }));
    }
  }, [data]);

  // FIXME: Handle loading and errors properly.
  if (!state) {
    return null;
  }

  return (
    <SystemDataContext.Provider value={[state, setState]}>{children}</SystemDataContext.Provider>
  );
};

import { useQuery } from "@apollo/client";
import { createContext, useState, ReactNode, useEffect } from "react";
import useAuthenticatedApollo from "../../auth/useAuthenticatedApollo";
import useLocalData from "../LocalData/useLocalData";
import { GET_SYSTEM_DATA } from "./graphql";

export const UserDataContext = createContext([[], () => {}]);
UserDataContext.displayName = "User Data";

interface UserDataProviderProps {
  children: ReactNode;
}

export default ({ children }: UserDataProviderProps) => {
  const [state, setState] = useState<any>(null);
  const { setActiveFolder } = useAuthenticatedApollo();
  const { setDefaultActiveCharacter } = useLocalData();
  const { data, loading, error } = useQuery(GET_SYSTEM_DATA);

  useEffect(() => {
    if (!loading && !error) {
      const {
        whoami: { activeFolder, main, ...rest },
      } = data;

      setState((prev: any) => ({ ...prev, ...rest, main, activeFolder: activeFolder.id }));
      setActiveFolder(activeFolder.id);
      setDefaultActiveCharacter(main.esiId);
    }
  }, [data]);

  // FIXME: Handle loading and errors properly.
  if (!data || !state) {
    return null;
  }

  return <UserDataContext.Provider value={[state, setState]}>{children}</UserDataContext.Provider>;
};

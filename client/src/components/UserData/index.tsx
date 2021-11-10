import { useQuery } from "@apollo/client";
import { createContext, useState, ReactNode, useEffect } from "react";
import useAuthenticatedApollo from "../../auth/useAuthenticatedApollo";
import { GET_SYSTEM_DATA } from "./graphql";

export const UserDataContext = createContext([[], () => {}]);
UserDataContext.displayName = "User Data";

interface UserDataProviderProps {
  children: ReactNode;
}

export default ({ children }: UserDataProviderProps) => {
  const [state, setState] = useState<any>(null);
  const { setActiveFolder } = useAuthenticatedApollo();
  const { data, loading, error } = useQuery(GET_SYSTEM_DATA);

  useEffect(() => {
    if (!loading && !error) {
      const {
        whoami: { activeFolder, ...rest },
      } = data;
      setState((prev: any) => ({ ...prev, ...rest, activeFolder: activeFolder.id }));
      setActiveFolder(activeFolder.id);
    }
  }, [data]);

  // FIXME: Handle loading and errors properly.
  if (!data || !state) {
    return null;
  }

  return <UserDataContext.Provider value={[state, setState]}>{children}</UserDataContext.Provider>;
};

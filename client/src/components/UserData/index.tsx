import { useQuery } from "@apollo/client";
import { createContext, useState, ReactNode, useEffect } from "react";
import useAuthenticatedApollo from "../../auth/useAuthenticatedApollo";
import { GET_SYSTEM_DATA } from "./graphql";

export const UserDataContext = createContext([[], () => {}]);
UserDataContext.displayName = "User Data";

export type UserDataState = {
  id: string | null;
  activeFolder: string | null;
};

const defaultState: UserDataState = {
  id: null,
  activeFolder: null,
};

interface UserDataProviderProps {
  children: ReactNode;
}

export default ({ children }: UserDataProviderProps) => {
  const [state, setState] = useState<any>(defaultState);
  const { setActiveFolder } = useAuthenticatedApollo();
  const { data, loading, error } = useQuery(GET_SYSTEM_DATA);

  useEffect(() => {
    if (!loading && !error) {
      const {
        whoami: { id, activeFolder },
      } = data;
      setState((prev: any) => ({ ...prev, id, activeFolder: activeFolder.id }));
      setActiveFolder(activeFolder.id);
    }
  }, [data]);

  // FIXME: Handle loading and errors properly.
  if (!data || !state.id) {
    return null;
  }

  return <UserDataContext.Provider value={[state, setState]}>{children}</UserDataContext.Provider>;
};

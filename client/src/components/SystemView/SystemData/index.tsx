import { gql, useQuery } from "@apollo/client";
import { findOneSystem } from "@eve-data/systems";
import { createContext, useState, ReactNode, useEffect } from "react";

export const SystemDataContext = createContext([[], () => {}]);
SystemDataContext.displayName = "System Data";

interface SystemDataProviderProps {
  children: ReactNode;
  name: string;
}

export default ({ children, name }: SystemDataProviderProps) => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const { id, ...system } = findOneSystem({ name });
    setState({ eveId: id, ...system });
  }, [name]);

  const query = gql`
    query System($name: String!, $folderId: String!) {
      getSystemByName(name: $name, folderId: $folderId) {
        id
        signatures {
          id
          name
        }
      }
    }
  `;

  // FIXME: Remove hard-coded folderId.
  const { data, loading, error } = useQuery(query, {
    variables: { name, folderId: "d990d0c5-2557-458e-b562-a169052215fe" },
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
    <SystemDataContext.Provider value={[state, setState]}>
      {children}
    </SystemDataContext.Provider>
  );
};

import { gql, useQuery } from "@apollo/client";
import { findOneSystem } from "@eve-data/systems";
import { createContext, useState, ReactNode, useEffect } from "react";

export const SystemDataContext = createContext([[], () => {}]);

interface SystemDataProviderProps {
  children: ReactNode;
  name: string;
}

export default ({ children, name }: SystemDataProviderProps) => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const system = findOneSystem({ name });
    setState(system);
  }, [name]);

  const query = gql`
    query System($name: String!) {
      getSystemByName(name: $name) {
        name
      }
    }
  `;

  // TODO: Load data into state when backend resolvers are done.
  // eslint-disable-next-line
  const { data } = useQuery(query, { variables: { name } });

  // eslint-disable-next-line
  console.log("SystemDataProvider state", state);

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

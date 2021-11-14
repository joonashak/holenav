import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createContext, ReactChild, useContext, useState } from "react";
import { endpoints } from "../config";
import useAuth from "./useAuth";

const ApolloContext = createContext([[], () => {}]);
ApolloContext.displayName = "Apollo";

type AuthenticatedApolloProps = {
  children: ReactChild;
};

const AuthenticatedApolloProvider = ({ children }: AuthenticatedApolloProps) => {
  const { token } = useAuth();
  // FIXME: Refactor activeFolder to user data state when migrating it to Hookstate.
  const [activeFolder, setActiveFolder] = useState<any>("");

  // Prevent unauthorized request.
  if (!token) {
    return null;
  }

  const apolloClient = new ApolloClient({
    uri: endpoints.graphQl,
    cache: new InMemoryCache(),
    headers: { accessToken: token, activeFolder },
  });

  return (
    <ApolloContext.Provider value={[activeFolder, setActiveFolder]}>
      <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
    </ApolloContext.Provider>
  );
};

export { AuthenticatedApolloProvider };

export default () => {
  const [activeFolder, setActiveFolder] = useContext<any>(ApolloContext);

  return { activeFolder, setActiveFolder };
};

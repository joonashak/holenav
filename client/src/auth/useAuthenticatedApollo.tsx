import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createContext, ReactChild, useContext, useEffect, useState } from "react";
import { devToolsEnabled, endpoints } from "../config";
import mockUserStore from "../dev/mockUserStore";
import useAuth from "./useAuth";

const ApolloContext = createContext([[], () => {}]);
ApolloContext.displayName = "Apollo";

type AuthenticatedApolloProps = {
  children: ReactChild;
};

const AuthenticatedApolloProvider = ({ children }: AuthenticatedApolloProps) => {
  const { token } = useAuth();
  // Default values are strings because headers cannot have non-string values.
  const [mockUser, setMockUser] = useState("none");
  const [activeFolder, setActiveFolder] = useState<any>("none");

  useEffect(() => {
    (async () => {
      const user = await mockUserStore.getMockUser();
      setMockUser(user || "none");
    })();
  }, []);

  // Prevent unauthorized request.
  if (!token && !(devToolsEnabled && mockUser !== "none")) {
    return null;
  }

  const apolloClient = new ApolloClient({
    uri: endpoints.graphQl,
    cache: new InMemoryCache(),
    headers: { accessToken: token, mockUser, activeFolder },
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

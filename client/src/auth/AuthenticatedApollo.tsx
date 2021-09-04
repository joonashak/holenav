import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ReactChild, useEffect, useState } from "react";
import { devToolsEnabled, endpoints } from "../config";
import mockUserStore from "../dev/mockUserStore";
import useAuth from "./useAuth";

type AuthenticatedApolloProps = {
  children: ReactChild;
};

export default ({ children }: AuthenticatedApolloProps) => {
  const { token } = useAuth();
  const [mockUser, setMockUser] = useState("none");

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
    headers: { accessToken: token, mockUser },
  });

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

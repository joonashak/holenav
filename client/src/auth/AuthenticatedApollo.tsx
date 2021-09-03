import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ReactChild } from "react";
import { endpoints } from "../config";
import useAuth from "./useAuth";

type AuthenticatedApolloProps = {
  children: ReactChild;
};

export default ({ children }: AuthenticatedApolloProps) => {
  const { token } = useAuth();

  // Prevent unauthorized request.
  if (!token) {
    return null;
  }

  const apolloClient = new ApolloClient({
    uri: endpoints.graphQl,
    cache: new InMemoryCache(),
    headers: { accessToken: token },
  });

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

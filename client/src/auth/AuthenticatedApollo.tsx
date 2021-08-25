import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ReactChild } from "react";
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
    uri: `${process.env.REACT_APP_CMS_URL}/graphql`,
    cache: new InMemoryCache(),
    headers: { accessToken: token },
  });

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

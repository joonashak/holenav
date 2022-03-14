import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createState, useState } from "@hookstate/core";
import { ReactElement } from "react";
import { endpoints } from "../config";
import useAuth from "./useAuth";

const activeFolderState = createState<string>("");

type AuthenticatedApolloProps = {
  children: ReactElement;
};

const AuthenticatedApolloProvider = ({ children }: AuthenticatedApolloProps) => {
  const { token } = useAuth();
  const { value: activeFolder } = useState(activeFolderState);

  const apolloClient = new ApolloClient({
    uri: endpoints.graphQl,
    cache: new InMemoryCache(),
    headers: { accessToken: token || "", activeFolder },
  });

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export { AuthenticatedApolloProvider };

export default () => {
  const activeFolder = useState(activeFolderState);

  const setActiveFolderForHeaders = (folderId: string) => {
    // Equality check to prevent re-render loop.
    if (activeFolder.value !== folderId) {
      activeFolder.set(folderId);
    }
  };

  return { setActiveFolderForHeaders };
};

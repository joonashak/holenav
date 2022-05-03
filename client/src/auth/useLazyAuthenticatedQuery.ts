import { QueryHookOptions, useLazyQuery } from "@apollo/client";
import { DocumentNode } from "graphql";
import useAuth from "./useAuth";

const useLazyAuthenticatedQuery = (query: DocumentNode, options?: QueryHookOptions) => {
  const { token } = useAuth();

  const optionsWithAuth = {
    ...options,
    context: {
      headers: {
        accesstoken: token,
        activefolder: "default",
      },
    },
  };

  return useLazyQuery(query, optionsWithAuth);
};

export default useLazyAuthenticatedQuery;

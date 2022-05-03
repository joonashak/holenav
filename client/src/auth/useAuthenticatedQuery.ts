import { QueryHookOptions, useQuery } from "@apollo/client";
import { DocumentNode } from "graphql";
import useAuth from "./useAuth";

const useAuthenticatedQuery = (query: DocumentNode, options?: QueryHookOptions) => {
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

  return useQuery(query, optionsWithAuth);
};

export default useAuthenticatedQuery;

import { QueryHookOptions, useQuery } from "@apollo/client";
import { DocumentNode } from "graphql";
import useApolloOptions from "./useApolloOptions";

const useAuthenticatedQuery = (query: DocumentNode, options: QueryHookOptions = {}) => {
  const optionsWithAuth = useApolloOptions(options);

  return useQuery(query, optionsWithAuth);
};

export default useAuthenticatedQuery;

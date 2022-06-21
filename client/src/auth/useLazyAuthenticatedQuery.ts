import { QueryHookOptions, useLazyQuery } from "@apollo/client";
import { DocumentNode } from "graphql";
import useApolloOptions from "./useApolloOptions";

const useLazyAuthenticatedQuery = (query: DocumentNode, options: QueryHookOptions = {}) => {
  const optionsWithAuth = useApolloOptions(options);

  return useLazyQuery(query, optionsWithAuth);
};

export default useLazyAuthenticatedQuery;

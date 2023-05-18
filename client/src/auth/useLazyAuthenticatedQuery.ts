import { OperationVariables, QueryHookOptions, useLazyQuery } from "@apollo/client";
import { DocumentNode } from "graphql";
import useApolloOptions from "./useApolloOptions";

const useLazyAuthenticatedQuery = <T, V extends OperationVariables>(
  query: DocumentNode,
  options: QueryHookOptions<T, V> = {},
) => {
  const optionsWithAuth = useApolloOptions(options);

  return useLazyQuery<T, V>(query, optionsWithAuth);
};

export default useLazyAuthenticatedQuery;

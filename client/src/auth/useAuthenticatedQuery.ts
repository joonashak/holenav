import { OperationVariables, QueryHookOptions, QueryResult, useQuery } from "@apollo/client";
import { DocumentNode } from "graphql";
import useApolloOptions from "./useApolloOptions";

const useAuthenticatedQuery = <T, V extends OperationVariables>(
  query: DocumentNode,
  options: QueryHookOptions<T, V> = {},
): QueryResult<T, V> => {
  const optionsWithAuth = useApolloOptions(options);

  return useQuery<T, V>(query, optionsWithAuth);
};

export default useAuthenticatedQuery;

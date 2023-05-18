import {
  MutationHookOptions,
  MutationTuple,
  OperationVariables,
  useMutation,
} from "@apollo/client";
import { DocumentNode } from "graphql";
import useApolloOptions from "./useApolloOptions";

const useAuthenticatedMutation = <T, V extends OperationVariables>(
  query: DocumentNode,
  options: MutationHookOptions<T, V> = {},
): MutationTuple<T, V> => {
  const optionsWithAuth = useApolloOptions(options);

  return useMutation<T, V>(query, optionsWithAuth);
};

export default useAuthenticatedMutation;

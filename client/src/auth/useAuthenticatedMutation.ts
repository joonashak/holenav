import { MutationHookOptions, useMutation } from "@apollo/client";
import { DocumentNode } from "graphql";
import useApolloOptions from "./useApolloOptions";

const useAuthenticatedMutation = (query: DocumentNode, options: MutationHookOptions = {}) => {
  const optionsWithAuth = useApolloOptions(options);

  return useMutation(query, optionsWithAuth);
};

export default useAuthenticatedMutation;

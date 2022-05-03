import { MutationHookOptions, useMutation } from "@apollo/client";
import { DocumentNode } from "graphql";
import useAuth from "./useAuth";

const useAuthenticatedMutation = (query: DocumentNode, options?: MutationHookOptions) => {
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

  return useMutation(query, optionsWithAuth);
};

export default useAuthenticatedMutation;

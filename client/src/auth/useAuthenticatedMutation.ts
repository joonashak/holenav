import { MutationHookOptions, useMutation } from "@apollo/client";
import { useState } from "@hookstate/core";
import { DocumentNode } from "graphql";
import { userState } from "../components/UserData";
import useAuth from "./useAuth";

const useAuthenticatedMutation = (query: DocumentNode, options?: MutationHookOptions) => {
  const { token } = useAuth();
  const { settings } = useState(userState);

  const optionsWithAuth = {
    ...options,
    context: {
      headers: {
        accesstoken: token,
        activefolder: settings.activeFolder.get().id || "default",
      },
    },
  };

  return useMutation(query, optionsWithAuth);
};

export default useAuthenticatedMutation;

import { MutationHookOptions, useMutation } from "@apollo/client";
import { DocumentNode } from "graphql";
import useUserSettings from "../components/UserData/settings/useUserSettings";
import useAuth from "./useAuth";

const useAuthenticatedMutation = (query: DocumentNode, options?: MutationHookOptions) => {
  const { token } = useAuth();
  const { activeFolder } = useUserSettings();

  const optionsWithAuth = {
    ...options,
    context: {
      headers: {
        accesstoken: token,
        activefolder: activeFolder.id,
      },
    },
  };

  return useMutation(query, optionsWithAuth);
};

export default useAuthenticatedMutation;

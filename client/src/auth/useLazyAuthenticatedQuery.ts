import { QueryHookOptions, useLazyQuery } from "@apollo/client";
import { DocumentNode } from "graphql";
import useUserSettings from "../components/UserData/settings/useUserSettings";
import useAuth from "./useAuth";

const useLazyAuthenticatedQuery = (query: DocumentNode, options?: QueryHookOptions) => {
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

  return useLazyQuery(query, optionsWithAuth);
};

export default useLazyAuthenticatedQuery;

import { ApolloError, MutationHookOptions, QueryHookOptions } from "@apollo/client";
import { useState } from "@hookstate/core";
import useLocalData from "../components/LocalData/useLocalData";
import { userState } from "../components/UserData";
import useAuth from "./useAuth";
import { devToolsEnabled } from "../config";
import { set } from "lodash";

type HookOptions = MutationHookOptions | QueryHookOptions;

const useApolloOptions = <T extends HookOptions>(options: T): T => {
  const { token } = useAuth();
  const { settings } = useState(userState);
  const { setAuthToken, devKey } = useLocalData();

  const handleAuthError = async (error: ApolloError) => {
    const isAuthError = !!error.graphQLErrors?.find(
      (e) => e?.extensions?.code === "UNAUTHENTICATED",
    );

    if (isAuthError) {
      await setAuthToken(null);
    }
  };

  const optionsWithAuth = {
    ...options,
    context: {
      headers: {
        accesstoken: token,
        activefolder: settings.activeFolder.get().id || "default",
      },
    },
    onError: async (error: ApolloError) =>
      options.onError ? options.onError(error) : handleAuthError(error),
  };

  if (devToolsEnabled && devKey) {
    set(optionsWithAuth, "context.headers.devkey", devKey);
  }

  return optionsWithAuth;
};

export default useApolloOptions;

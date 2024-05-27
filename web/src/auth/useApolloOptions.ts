import {
  ApolloError,
  MutationHookOptions,
  OperationVariables,
  QueryHookOptions,
} from "@apollo/client";
import { useState } from "@hookstate/core";
import { set } from "lodash";
import useLocalData from "../components/local-data/useLocalData";
import { userState } from "../components/user-data/UserData";
import { devToolsEnabled } from "../config";
import useAuth from "./useAuth";

type HookOptions<T, V extends OperationVariables> =
  | MutationHookOptions<T, V>
  | QueryHookOptions<T, V>;

type AuthenticatedApolloOptions<T, V extends OperationVariables> =
  HookOptions<T, V> extends MutationHookOptions<T, V>
    ? QueryHookOptions<T, V>
    : MutationHookOptions<T, V>;

const useApolloOptions = <T, V extends OperationVariables>(
  options: HookOptions<T, V>,
): AuthenticatedApolloOptions<T, V> => {
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
        activefolder: settings.activeFolder.get()?.id || "default",
      },
    },
    onError: async (error: ApolloError) =>
      options.onError ? options.onError(error) : handleAuthError(error),
  };

  if (devToolsEnabled && devKey) {
    set(optionsWithAuth, "context.headers.devkey", devKey);
  }

  return optionsWithAuth as AuthenticatedApolloOptions<T, V>;
};

export default useApolloOptions;

import { MutationHookOptions, QueryHookOptions } from "@apollo/client";
import { useState } from "@hookstate/core";
import { userState } from "../components/UserData";
import useAuth from "./useAuth";

type HookOptions = MutationHookOptions | QueryHookOptions;

const useApolloOptions = <T extends HookOptions>(options: T): T => {
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

  return optionsWithAuth;
};

export default useApolloOptions;

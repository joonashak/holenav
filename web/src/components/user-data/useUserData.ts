import { FetchResult, useMutation } from "@apollo/client";
import { useState } from "@hookstate/core";
import {
  RemoveAltDocument,
  RemoveAltMutation,
  RemoveAltMutationVariables,
} from "../../generated/graphqlOperations";
import { userState } from "./UserData";

const useUserData = () => {
  const state = useState(userState);

  const [removeAltMutation] = useMutation<
    RemoveAltMutation,
    RemoveAltMutationVariables
  >(RemoveAltDocument, {
    onCompleted: ({ removeAlt }) => {
      state.alts.set(removeAlt.alts);
    },
  });

  const removeAlt = async (esiId: string): Promise<FetchResult> =>
    removeAltMutation({ variables: { esiId } });

  return {
    get id() {
      return state.id.get();
    },
    get main() {
      return state.main.get();
    },
    get alts() {
      return state.alts.get();
    },
    get systemRole() {
      return state.systemRole.get();
    },
    removeAlt,
  };
};

export default useUserData;

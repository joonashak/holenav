import { useState } from "@hookstate/core";
import { userState } from "./UserData";

const useUserData = () => {
  const state = useState(userState);

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
  };
};

export default useUserData;

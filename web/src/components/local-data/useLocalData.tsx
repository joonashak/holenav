import { createState, useState } from "@hookstate/core";
import activeCharacterStore from "./stores/activeCharacterStore";
import tokenStore from "./stores/tokenStore";

const localState = createState(async () => {
  const activeCharacter = await activeCharacterStore.getActiveCharacter();
  const authToken = await tokenStore.getToken();

  return { activeCharacter, authToken };
});

const useLocalData = () => {
  const state = useState(localState);

  const setActiveCharacter = async (esiId: string) => {
    await activeCharacterStore.setActiveCharacter(esiId);
    state.merge({ activeCharacter: esiId });
  };

  const setDefaultActiveCharacter = async (esiId: string) => {
    if (!state.activeCharacter.value) {
      setActiveCharacter(esiId);
    }
  };

  const setAuthToken = async (authToken: string | null) => {
    await tokenStore.setToken(authToken);
    state.merge({ authToken });
  };

  return {
    get loadingLocalState() {
      return state.promised;
    },
    get activeCharacter() {
      return state.activeCharacter.get();
    },
    get authToken() {
      return state.authToken.get();
    },
    setActiveCharacter,
    setDefaultActiveCharacter,
    setAuthToken,
  };
};

export default useLocalData;

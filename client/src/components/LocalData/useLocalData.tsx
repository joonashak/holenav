import { createState, useState } from "@hookstate/core";
import tokenStore from "../../auth/tokenStore";
import mockUserStore from "../../dev/mockUserStore";
import activeCharacterStore from "./activeCharacterStore";

const localState = createState(async () => {
  const activeCharacter = await activeCharacterStore.getActiveCharacter();
  const authToken = await tokenStore.getToken();
  const mockUser = await mockUserStore.getMockUser();
  return { activeCharacter, authToken, mockUser };
});

const useLocalData = () => {
  const state = useState(localState);

  const setActiveCharacter = async (esiId: string) => {
    await activeCharacterStore.setActiveCharacter(esiId);
    state.merge({ activeCharacter: esiId });
  };

  const setDefaultActiveCharacter = async (esiId: string) => {
    if (!state.activeCharacter) {
      setActiveCharacter(esiId);
    }
  };

  const setAuthToken = async (authToken: string) => {
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
